import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Terminal, 
  Cpu, 
  Copy, 
  Check, 
  RefreshCw, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function PredictionResult({ result, loading, onRetry, rawFeatures }) {
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [showPayload, setShowPayload] = useState(false);

  if (loading) {
    return (
      <div className="bg-[#153847] border-2 border-[#FFD400] p-8 shadow-2xl relative">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-[#315365] border-t-[#FFD400] animate-spin" />
            <Cpu className="w-6 h-6 text-[#FFD400] absolute inset-0 m-auto" />
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#F5F2E9] mb-2">
            Evaluating Transaction Features...
          </h3>
          <p className="text-sm font-mono-num text-[#B9C9CE] max-w-md">
            Executing 30-feature decision tree traversal against the Random Forest classification model.
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-[#153847]/70 border border-[#315365] p-8 text-center relative">
        <div className="w-12 h-1 bg-[#315365] mx-auto mb-4" />
        <h3 className="font-editorial text-xl font-semibold text-[#F5F2E9] mb-2">
          Model Inference Panel
        </h3>
        <p className="text-sm text-[#B9C9CE] max-w-md mx-auto">
          Complete the 30 transaction parameters or load a sample preset, then click <strong className="text-[#FFD400]">Analyze Transaction</strong> to run detection.
        </p>
      </div>
    );
  }

  // Case 1: Backend is not connected yet (Mandatory requirement)
  if (!result.connected) {
    const jsonString = JSON.stringify(result.preparedPayload || rawFeatures, null, 2);

    const handleCopy = () => {
      navigator.clipboard.writeText(jsonString);
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    };

    return (
      <div className="bg-[#123B4B] border-2 border-[#FFD400] p-6 sm:p-8 shadow-2xl relative">
        {/* Top Accent */}
        <div className="flex items-center justify-between border-b border-[#315365] pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 bg-[#FFD400]" />
            <span className="text-xs font-mono-num tracking-widest text-[#FFD400] uppercase font-bold">
              API INTEGRATION STATUS
            </span>
          </div>
          <span className="text-[10px] font-mono-num bg-[#092936] text-[#B9C9CE] px-2.5 py-1 border border-[#315365]">
            ENDPOINT: /api/predict
          </span>
        </div>

        {/* Primary Required Heading */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-[#092936] border border-[#FFD400] flex items-center justify-center text-[#FFD400] shrink-0">
            <AlertTriangle className="w-6 h-6 text-[#FFD400]" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5F2E9] mb-1">
              Prediction service is not connected yet.
            </h3>
            <p className="text-sm text-[#B9C9CE] leading-relaxed">
              The frontend interface and input validation are fully operational. To receive live inferences from your trained Random Forest model, start your local Flask API server.
            </p>
          </div>
        </div>

        {/* Integration Instructions Card */}
        <div className="bg-[#092936] border border-[#315365] p-5 mb-6">
          <div className="flex items-center justify-between mb-3 text-xs font-mono-num text-[#B9C9CE]">
            <span className="flex items-center gap-2 text-[#F5F2E9] font-semibold">
              <Terminal className="w-4 h-4 text-[#FFD400]" />
              Flask Connection Guide
            </span>
            <button
              onClick={onRetry}
              className="text-[#FFD400] hover:underline flex items-center gap-1.5 cursor-pointer text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry Connection</span>
            </button>
          </div>

          <div className="bg-[#051720] border border-[#315365]/60 p-3 font-mono-num text-xs text-[#B9C9CE] mb-3 overflow-x-auto">
            <code># Run your Flask backend on port 5000:</code><br />
            <code className="text-[#FFD400]">$ python predict.py</code>
          </div>

          <p className="text-xs text-[#B9C9CE]/80 leading-normal">
            The frontend automatically dispatches a verified 30-feature JSON payload to <code className="text-[#FFD400]">POST /api/predict</code> with full tensor validation.
          </p>
        </div>

        {/* Payload Inspector Collapsible */}
        <div className="border border-[#315365] bg-[#0D3040]">
          <button
            onClick={() => setShowPayload(!showPayload)}
            className="w-full flex items-center justify-between p-3.5 text-xs font-mono-num text-[#B9C9CE] hover:text-[#F5F2E9] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FFD400]" />
              <span>Inspect Prepared Model Payload (30 Validated Features)</span>
            </span>
            {showPayload ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showPayload && (
            <div className="p-4 border-t border-[#315365] bg-[#051720]">
              <div className="flex justify-end mb-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[11px] font-mono-num text-[#FFD400] hover:text-white px-2 py-1 bg-[#092936] border border-[#315365]"
                >
                  {copiedPayload ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPayload ? 'Copied' : 'Copy Payload'}</span>
                </button>
              </div>
              <pre className="font-mono-num text-[11px] text-[#B9C9CE] max-h-60 overflow-y-auto p-2 bg-[#092936] border border-[#315365]">
                {jsonString}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Case 2: Live Backend Result (Genuine or Fraud)
  const isFraud = result.predictedClass === 1 || result.className === 'Fraudulent';

  return (
    <div 
      className={`border-2 p-6 sm:p-8 shadow-2xl relative transition-all duration-300 ${
        isFraud 
          ? 'bg-[#153847] border-[#EF4444]' 
          : 'bg-[#153847] border-[#10B981]'
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#315365] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <span className={`w-3 h-3 ${isFraud ? 'bg-[#EF4444]' : 'bg-[#10B981]'}`} />
          <span className={`text-xs font-mono-num tracking-widest uppercase font-bold ${
            isFraud ? 'text-[#EF4444]' : 'text-[#10B981]'
          }`}>
            {isFraud ? 'RISK ALERT // CLASS 1' : 'SECURITY VERIFIED // CLASS 0'}
          </span>
        </div>
        <span className="text-[10px] font-mono-num bg-[#092936] text-[#B9C9CE] px-2.5 py-1 border border-[#315365]">
          LIVE INFERENCE RESULT
        </span>
      </div>

      {/* Main Status Headline */}
      <div className="flex items-start gap-5 mb-8">
        <div 
          className={`w-14 h-14 border flex items-center justify-center shrink-0 ${
            isFraud 
              ? 'bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]' 
              : 'bg-[#10B981]/10 border-[#10B981] text-[#10B981]'
          }`}
        >
          {isFraud ? (
            <ShieldAlert className="w-8 h-8 text-[#EF4444]" />
          ) : (
            <ShieldCheck className="w-8 h-8 text-[#10B981]" />
          )}
        </div>

        <div>
          <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#F5F2E9] mb-2">
            {isFraud ? 'Potential Fraud Detected.' : 'Transaction Appears Genuine.'}
          </h3>
          <p className="text-sm text-[#B9C9CE] leading-relaxed">
            {isFraud 
              ? 'The classification model identified abnormal behavioral vectors and out-of-distribution PCA components corresponding to documented fraudulent activity.'
              : 'The transaction parameters align with legitimate historical cardholder behavior and standard variance boundaries across all evaluated dimensions.'}
          </p>
        </div>
      </div>

      {/* Metric Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Predicted Class */}
        <div className="bg-[#092936] border border-[#315365] p-4">
          <div className="text-[10px] font-mono-num uppercase tracking-wider text-[#B9C9CE] mb-1">
            Predicted Class
          </div>
          <div className={`font-mono-num text-xl font-bold ${isFraud ? 'text-[#EF4444]' : 'text-[#10B981]'}`}>
            {isFraud ? 'Class 1 (Fraudulent)' : 'Class 0 (Genuine)'}
          </div>
        </div>

        {/* Model Information */}
        <div className="bg-[#092936] border border-[#315365] p-4">
          <div className="text-[10px] font-mono-num uppercase tracking-wider text-[#B9C9CE] mb-1">
            Model Architecture
          </div>
          <div className="font-editorial text-sm font-semibold text-[#F5F2E9]">
            {result.modelInfo || 'Random Forest Classifier'}
          </div>
        </div>

        {/* Confidence (Displayed only when provided by backend) */}
        <div className="bg-[#092936] border border-[#315365] p-4">
          <div className="text-[10px] font-mono-num uppercase tracking-wider text-[#B9C9CE] mb-1">
            Model Confidence
          </div>
          <div className="font-mono-num text-xl font-bold text-[#FFD400]">
            {result.confidence !== null && result.confidence !== undefined
              ? `${(result.confidence * 100).toFixed(2)}%`
              : 'Provided by Backend'}
          </div>
        </div>
      </div>

      {/* Footer metadata */}
      <div className="pt-4 border-t border-[#315365] flex items-center justify-between text-[11px] font-mono-num text-[#B9C9CE]">
        <span>EVALUATED FEATURES: 30 / 30</span>
        <span className="text-[#FFD400]">CREDIT GUARD ML ENGINE</span>
      </div>
    </div>
  );
}
