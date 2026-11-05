import React, { useState } from 'react';
import { 
  Server, 
  Activity, 
  Bell, 
  Sliders, 
  Check, 
  RefreshCw, 
  Trash2, 
  Lock,
  Save
} from 'lucide-react';
import { checkBackendHealth, getApiBaseUrl, setApiBaseUrl } from '../services/api';

export default function SettingsView({ backendConnected, setBackendConnected, onClearData }) {
  const [apiUrl, setApiUrl] = useState('http://127.0.0.1:5000/api');
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState(null);
  const [riskSensitivity, setRiskSensitivity] = useState('standard');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionMessage(null);
    const res = await checkBackendHealth();
    setTestingConnection(false);
    setBackendConnected(res.connected);
    if (res.connected) {
      setConnectionMessage({ type: 'success', text: 'Successfully connected to Flask ML backend.' });
    } else {
      setConnectionMessage({ type: 'error', text: 'Prediction service is not connected. Ensure python predict.py is running on port 5000.' });
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setApiBaseUrl(apiUrl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-[#17243A] font-heading tracking-tight">
          Settings
        </h2>
        <p className="text-xs md:text-sm text-[#7B8798]">
          Configure machine learning model connection and operational preferences.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Model Connection Panel */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF0]">
            <div className="flex items-center gap-2.5">
              <Server className="w-4 h-4 text-[#4568F5]" />
              <h3 className="text-sm font-bold text-[#17243A] font-heading">
                Inference API Gateway
              </h3>
            </div>
            
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono-num font-medium ${
              backendConnected 
                ? 'bg-[#13B8A6]/10 text-[#13B8A6] border border-[#13B8A6]/30' 
                : 'bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/30'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${backendConnected ? 'bg-[#13B8A6]' : 'bg-[#F5A623]'}`} />
              {backendConnected ? 'Backend Connected' : 'Prediction Service Standby'}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#17243A] block mb-1">
              Flask Inference Endpoint URL
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="http://127.0.0.1:5000/api"
                className="flex-1 px-3.5 py-2 bg-[#F5F7FA] border border-[#E5EAF0] rounded-lg text-xs font-mono-num text-[#17243A] focus:outline-none focus:border-[#4568F5] focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testingConnection}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#F5F7FA] border border-[#E5EAF0] text-[#17243A] hover:bg-white rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {testingConnection ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#4568F5]" />
                ) : (
                  <Activity className="w-3.5 h-3.5 text-[#4568F5]" />
                )}
                <span>Test Connection</span>
              </button>
            </div>
            <p className="text-[11px] text-[#7B8798] mt-1.5">
              Specifies the target REST API receiving 30-feature vectors at <code className="font-mono-num text-[#17243A]">POST /api/predict</code>
            </p>
          </div>

          {connectionMessage && (
            <div className={`p-3 rounded-lg text-xs ${
              connectionMessage.type === 'success' 
                ? 'bg-[#13B8A6]/10 text-[#13B8A6] border border-[#13B8A6]/30' 
                : 'bg-[#EF5350]/10 text-[#EF5350] border border-[#EF5350]/30'
            }`}>
              {connectionMessage.text}
            </div>
          )}
        </div>

        {/* Risk Sensitivity Threshold */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5EAF0]">
            <Sliders className="w-4 h-4 text-[#4568F5]" />
            <h3 className="text-sm font-bold text-[#17243A] font-heading">
              Risk Classification Sensitivity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'conservative', label: 'Conservative', desc: 'Higher recall, catches subtle anomalies at lower probability' },
              { id: 'standard', label: 'Balanced (Standard)', desc: 'Optimized precision-recall trade-off (Recommended)' },
              { id: 'aggressive', label: 'High Tolerance', desc: 'High precision, flags only unambiguous fraud patterns' }
            ].map((item) => (
              <label
                key={item.id}
                onClick={() => setRiskSensitivity(item.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  riskSensitivity === item.id
                    ? 'border-[#4568F5] bg-[#4568F5]/5 ring-1 ring-[#4568F5]'
                    : 'border-[#E5EAF0] hover:bg-[#F5F7FA]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#17243A]">
                    {item.label}
                  </span>
                  <input
                    type="radio"
                    name="sensitivity"
                    checked={riskSensitivity === item.id}
                    onChange={() => setRiskSensitivity(item.id)}
                    className="text-[#4568F5]"
                  />
                </div>
                <p className="text-[11px] text-[#7B8798] leading-normal">
                  {item.desc}
                </p>
              </label>
            ))}
          </div>
        </div>

        {/* Operational Alerts */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5EAF0]">
            <Bell className="w-4 h-4 text-[#4568F5]" />
            <h3 className="text-sm font-bold text-[#17243A] font-heading">
              Operational Alerts
            </h3>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <span className="text-xs font-semibold text-[#17243A] block">
                Fraud Anomaly Notifications
              </span>
              <span className="text-[11px] text-[#7B8798]">
                Trigger automated alerts to compliance officers when high-risk transactions are detected
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-[#4568F5] rounded border-[#E5EAF0] cursor-pointer"
            />
          </div>
        </div>

        {/* Data Reset & Save Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={onClearData}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#EF5350] hover:bg-[#EF5350]/10 border border-[#EF5350]/30 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Loaded Transactions</span>
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#4568F5] text-white rounded-lg text-xs font-semibold hover:bg-[#3453D8] transition-colors cursor-pointer shadow-xs"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Preferences Saved</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Preferences</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
