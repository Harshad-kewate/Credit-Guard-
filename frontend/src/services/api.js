/**
 * Credit Guard - Enterprise FinTech API Service
 * 
 * Production integration layer for the trained Random Forest Flask backend.
 * Endpoints:
 * - GET  /api/health
 * - POST /api/analyze (multipart/form-data with original CSV file)
 */

let apiBaseUrl = '/api';

export function setApiBaseUrl(url) {
  // Normalize trailing slashes
  apiBaseUrl = url.replace(/\/+$/, '');
}

export function getApiBaseUrl() {
  return apiBaseUrl;
}

/**
 * Probes the Flask backend to verify model status and availability.
 */
export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${apiBaseUrl}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return { 
        connected: true, 
        modelLoaded: Boolean(data.model_loaded),
        details: data 
      };
    }
    return { 
      connected: false, 
      error: 'Prediction service is not connected.' 
    };
  } catch (err) {
    return {
      connected: false,
      error: 'Prediction service is not connected.'
    };
  }
}

/**
 * Sends the original uploaded CSV file to POST /api/analyze using FormData.
 * 
 * Strict requirements:
 * - Sends original CSV file directly via multipart/form-data.
 * - Does not send manually generated objects.
 * - Never fabricates predictions.
 * - Handles validation errors (e.g. missing columns, nulls, non-numeric values).
 */
export async function analyzeCsvFile(csvFile) {
  if (!csvFile) {
    return {
      success: false,
      connected: true,
      error: 'No CSV file provided for analysis.'
    };
  }

  try {
    const formData = new FormData();
    formData.append('file', csvFile, csvFile.name || 'transactions.csv');

    const controller = new AbortController();
    // Allow ample timeout for larger batch processing
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(`${apiBaseUrl}/analyze`, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (response.ok && data && data.success) {
      return {
        success: true,
        connected: true,
        summary: data.summary,
        transactions: data.transactions
      };
    }

    // Backend returned validation error (400) or server error (500)
    return {
      success: false,
      connected: true,
      error: data?.error || `Server responded with HTTP ${response.status}`,
      missingFeatures: data?.missing_features || null,
      details: data
    };

  } catch (err) {
    // Network error or server not responding
    return {
      success: false,
      connected: false,
      error: 'Prediction service is not connected.',
      details: 'Ensure the Flask backend server is running (python backend/app.py) on port 5000.'
    };
  }
}

// Retain alias for backwards compatibility
export const runFraudAnalysis = analyzeCsvFile;
