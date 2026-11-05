import React, { useState } from 'react';
import { MODEL_PERFORMANCE } from '../data/datasetStats';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle, Scale, Shield, Award } from 'lucide-react';

export default function Analytics() {
  const [activeMetric, setActiveMetric] = useState('all');

  const lr = MODEL_PERFORMANCE.logisticRegression.metrics;
  const rf = MODEL_PERFORMANCE.randomForest.metrics;

  const metricsData = [
    {
      id: 'precision',
      label: 'Precision',
      lr: lr.precision,
      rf: rf.precision,
      unit: '%',
      description: 'Ability of the classifier not to label a genuine transaction as fraudulent (minimizing false alarms).',
      winner: 'Random Forest (+89.95%)',
      analysis: 'Logistic Regression yields 93.9% false alarms (precision only 6.10%), overwhelming financial fraud analysts with spurious flags. Random Forest achieves 96.05% precision, ensuring almost every alert represents verified fraud.'
    },
    {
      id: 'recall',
      label: 'Recall',
      lr: lr.recall,
      rf: rf.recall,
      unit: '%',
      description: 'Ability of the classifier to find all fraudulent transactions (minimizing undetected fraud).',
      winner: 'Logistic Regression (+17.35%)',
      analysis: 'Logistic Regression flags a wider net capturing 91.84% of fraud, but at catastrophic precision cost. Random Forest maintains a healthy 74.49% recall while delivering operational stability.'
    },
    {
      id: 'f1Score',
      label: 'F1 Score',
      lr: lr.f1Score,
      rf: rf.f1Score,
      unit: '%',
      description: 'Harmonic mean of precision and recall. The primary balanced benchmark for imbalanced datasets.',
      winner: 'Random Forest (+72.47%)',
      analysis: 'Because the dataset contains only 0.17% fraud, F1-score is the definitive decision metric. Random Forest achieves 83.91% compared to Logistic Regression’s 11.44%.'
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      lr: lr.accuracy,
      rf: rf.accuracy,
      unit: '%',
      description: 'Total correct predictions divided by all transactions. Deceptive in fraud detection!',
      winner: 'Random Forest (99.95%)',
      analysis: 'Even a naive classifier predicting "All Genuine" achieves 99.83% accuracy while catching 0% of fraud. Thus accuracy alone cannot validate a financial fraud system.'
    }
  ];

  return (
    <section id="analytics" className="relative py-24 bg-[#0D3040] border-b border-[#315365]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono-num tracking-[0.25em] text-[#FFD400] uppercase font-semibold">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Comparative Model Evaluation</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F2E9] tracking-tight leading-tight">
              Performance Behind <br />
              <span className="italic font-normal text-[#FFD400]">the Intelligence.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 border-l-2 border-[#FFD400] pl-6">
            <p className="text-sm text-[#B9C9CE] leading-relaxed">
              Empirical testing between linear baseline Logistic Regression and non-linear Random Forest ensemble classification on the European cardholder dataset.
            </p>
          </div>
        </div>

        {/* Primary Side-by-Side Model Scorecards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card A: Logistic Regression */}
          <div className="bg-[#153847] border border-[#315365] p-6 sm:p-8 relative">
            <div className="flex items-center justify-between border-b border-[#315365] pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#B9C9CE] block">
                  BASELINE CLASSIFIER
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#F5F2E9]">
                  LOGISTIC REGRESSION
                </h3>
              </div>
              <span className="text-xs font-mono-num bg-[#092936] text-[#B9C9CE] px-3 py-1 border border-[#315365]">
                Linear Model
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#092936] border border-[#315365] p-3 text-center">
                <span className="text-[10px] font-mono-num uppercase text-[#B9C9CE] block mb-1">Precision</span>
                <span className="font-mono-num text-xl sm:text-2xl font-bold text-[#F5F2E9]">6.10%</span>
              </div>
              <div className="bg-[#092936] border border-[#315365] p-3 text-center">
                <span className="text-[10px] font-mono-num uppercase text-[#B9C9CE] block mb-1">Recall</span>
                <span className="font-mono-num text-xl sm:text-2xl font-bold text-[#10B981]">91.84%</span>
              </div>
              <div className="bg-[#092936] border border-[#315365] p-3 text-center">
                <span className="text-[10px] font-mono-num uppercase text-[#B9C9CE] block mb-1">F1 Score</span>
                <span className="font-mono-num text-xl sm:text-2xl font-bold text-[#F5F2E9]">11.44%</span>
              </div>
              <div className="bg-[#092936] border border-[#315365] p-3 text-center">
                <span className="text-[10px] font-mono-num uppercase text-[#B9C9CE] block mb-1">Accuracy</span>
                <span className="font-mono-num text-xl sm:text-2xl font-bold text-[#F5F2E9]">97.55%</span>
              </div>
            </div>

            <div className="text-xs text-[#B9C9CE] leading-relaxed border-t border-[#315365]/50 pt-4">
              <strong className="text-[#F5F2E9]">Characteristics:</strong> Captures fraud broadly (91.84% recall) but incurs extreme false positives due to linear decision boundaries unable to separate subtle multi-dimensional outliers.
            </div>
          </div>

          {/* Card B: Random Forest (Primary) */}
          <div className="bg-[#123B4B] border-2 border-[#FFD400] p-6 sm:p-8 relative shadow-2xl">
            {/* Top Recommended Tag */}
            <div className="absolute -top-3 right-6 bg-[#FFD400] text-[#092936] text-[10px] font-mono-num font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-1.5 shadow-md">
              <Award className="w-3.5 h-3.5" />
              <span>DEPLOYED ENSEMBLE</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#315365] pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFD400] block font-bold">
                  ADVANCED ENSEMBLE CLASSIFIER
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#F5F2E9]">
                  RANDOM FOREST
                </h3>
              </div>
              <span className="text-xs font-mono-num bg-[#092936] text-[#FFD400] px-3 py-1 border border-[#FFD400]/50">
                100 Estimators
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#092936] border border-[#FFD400] p-3 text-center">
                <span className="text-[10px] font-mono-num uppercase text-[#B9C9CE] block mb-1">Precision</span>
                <span className="font-mono-num text-xl sm:text-2xl font-bold text-[#FFD400]">96.05%</span>
              </div>
              <div className="bg-[#092936] border border-[#315365] p-3 text-center">
                <span className="text-[10px] font-mono-num uppercase text-[#B9C9CE] block mb-1">Recall</span>
                <span className="font-mono-num text-xl sm:text-2xl font-bold text-[#F5F2E9]">74.49%</span>
              </div>
              <div className="bg-[#092936] border border-[#FFD400] p-3 text-center">
                <span className="text-[10px] font-mono-num uppercase text-[#B9C9CE] block mb-1">F1 Score</span>
                <span className="font-mono-num text-xl sm:text-2xl font-bold text-[#FFD400]">83.91%</span>
              </div>
              <div className="bg-[#092936] border border-[#315365] p-3 text-center">
                <span className="text-[10px] font-mono-num uppercase text-[#B9C9CE] block mb-1">Accuracy</span>
                <span className="font-mono-num text-xl sm:text-2xl font-bold text-[#10B981]">99.95%</span>
              </div>
            </div>

            <div className="text-xs text-[#B9C9CE] leading-relaxed border-t border-[#315365]/50 pt-4">
              <strong className="text-[#FFD400]">Characteristics:</strong> Exceptional 96.05% precision stops alert exhaustion. Multi-tree non-linear decision splits successfully isolate fraudulent PCA signatures with 99.95% overall accuracy.
            </div>
          </div>

        </div>

        {/* Visual Comparison Charts & Detailed Metric Breakdown */}
        <div className="bg-[#153847] border border-[#315365] p-6 sm:p-8 mb-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#315365]">
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#F5F2E9]">
                Comparative Metric Analysis
              </h3>
              <p className="text-xs text-[#B9C9CE] font-mono-num">
                Direct benchmark comparison between Logistic Regression and Random Forest
              </p>
            </div>

            {/* Metric Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {['all', 'precision', 'recall', 'f1Score', 'accuracy'].map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveMetric(m)}
                  className={`px-3 py-1.5 text-xs font-mono-num uppercase tracking-wider border transition-colors cursor-pointer ${
                    activeMetric === m
                      ? 'bg-[#FFD400] text-[#092936] border-[#FFD400] font-bold'
                      : 'bg-[#092936] text-[#B9C9CE] border-[#315365] hover:border-[#FFD400]'
                  }`}
                >
                  {m === 'all' ? 'All Metrics' : m === 'f1Score' ? 'F1 Score' : m}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Comparison Rows */}
          <div className="space-y-8">
            {metricsData
              .filter((item) => activeMetric === 'all' || activeMetric === item.id)
              .map((item) => (
                <div key={item.id} className="bg-[#092936] border border-[#315365] p-5 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-editorial text-xl font-bold text-[#F5F2E9]">
                          {item.label} Comparison
                        </h4>
                        <span className="text-[10px] font-mono-num text-[#FFD400] bg-[#123B4B] px-2 py-0.5 border border-[#315365]">
                          Top: {item.winner}
                        </span>
                      </div>
                      <p className="text-xs text-[#B9C9CE] mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Dual Comparison Bars */}
                  <div className="space-y-4 mb-4">
                    {/* Random Forest Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono-num mb-1.5">
                        <span className="text-[#FFD400] font-bold">Random Forest (Ensemble)</span>
                        <span className="text-[#F5F2E9] font-bold">{item.rf.toFixed(2)}%</span>
                      </div>
                      <div className="h-4 bg-[#153847] border border-[#315365] overflow-hidden">
                        <div 
                          className="h-full bg-[#FFD400] transition-all duration-700 ease-out"
                          style={{ width: `${item.rf}%` }}
                        />
                      </div>
                    </div>

                    {/* Logistic Regression Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono-num mb-1.5">
                        <span className="text-[#B9C9CE]">Logistic Regression (Baseline)</span>
                        <span className="text-[#B9C9CE] font-bold">{item.lr.toFixed(2)}%</span>
                      </div>
                      <div className="h-4 bg-[#153847] border border-[#315365] overflow-hidden">
                        <div 
                          className="h-full bg-[#315365] transition-all duration-700 ease-out"
                          style={{ width: `${item.lr}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Editorial Analysis */}
                  <div className="text-xs font-mono-num text-[#B9C9CE] pt-3 border-t border-[#315365]/60 leading-relaxed">
                    <span className="text-[#F5F2E9] font-semibold">Insight: </span>
                    {item.analysis}
                  </div>
                </div>
              ))}
          </div>

        </div>

        {/* Mandatory Machine Learning Insight Callout */}
        <div className="bg-[#123B4B] border-2 border-[#FFD400] p-6 sm:p-8 mb-6 relative">
          <div className="flex items-start gap-4">
            <Scale className="w-8 h-8 text-[#FFD400] shrink-0 mt-1" />
            <div>
              <span className="text-[11px] font-mono-num uppercase tracking-[0.2em] text-[#FFD400] font-bold block mb-1">
                CRITICAL MACHINE LEARNING INSIGHT
              </span>
              <blockquote className="font-editorial text-lg sm:text-xl text-[#F5F2E9] font-medium italic leading-relaxed mb-3">
                "Fraud detection involves an imbalanced dataset. Accuracy alone does not determine model quality. Precision and recall are important for understanding false alarms and missed fraud cases."
              </blockquote>
              <p className="text-xs text-[#B9C9CE] leading-relaxed">
                When positive fraud cases constitute only 0.17% of total records, standard loss functions risk minimizing trivial errors while missing catastrophic fraud breaches. Careful threshold tuning and precision-recall trade-offs govern the Credit Guard model architecture.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="bg-[#092936] border border-[#315365] p-4 flex items-center justify-between text-xs font-mono-num text-[#B9C9CE]">
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#FFD400]" />
            <span><strong>Notice:</strong> These are experimental test results, not guaranteed real-world performance.</span>
          </span>
          <span className="text-[#FFD400] hidden sm:inline">Kaggle Test Split 80/20</span>
        </div>

      </div>
    </section>
  );
}
