import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  ShieldAlert, 
  Play, 
  RefreshCw,
  Terminal,
  FileSpreadsheet,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { analyzeCsvFile } from '../services/api';

export default function FraudDetectionView({ onTransactionsUploaded, setActiveTab }) {
  const [file, setFile] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [fileSize, setFileSize] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const fileInputRef = useRef(null);

  const handleSelectedFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
      setValidationError({
        message: 'Invalid file format. Please upload a standard tabular .csv file.'
      });
      return;
    }

    const sizeStr = (selectedFile.size / 1024).toFixed(1) + ' KB';
    setRawFile(selectedFile);
    setFile({ name: selectedFile.name });
    setFileSize(sizeStr);
    setUploadProgress(100);
    setAnalysisResult(null);
    setValidationError(null);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      handleSelectedFile(selected);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleSelectedFile(droppedFile);
    }
  };

  // Loads authentic sample dataset containing all 30 features
  const handleLoadSampleCSV = async () => {
    try {
      const response = await fetch('/sample_credit_card_batch.csv');
      if (!response.ok) {
        throw new Error('Sample CSV file not found');
      }
      const blob = await response.blob();
      const sampleFile = new File([blob], 'sample_credit_card_batch.csv', { type: 'text/csv' });
      handleSelectedFile(sampleFile);
    } catch (err) {
      setValidationError({
        message: 'Could not load sample file: ' + err.message
      });
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setRawFile(null);
    setFileSize('');
    setUploadProgress(0);
    setAnalysisResult(null);
    setValidationError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRunAnalysis = async () => {
    if (!rawFile) return;

    setAnalyzing(true);
    setAnalysisResult(null);
    setValidationError(null);

    // Send original CSV file to POST /api/analyze via FormData
    const result = await analyzeCsvFile(rawFile);
    setAnalyzing(false);

    if (result.success) {
      setAnalysisResult(result);
      // Update global application state (Dashboard & Transactions table)
      if (onTransactionsUploaded) {
        onTransactionsUploaded(result.transactions, result.summary);
      }
    } else {
      if (!result.connected) {
        setAnalysisResult({
          connected: false,
          error: 'Prediction service is not connected.'
        });
      } else {
        // Backend validation error (e.g. missing columns, non-numeric values)
        setValidationError({
          message: result.error || 'Dataset validation error.',
          missingFeatures: result.missingFeatures || null
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-[#17243A] font-heading tracking-tight">
          Analyze Transactions
        </h2>
        <p className="text-xs md:text-sm text-[#7B8798]">
          Upload transaction data to begin fraud analysis.
        </p>
      </div>

      {/* Main Drag-and-Drop Upload Card */}
      <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-xs">
        
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !file && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all cursor-pointer ${
            isDragging 
              ? 'border-[#4568F5] bg-[#4568F5]/5' 
              : 'border-[#E5EAF0] hover:border-[#4568F5]/50 bg-[#F5F7FA]/40'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            className="hidden"
          />

          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white border border-[#E5EAF0] flex items-center justify-center text-[#4568F5] shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-sm md:text-base font-bold text-[#17243A] font-heading mb-1">
            Drag and drop your transaction CSV here
          </h3>
          <p className="text-xs text-[#7B8798] mb-4">
            Upload CSV containing transaction feature vectors for Random Forest fraud detection
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-4 py-2 bg-[#4568F5] text-white rounded-lg text-xs font-semibold hover:bg-[#3453D8] transition-colors cursor-pointer"
            >
              Upload CSV
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadSampleCSV();
              }}
              className="px-4 py-2 bg-white border border-[#E5EAF0] text-[#17243A] rounded-lg text-xs font-medium hover:bg-[#F5F7FA] transition-colors cursor-pointer"
            >
              Load Sample Dataset (30 Features)
            </button>
          </div>
        </div>

        {/* Validation Error Alert */}
        {validationError && (
          <div className="mt-5 p-4 rounded-xl border border-[#EF5350]/30 bg-[#EF5350]/5 text-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#EF5350] shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold text-[#EF5350] block text-sm mb-1">
                  Dataset Validation Failed
                </span>
                <p className="text-[#17243A] leading-relaxed mb-2">
                  {validationError.message}
                </p>
                {validationError.missingFeatures && validationError.missingFeatures.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-[#EF5350]/20">
                    <span className="text-[11px] font-semibold text-[#7B8798] block mb-1">
                      Missing Feature Columns ({validationError.missingFeatures.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {validationError.missingFeatures.map((feat) => (
                        <span key={feat} className="px-1.5 py-0.5 bg-white border border-[#EF5350]/40 text-[#EF5350] rounded font-mono-num text-[10px]">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setValidationError(null)}
                className="text-[#7B8798] hover:text-[#17243A] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Selected File Card & Progress */}
        {file && (
          <div className="mt-5 p-4 rounded-xl border border-[#E5EAF0] bg-[#F5F7FA]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E5EAF0] flex items-center justify-center text-[#4568F5]">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#17243A] block">
                    {file.name}
                  </span>
                  <span className="text-[11px] text-[#7B8798]">
                    {fileSize} • Ready for analysis
                  </span>
                </div>
              </div>

              <button
                onClick={handleRemoveFile}
                className="p-1 text-[#7B8798] hover:text-[#EF5350] transition-colors cursor-pointer"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Upload Progress Bar */}
            <div className="w-full bg-[#E5EAF0] h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-[#13B8A6] h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>

            {/* Run Analysis Action Button */}
            <div className="mt-4 pt-3 border-t border-[#E5EAF0] flex items-center justify-between">
              <span className="text-xs text-[#7B8798]">
                Dispatches original CSV directly to Flask model endpoint
              </span>

              <button
                onClick={handleRunAnalysis}
                disabled={analyzing}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#4568F5] text-white rounded-lg text-xs font-semibold hover:bg-[#3453D8] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Evaluating Model on Batch...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Fraud Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Fraud Detection Results Panel */}
      {analysisResult && (
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-xs animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF0] mb-5">
            <h3 className="text-sm font-bold text-[#17243A] font-heading">
              Fraud Detection Result
            </h3>
            <span className="text-[11px] font-mono-num text-[#7B8798] bg-[#F5F7FA] px-2.5 py-1 rounded-md border border-[#E5EAF0]">
              Inference Endpoint: POST /api/analyze
            </span>
          </div>

          {/* When Backend is Not Connected */}
          {!analysisResult.connected ? (
            <div className="p-5 rounded-xl border border-[#F5A623]/30 bg-[#F5A623]/5">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#F5A623]/10 border border-[#F5A623]/30 flex items-center justify-center text-[#F5A623] shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#17243A]">
                    Prediction service is not connected.
                  </h4>
                  <p className="text-xs text-[#7B8798] leading-relaxed mt-1">
                    The frontend interface and CSV transaction ingestion are active. To run live machine learning classification, start your local Flask prediction server.
                  </p>
                </div>
              </div>

              {/* Status pill showing the 3 possible result states */}
              <div className="pt-4 border-t border-[#E5EAF0] grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white border border-[#E5EAF0] rounded-lg">
                  <span className="text-[10px] font-medium text-[#7B8798] uppercase block mb-1">
                    State 01
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#13B8A6]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Genuine Transaction</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E5EAF0] rounded-lg">
                  <span className="text-[10px] font-medium text-[#7B8798] uppercase block mb-1">
                    State 02
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#EF5350]">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Potential Fraud</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E5EAF0] rounded-lg">
                  <span className="text-[10px] font-medium text-[#7B8798] uppercase block mb-1">
                    Current State
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5A623]">
                    <Clock className="w-4 h-4" />
                    <span>Analysis Pending</span>
                  </div>
                </div>
              </div>

              {/* Command line start hint */}
              <div className="mt-4 p-3 bg-[#17243A] text-white rounded-lg font-mono-num text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#4568F5]" />
                  <span>$ python backend/app.py</span>
                </div>
                <button
                  onClick={handleRunAnalysis}
                  className="text-[#4568F5] hover:text-white text-[11px] underline cursor-pointer"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          ) : (
            /* Actual Live Prediction Results from Trained Random Forest Model */
            <div className="space-y-6">
              
              <div className="flex items-center justify-between p-4 bg-[#13B8A6]/10 border border-[#13B8A6]/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#13B8A6] text-white flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#17243A]">
                      Batch Model Inference Completed
                    </h4>
                    <p className="text-xs text-[#7B8798]">
                      Evaluated {analysisResult.summary.total_transactions} transactions with the trained Random Forest classifier.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('transactions')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#17243A] text-white rounded-lg text-xs font-semibold hover:bg-[#253754] transition-colors cursor-pointer"
                >
                  <span>View in Ledger</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Summary KPIs from Actual Predictions */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                
                <div className="p-4 bg-[#F5F7FA] border border-[#E5EAF0] rounded-xl">
                  <span className="text-[11px] font-medium text-[#7B8798] block mb-1">
                    Total Transactions
                  </span>
                  <div className="text-2xl font-bold font-mono-num text-[#17243A]">
                    {analysisResult.summary.total_transactions}
                  </div>
                </div>

                <div className="p-4 bg-[#F5F7FA] border border-[#E5EAF0] rounded-xl">
                  <span className="text-[11px] font-medium text-[#7B8798] block mb-1">
                    Genuine Transactions
                  </span>
                  <div className="text-2xl font-bold font-mono-num text-[#13B8A6]">
                    {analysisResult.summary.genuine_count}
                  </div>
                </div>

                <div className="p-4 bg-[#F5F7FA] border border-[#E5EAF0] rounded-xl">
                  <span className="text-[11px] font-medium text-[#7B8798] block mb-1">
                    Potential Fraud
                  </span>
                  <div className={`text-2xl font-bold font-mono-num ${analysisResult.summary.fraud_count > 0 ? 'text-[#EF5350]' : 'text-[#17243A]'}`}>
                    {analysisResult.summary.fraud_count}
                  </div>
                </div>

                <div className="p-4 bg-[#F5F7FA] border border-[#E5EAF0] rounded-xl">
                  <span className="text-[11px] font-medium text-[#7B8798] block mb-1">
                    Fraud Rate
                  </span>
                  <div className="text-2xl font-bold font-mono-num text-[#17243A]">
                    {analysisResult.summary.fraud_rate_percentage}%
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
