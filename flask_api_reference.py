"""
Credit Guard - Flask API Integration Reference
Security Beyond Every Transaction

This file illustrates how to connect the existing ML model (`fraud_model.pkl` or `predict.py`)
with the Credit Guard frontend.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

# Optional: Load joblib model if available
try:
    import joblib
    model = joblib.load('fraud_model.pkl')
    print("[Credit Guard] Loaded fraud_model.pkl successfully.")
except Exception as e:
    model = None
    print(f"[Credit Guard] Model load notice: {e}")

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin requests for frontend

FEATURE_NAMES = [
    'Time', 'Amount',
    'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10',
    'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17', 'V18', 'V19', 'V20',
    'V21', 'V22', 'V23', 'V24', 'V25', 'V26', 'V27', 'V28'
]

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "service": "Credit Guard ML Inference API",
        "model_loaded": model is not None,
        "model_type": "Random Forest Classifier",
        "features_required": 30
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400

    features = data.get('features', {})
    vector = []
    
    # Strictly validate all 30 features
    for key in FEATURE_NAMES:
        if key not in features or features[key] is None or features[key] == '':
            return jsonify({
                "error": f"Missing mandatory feature '{key}'. All 30 features are strictly required."
            }), 422
        try:
            vector.append(float(features[key]))
        except ValueError:
            return jsonify({"error": f"Invalid float value for feature '{key}'"}), 422

    # If model is loaded, run inference
    if model is not None:
        tensor = np.array([vector])
        pred = int(model.predict(tensor)[0])
        
        # Calculate confidence if predict_proba is supported
        confidence = None
        if hasattr(model, 'predict_proba'):
            probs = model.predict_proba(tensor)[0]
            confidence = float(probs[pred])

        return jsonify({
            "prediction": pred,
            "class_name": "Fraudulent" if pred == 1 else "Genuine",
            "confidence": confidence,
            "model": "Random Forest Classifier"
        })

    # If model file is not present yet in directory
    return jsonify({
        "error": "Model binary not loaded. Please ensure fraud_model.pkl exists."
    }), 503

if __name__ == '__main__':
    print("[Credit Guard API] Starting Flask server on http://127.0.0.1:5000 ...")
    app.run(host='127.0.0.1', port=5000, debug=True)
