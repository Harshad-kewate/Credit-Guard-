# CREDIT GUARD — Frontend Platform

> **"Security Beyond Every Transaction."**  
> Editorial-grade Intelligent Credit Card Fraud Detection Web Platform.

---

## 🏛️ Design Identity & Aesthetic

The interface has been crafted to emulate luxury creative agency publications, sophisticated editorial typography, and high-security FinTech systems:

- **Color Harmony**:
  - **Deep Ocean Teal**: `#0D3040` (Primary backgrounds)
  - **Dark Teal**: `#092936` (Main body canvas)
  - **Secondary Teal**: `#123B4B` (Hero & telemetry accents)
  - **Mustard Yellow**: `#FFD400` (Geometric blocks, underlines, primary CTAs)
  - **Warm Off-White**: `#F5F2E9` (Headlines & editorial typography)
  - **Muted Slate-Blue**: `#B9C9CE` (Descriptions & metadata)
  - **Card Background**: `#153847` (Data & analysis panels)
  - **Border**: `#315365` (Sharp editorial framing)
  - **Risk Indicators**: Red (`#EF4444`) strictly for fraud warnings; Green (`#10B981`) strictly for verified genuine transactions.

- **Typography System**:
  - **Playfair Display**: Editorial headlines and section titles.
  - **Inter**: Body text, navigation, and descriptions.
  - **Space Grotesk**: High-precision statistics, tensor inputs, and telemetry numerals.

---

## ⚡ Running the Frontend Independently

The frontend is completely decoupled, independently runnable, and production-ready.

```bash
# Navigate to the frontend directory
cd frontend

# Run local development server
npm run dev

# Or build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔌 Flask Backend Integration Specification

The frontend dispatches inferences to `/api/predict` (proxied in `vite.config.js` to `http://127.0.0.1:5000/api/predict` or `/predict`).

### 1. Health Check Endpoint
- **URL**: `GET /api/health`
- **Response**:
```json
{
  "status": "ok",
  "model": "Random Forest Classifier",
  "features_required": 30
}
```

### 2. Prediction Inference Endpoint
- **URL**: `POST /api/predict`
- **Request Payload**:
```json
{
  "features": {
    "Time": 406.0,
    "Amount": 45.50,
    "V1": -0.9255,
    "V2": 0.7291,
    "V3": 1.5794,
    ...
    "V28": 0.0142
  },
  "feature_vector": [406.0, 45.50, -0.9255, 0.7291, ...]
}
```

- **Expected Response**:
```json
{
  "prediction": 0,
  "class_name": "Genuine",
  "confidence": 0.9985,
  "model": "Random Forest Classifier"
}
```
*(Or `"prediction": 1` / `"class_name": "Fraudulent"`)*

When the Flask backend is not running, the frontend gracefully displays:
> **"Prediction service is not connected yet."**  
> With interactive instructions, payload inspector, and instant reconnection ping.
