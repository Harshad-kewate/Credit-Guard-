import os
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for all routes and origins
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Path to trained model
MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(MODEL_DIR, 'fraud_model.pkl')

# Attempt to load model
model = None
try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print(f"[Credit Guard] Successfully loaded model from {MODEL_PATH}")
        print(f"[Credit Guard] Model Type: {type(model).__name__}")
        if hasattr(model, 'feature_names_in_'):
            print(f"[Credit Guard] Expected Features ({len(model.feature_names_in_)}): {list(model.feature_names_in_)}")
    else:
        print(f"[Credit Guard] Warning: Model file not found at {MODEL_PATH}")
except Exception as e:
    print(f"[Credit Guard] Error loading model: {e}")

# The 30 required model features (must match trained model feature names in exact order)
REQUIRED_FEATURES = [
    'Time', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10',
    'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17', 'V18', 'V19', 'V20',
    'V21', 'V22', 'V23', 'V24', 'V25', 'V26', 'V27', 'V28', 'Amount'
]

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint reporting model status and required metadata."""
    return jsonify({
        "status": "ok" if model is not None else "degraded",
        "service": "Credit Guard ML Inference API",
        "model_loaded": model is not None,
        "model_type": type(model).__name__ if model is not None else None,
        "features_required": len(REQUIRED_FEATURES),
        "feature_names": REQUIRED_FEATURES
    }), 200 if model is not None else 503

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """
    Accepts a CSV file via multipart/form-data.
    Validates all 30 features, runs the trained Random Forest model on the batch,
    and returns predictions with individual transaction details and summary statistics.
    """
    if model is None:
        return jsonify({
            "error": "Prediction model is not loaded on the server.",
            "details": "Ensure backend/fraud_model.pkl exists and is readable."
        }), 503

    # Check for file in request
    file = None
    if 'file' in request.files:
        file = request.files['file']
    elif 'csv' in request.files:
        file = request.files['csv']
    elif len(request.files) > 0:
        file = next(iter(request.files.values()))

    if not file or file.filename == '':
        return jsonify({
            "error": "No CSV file provided. Please upload a valid CSV file via multipart/form-data with key 'file'."
        }), 400

    # Parse CSV with pandas
    try:
        # Support stream reading
        df = pd.read_csv(file)
    except Exception as e:
        return jsonify({
            "error": f"Failed to parse CSV file: {str(e)}"
        }), 400

    if df.empty:
        return jsonify({
            "error": "The uploaded CSV file is empty and contains no transaction records."
        }), 400

    # 1. Feature presence validation
    # Match columns case-sensitively or case-insensitively if needed, but standardize to REQUIRED_FEATURES
    df_cols = list(df.columns)
    
    # Check if any required feature is missing
    missing_features = [feat for feat in REQUIRED_FEATURES if feat not in df.columns]
    
    # Check for case differences if missing
    if missing_features:
        lower_to_orig = {col.lower().strip(): col for col in df.columns}
        rename_map = {}
        still_missing = []
        for feat in missing_features:
            if feat.lower() in lower_to_orig:
                rename_map[lower_to_orig[feat.lower()]] = feat
            else:
                still_missing.append(feat)
        
        if rename_map:
            df.rename(columns=rename_map, inplace=True)
            missing_features = still_missing

    if missing_features:
        return jsonify({
            "error": f"Missing {len(missing_features)} of 30 required feature columns: {', '.join(missing_features)}",
            "missing_features": missing_features,
            "required_features": REQUIRED_FEATURES,
            "uploaded_columns": df_cols
        }), 400

    # 2. Exclude 'Class' column if present in the CSV
    # (Original dataset often has 'Class' as the ground truth label)
    if 'Class' in df.columns:
        print("[Credit Guard] Ground-truth 'Class' column found in CSV and excluded from model input.")

    # Extract the exact 30 features in the exact expected order
    X = df[REQUIRED_FEATURES].copy()

    # 3. Check for missing or null values in required features
    null_counts = X.isnull().sum()
    cols_with_nulls = null_counts[null_counts > 0].to_dict()
    if cols_with_nulls:
        null_details = ", ".join([f"{col}: {count} nulls" for col, count in cols_with_nulls.items()])
        return jsonify({
            "error": f"Uploaded CSV contains missing/null values in required columns ({null_details}). The model strictly requires complete data without nulls.",
            "invalid_columns": cols_with_nulls
        }), 400

    # 4. Check that all required features are strictly numeric
    for col in REQUIRED_FEATURES:
        if not pd.api.types.is_numeric_dtype(X[col]):
            converted = pd.to_numeric(X[col], errors='coerce')
            if converted.isnull().any():
                invalid_row_idx = converted.isnull().idxmax()
                return jsonify({
                    "error": f"Column '{col}' contains non-numeric values (first detected at row {int(invalid_row_idx) + 1}). All 30 model features must be numeric.",
                    "column": col
                }), 400
            X[col] = converted

    # 5. Execute model inference on the complete transaction batch
    # Unscaled features as trained
    try:
        predictions = model.predict(X)
        
        # Calculate fraud probability score if model supports predict_proba
        probabilities = None
        if hasattr(model, 'predict_proba'):
            probabilities = model.predict_proba(X)
            # Probability of Class 1 (Fraud)
            fraud_scores = probabilities[:, 1]
        else:
            fraud_scores = [None] * len(predictions)
            
    except Exception as e:
        return jsonify({
            "error": f"Model inference execution failed: {str(e)}"
        }), 500

    # 6. Format transaction results
    # Look for transaction ID column or generate sequential IDs
    id_col = None
    for candidate in ['Transaction ID', 'Transaction_ID', 'transaction_id', 'id', 'ID', 'Txn_ID']:
        if candidate in df.columns:
            id_col = candidate
            break

    # Look for Date/Time or timestamp column
    time_col = None
    for candidate in ['Date & Time', 'Date_Time', 'timestamp', 'Timestamp', 'Date', 'DateTime']:
        if candidate in df.columns:
            time_col = candidate
            break

    # Look for Merchant or Channel
    merchant_col = 'Merchant' if 'Merchant' in df.columns else ('merchant' if 'merchant' in df.columns else None)
    channel_col = 'Channel' if 'Channel' in df.columns else ('channel' if 'channel' in df.columns else None)

    results = []
    total_count = len(predictions)
    genuine_count = int(np.sum(predictions == 0))
    fraud_count = int(np.sum(predictions == 1))

    for idx in range(total_count):
        pred = int(predictions[idx])
        score = float(fraud_scores[idx]) if fraud_scores[idx] is not None else None
        
        # Determine transaction ID
        if id_col:
            txn_id = str(df.iloc[idx][id_col])
        else:
            txn_id = f"TXN-{idx + 1:05d}"

        # Determine timestamp string
        if time_col:
            timestamp_str = str(df.iloc[idx][time_col])
        else:
            time_sec = float(df.iloc[idx]['Time'])
            timestamp_str = f"T+{time_sec:.0f}s"

        amount_val = float(df.iloc[idx]['Amount'])
        merchant_val = str(df.iloc[idx][merchant_col]) if merchant_col else "Point of Sale"
        channel_val = str(df.iloc[idx][channel_col]) if channel_col else "Standard Terminal"

        status_str = "Potential Fraud" if pred == 1 else "Genuine"
        reason_str = (
            f"Anomalous transaction flagged by Random Forest model (Risk score: {score:.1%})"
            if pred == 1 and score is not None else
            ("Anomalous pattern identified by Random Forest model" if pred == 1 else "Normal pattern verified by Random Forest model")
        )

        results.append({
            "id": txn_id,
            "timestamp": timestamp_str,
            "Time": float(df.iloc[idx]['Time']),
            "Amount": amount_val,
            "amount": amount_val,
            "merchant": merchant_val,
            "channel": channel_val,
            "prediction": pred,
            "status": status_str,
            "score": round(score, 4) if score is not None else None,
            "flagReason": reason_str
        })

    summary = {
        "total_transactions": total_count,
        "genuine_count": genuine_count,
        "fraud_count": fraud_count,
        "fraud_rate_percentage": round((fraud_count / total_count) * 100, 3) if total_count > 0 else 0.0
    }

    return jsonify({
        "success": True,
        "summary": summary,
        "transactions": results
    }), 200

# Legacy compatibility endpoint for single transaction JSON payload
@app.route('/api/predict', methods=['POST'])
def predict_single_or_json():
    """Accepts JSON payload with 30 features or list of transactions."""
    if model is None:
        return jsonify({"error": "Prediction service is not connected."}), 503

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "No JSON payload provided."}), 400

    features = data.get('features', data)
    if isinstance(features, dict):
        missing = [f for f in REQUIRED_FEATURES if f not in features]
        if missing:
            return jsonify({"error": f"Missing required features: {', '.join(missing)}"}), 400
        
        row = [float(features[f]) for f in REQUIRED_FEATURES]
        X = pd.DataFrame([row], columns=REQUIRED_FEATURES)
        pred = int(model.predict(X)[0])
        score = float(model.predict_proba(X)[0][1]) if hasattr(model, 'predict_proba') else None
        
        return jsonify({
            "prediction": pred,
            "status": "Potential Fraud" if pred == 1 else "Genuine",
            "score": round(score, 4) if score is not None else None,
            "confidence": round(float(model.predict_proba(X)[0][pred]), 4) if hasattr(model, 'predict_proba') else None
        })

    return jsonify({"error": "Unsupported JSON payload structure. Use POST /api/analyze with a CSV file."}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"[Credit Guard] Starting Flask backend server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=False)
