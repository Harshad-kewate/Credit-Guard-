/**
 * Credit Guard - API Service
 * Connects the frontend to the deployed Flask backend.
 */

let apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

export function setApiBaseUrl(url) {
  apiBaseUrl = url.replace(/\/+$/, '');
}

export function getApiBaseUrl() {
  return apiBaseUrl;
}

export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${apiBaseUrl}/health`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
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
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(`${apiBaseUrl}/analyze`, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (response.ok && data?.success) {
      return {
        success: true,
        connected: true,
        summary: data.summary,
        transactions: data.transactions
      };
    }

    return {
      success: false,
      connected: true,
      error: data?.error || `Server responded with HTTP ${response.status}`,
      missingFeatures: data?.missing_features || null,
      details: data
    };
  } catch (err) {
    return {
      success: false,
      connected: false,
      error: 'Prediction service is not connected.',
      details: err.message
    };
  }
}

export const runFraudAnalysis = analyzeCsvFile;