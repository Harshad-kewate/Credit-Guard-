import React, { useState } from 'react';
import { 
  SAMPLE_PRESETS, 
  EMPTY_FORM_STATE, 
  FEATURE_INFO 
} from '../data/sampleTransactions';
import { predictTransaction } from '../services/api';
import PredictionResult from './PredictionResult';
import { 
  Layers, 
  RotateCcw, 
  Send, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Sliders
} from 'lucide-react';

export default function FraudDetection() {
  const [formData, setFormData] = useState({ ...EMPTY_FORM_STATE });
  const [activePreset, setActivePreset] = useState(null);
  const [openGroups, setOpenGroups] = useState({
    group1: true,
    group2: true,
    group3: false,
  });
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  // Group definitions
  const group1Keys = ['Time', 'Amount'];
  const group2Keys = Array.from({ length: 14 }, (_, i) => `V${i + 1}`);
  const group3Keys = Array.from({ length: 14 }, (_, i) => `V${i + 15}`);
  const allKeys = [...group1Keys, ...group2Keys, ...group3Keys];

  // Calculate completeness
  const filledCount = allKeys.filter(
    (k) => formData[k] !== '' && formData[k] !== undefined && !isNaN(parseFloat(formData[k]))
  ).length;

  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear validation error for this field if resolved
    if (validationErrors.includes(key)) {
      setValidationErrors((prev) => prev.filter((k) => k !== key));
    }
  };

  const loadPreset = (preset) => {
    setActivePreset(preset.id);
    setFormData({ ...preset.data });
    setValidationErrors([]);
    setPredictionResult(null);
    // Expand all groups so the user can inspect the filled values
    setOpenGroups({ group1: true, group2: true, group3: true });
  };

  const handleReset = () => {
    setFormData({ ...EMPTY_FORM_STATE });
    setActivePreset(null);
    setValidationErrors([]);
    setPredictionResult(null);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    // Strict validation: identify every missing or non-numeric field
    const emptyFields = allKeys.filter(
      (k) => formData[k] === '' || formData[k] === undefined || isNaN(parseFloat(formData[k]))
    );

    if (emptyFields.length > 0) {
      setValidationErrors(emptyFields);
      // Auto-expand the groups that contain missing fields
      const hasG1 = emptyFields.some((k) => group1Keys.includes(k));
      const hasG2 = emptyFields.some((k) => group2Keys.includes(k));
      const hasG3 = emptyFields.some((k) => group3Keys.includes(k));
      setOpenGroups((prev) => ({
        group1: prev.group1 || hasG1,
        group2: prev.group2 || hasG2,
        group3: prev.group3 || hasG3,
      }));
      return;
    }

    setValidationErrors([]);
    setLoading(true);

    try {
      const response = await predictTransaction(formData);
      setPredictionResult(response);
    } catch (err) {
      setPredictionResult({
        connected: false,
        error: 'Prediction service is not connected yet.',
      });
    } finally {
      setLoading(false);
      // Smooth scroll to result
      const resultEl = document.getElementById('prediction-result-anchor');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="detection" className="relative py-24 bg-[#092936] bg-editorial-grid border-b border-[#315365]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono-num tracking-[0.25em] text-[#FFD400] uppercase font-semibold">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Machine Learning Inference</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F2E9] tracking-tight leading-tight mb-4">
            Every Transaction <br />
            <span className="editorial-underline italic font-normal text-[#F5F2E9]">
              Tells a Story.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#B9C9CE] leading-relaxed">
            Evaluate transaction information through a trained Machine Learning classification model.
          </p>
        </div>

        {/* Preset Selector Bar */}
        <div className="bg-[#0D3040] border border-[#315365] p-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-mono-num uppercase tracking-wider text-[#FFD400] font-bold block mb-1">
                Authentic Benchmark Presets
              </span>
              <p className="text-xs text-[#B9C9CE]">
                Load verified records from the dataset to test the 30-feature vector, or manually input parameters below.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono-num text-xs text-[#B9C9CE]">
              <span>Parameters Filled:</span>
              <span className={`px-2 py-0.5 font-bold ${filledCount === 30 ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40' : 'bg-[#FFD400]/20 text-[#FFD400] border border-[#FFD400]/40'}`}>
                {filledCount} / 30
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SAMPLE_PRESETS.map((preset) => {
              const isSelected = activePreset === preset.id;
              const isFraud = preset.type === 'fraud';

              return (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset)}
                  className={`text-left p-3.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#153847] border-[#FFD400] shadow-md'
                      : 'bg-[#092936] border-[#315365] hover:border-[#B9C9CE]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-mono-num font-bold uppercase tracking-wider px-1.5 py-0.5 border ${
                      isFraud 
                        ? 'text-[#EF4444] border-[#EF4444]/40 bg-[#EF4444]/10' 
                        : 'text-[#10B981] border-[#10B981]/40 bg-[#10B981]/10'
                    }`}>
                      {isFraud ? 'Known Fraud' : 'Genuine Case'}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#FFD400]" />}
                  </div>
                  <div className="font-editorial text-sm font-semibold text-[#F5F2E9] mb-1 line-clamp-1">
                    {preset.title}
                  </div>
                  <div className="text-[11px] text-[#B9C9CE] line-clamp-2 leading-tight">
                    {preset.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Validation Error Alert */}
        {validationErrors.length > 0 && (
          <div className="bg-[#EF4444]/15 border-2 border-[#EF4444] p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-mono-num font-bold text-[#EF4444] uppercase tracking-wider mb-1">
                Incomplete Feature Vector ({validationErrors.length} Parameters Missing)
              </h4>
              <p className="text-xs text-[#F5F2E9] leading-relaxed">
                The trained Random Forest model strictly requires all 30 original features (Time, Amount, V1–V28). Incomplete data cannot be submitted, and missing values are not silently zero-filled to preserve inference integrity. Please fill the highlighted fields or select an authentic preset above.
              </p>
            </div>
          </div>
        )}

        {/* Main 30-Feature Input Form */}
        <form onSubmit={handleAnalyze} className="space-y-6">
          
          {/* GROUP 1: Transaction Information (Time, Amount) */}
          <div className="bg-[#153847] border border-[#315365] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleGroup('group1')}
              className="w-full flex items-center justify-between p-5 bg-[#0D3040] border-b border-[#315365] text-left hover:bg-[#123B4B] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-[#FFD400]" />
                <div>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#F5F2E9]">
                    GROUP 1: Transaction Information
                  </h3>
                  <span className="text-xs font-mono-num text-[#B9C9CE]">
                    Primary Transaction Metadata (Time offset & Transaction Amount)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-num text-[#FFD400] hidden sm:inline">
                  2 Features
                </span>
                {openGroups.group1 ? <ChevronUp className="w-5 h-5 text-[#B9C9CE]" /> : <ChevronDown className="w-5 h-5 text-[#B9C9CE]" />}
              </div>
            </button>

            {openGroups.group1 && (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Time */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <label 
                      htmlFor="feature-Time" 
                      className="text-xs font-mono-num uppercase tracking-wider text-[#F5F2E9] font-semibold flex items-center gap-2"
                    >
                      <span>Time (Seconds Elapsed)</span>
                      <button
                        type="button"
                        onClick={() => setActiveTooltip(activeTooltip === 'Time' ? null : 'Time')}
                        className="text-[#B9C9CE] hover:text-[#FFD400]"
                        title={FEATURE_INFO.Time}
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </label>
                    <span className="text-[10px] font-mono-num text-[#B9C9CE]">Range: 0 - 172,792</span>
                  </div>

                  <input
                    id="feature-Time"
                    type="number"
                    step="any"
                    value={formData.Time}
                    onChange={(e) => handleInputChange('Time', e.target.value)}
                    placeholder="e.g. 406.0"
                    className={`w-full px-4 py-3 bg-[#092936] text-[#F5F2E9] font-mono-num text-sm border focus:outline-none transition-colors ${
                      validationErrors.includes('Time')
                        ? 'border-[#EF4444] ring-1 ring-[#EF4444]'
                        : 'border-[#315365] focus:border-[#FFD400]'
                    }`}
                  />
                  {activeTooltip === 'Time' && (
                    <div className="mt-2 p-2.5 bg-[#0D3040] border border-[#FFD400] text-xs text-[#B9C9CE] font-mono-num">
                      {FEATURE_INFO.Time}
                    </div>
                  )}
                </div>

                {/* Amount */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <label 
                      htmlFor="feature-Amount" 
                      className="text-xs font-mono-num uppercase tracking-wider text-[#F5F2E9] font-semibold flex items-center gap-2"
                    >
                      <span>Amount (€ / EUR)</span>
                      <button
                        type="button"
                        onClick={() => setActiveTooltip(activeTooltip === 'Amount' ? null : 'Amount')}
                        className="text-[#B9C9CE] hover:text-[#FFD400]"
                        title={FEATURE_INFO.Amount}
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </label>
                    <span className="text-[10px] font-mono-num text-[#B9C9CE]">Euros</span>
                  </div>

                  <input
                    id="feature-Amount"
                    type="number"
                    step="any"
                    value={formData.Amount}
                    onChange={(e) => handleInputChange('Amount', e.target.value)}
                    placeholder="e.g. 149.50"
                    className={`w-full px-4 py-3 bg-[#092936] text-[#F5F2E9] font-mono-num text-sm border focus:outline-none transition-colors ${
                      validationErrors.includes('Amount')
                        ? 'border-[#EF4444] ring-1 ring-[#EF4444]'
                        : 'border-[#315365] focus:border-[#FFD400]'
                    }`}
                  />
                  {activeTooltip === 'Amount' && (
                    <div className="mt-2 p-2.5 bg-[#0D3040] border border-[#FFD400] text-xs text-[#B9C9CE] font-mono-num">
                      {FEATURE_INFO.Amount}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* GROUP 2: Principal Components (V1 to V14) */}
          <div className="bg-[#153847] border border-[#315365] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleGroup('group2')}
              className="w-full flex items-center justify-between p-5 bg-[#0D3040] border-b border-[#315365] text-left hover:bg-[#123B4B] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-[#FFD400]" />
                <div>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#F5F2E9]">
                    GROUP 2: Principal Components (V1 to V14)
                  </h3>
                  <span className="text-xs font-mono-num text-[#B9C9CE]">
                    Primary Transformed Vectors (Sensitive Fraud Signals: V1, V3, V4, V10, V12, V14)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-num text-[#FFD400] hidden sm:inline">
                  14 Features
                </span>
                {openGroups.group2 ? <ChevronUp className="w-5 h-5 text-[#B9C9CE]" /> : <ChevronDown className="w-5 h-5 text-[#B9C9CE]" />}
              </div>
            </button>

            {openGroups.group2 && (
              <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {group2Keys.map((key) => {
                  const hasError = validationErrors.includes(key);
                  const isHighImpact = ['V1', 'V3', 'V4', 'V10', 'V12', 'V14'].includes(key);

                  return (
                    <div key={key} className="relative">
                      <div className="flex items-center justify-between mb-1.5">
                        <label 
                          htmlFor={`feature-${key}`}
                          className="text-[11px] font-mono-num uppercase font-semibold text-[#F5F2E9] flex items-center gap-1"
                        >
                          <span>{key}</span>
                          {isHighImpact && <span className="text-[9px] text-[#FFD400]" title="High impact feature">★</span>}
                        </label>
                        <button
                          type="button"
                          onClick={() => setActiveTooltip(activeTooltip === key ? null : key)}
                          className="text-[#B9C9CE]/60 hover:text-[#FFD400]"
                          title={FEATURE_INFO[key]}
                        >
                          <Info className="w-3 h-3" />
                        </button>
                      </div>

                      <input
                        id={`feature-${key}`}
                        type="number"
                        step="any"
                        value={formData[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        placeholder="0.00"
                        className={`w-full px-3 py-2 bg-[#092936] text-[#F5F2E9] font-mono-num text-xs border focus:outline-none transition-colors ${
                          hasError
                            ? 'border-[#EF4444] ring-1 ring-[#EF4444]'
                            : 'border-[#315365] focus:border-[#FFD400]'
                        }`}
                      />

                      {activeTooltip === key && (
                        <div className="absolute z-20 top-full left-0 mt-1 w-48 p-2 bg-[#0D3040] border border-[#FFD400] text-[10px] text-[#B9C9CE] font-mono-num shadow-xl">
                          {FEATURE_INFO[key]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* GROUP 3: Additional Components (V15 to V28) */}
          <div className="bg-[#153847] border border-[#315365] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleGroup('group3')}
              className="w-full flex items-center justify-between p-5 bg-[#0D3040] border-b border-[#315365] text-left hover:bg-[#123B4B] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-[#FFD400]" />
                <div>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#F5F2E9]">
                    GROUP 3: Additional Components (V15 to V28)
                  </h3>
                  <span className="text-xs font-mono-num text-[#B9C9CE]">
                    Secondary Transformed Vectors (Critical Tree Splits: V17, V16, V18)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-num text-[#FFD400] hidden sm:inline">
                  14 Features
                </span>
                {openGroups.group3 ? <ChevronUp className="w-5 h-5 text-[#B9C9CE]" /> : <ChevronDown className="w-5 h-5 text-[#B9C9CE]" />}
              </div>
            </button>

            {openGroups.group3 && (
              <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {group3Keys.map((key) => {
                  const hasError = validationErrors.includes(key);
                  const isHighImpact = ['V16', 'V17', 'V18'].includes(key);

                  return (
                    <div key={key} className="relative">
                      <div className="flex items-center justify-between mb-1.5">
                        <label 
                          htmlFor={`feature-${key}`}
                          className="text-[11px] font-mono-num uppercase font-semibold text-[#F5F2E9] flex items-center gap-1"
                        >
                          <span>{key}</span>
                          {isHighImpact && <span className="text-[9px] text-[#FFD400]" title="High impact feature">★</span>}
                        </label>
                        <button
                          type="button"
                          onClick={() => setActiveTooltip(activeTooltip === key ? null : key)}
                          className="text-[#B9C9CE]/60 hover:text-[#FFD400]"
                          title={FEATURE_INFO[key]}
                        >
                          <Info className="w-3 h-3" />
                        </button>
                      </div>

                      <input
                        id={`feature-${key}`}
                        type="number"
                        step="any"
                        value={formData[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        placeholder="0.00"
                        className={`w-full px-3 py-2 bg-[#092936] text-[#F5F2E9] font-mono-num text-xs border focus:outline-none transition-colors ${
                          hasError
                            ? 'border-[#EF4444] ring-1 ring-[#EF4444]'
                            : 'border-[#315365] focus:border-[#FFD400]'
                        }`}
                      />

                      {activeTooltip === key && (
                        <div className="absolute z-20 top-full left-0 mt-1 w-48 p-2 bg-[#0D3040] border border-[#FFD400] text-[10px] text-[#B9C9CE] font-mono-num shadow-xl">
                          {FEATURE_INFO[key]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#315365]">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D3040] text-[#B9C9CE] hover:text-[#F5F2E9] hover:border-[#FFD400] text-xs font-mono-num uppercase tracking-wider border border-[#315365] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All 30 Fields</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-3 px-10 py-4 bg-[#FFD400] text-[#092936] hover:bg-[#0D3040] hover:text-[#FFD400] text-xs font-bold tracking-widest uppercase border border-[#FFD400] transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Evaluating Model...' : 'Analyze Transaction'}</span>
            </button>
          </div>

        </form>

        {/* Prediction Result Anchor & Panel */}
        <div id="prediction-result-anchor" className="mt-12">
          <PredictionResult 
            result={predictionResult} 
            loading={loading}
            onRetry={handleAnalyze}
            rawFeatures={formData}
          />
        </div>

      </div>
    </section>
  );
}
