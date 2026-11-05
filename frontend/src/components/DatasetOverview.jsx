import React from 'react';
import { DATASET_STATS } from '../data/datasetStats';
import { Database, AlertCircle, Layers, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function DatasetOverview() {
  return (
    <section className="relative py-24 bg-[#0D3040] border-t border-b border-[#315365] overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-[#315365]/30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-px h-full bg-[#315365]/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header: Asymmetrical Editorial Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono-num tracking-[0.25em] text-[#FFD400] uppercase font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>Dataset Architecture & Distribution</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F2E9] tracking-tight leading-tight">
              Understanding the Data <br />
              <span className="italic font-normal text-[#FFD400]">Behind Detection.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 border-l-2 border-[#FFD400] pl-6">
            <p className="text-sm text-[#B9C9CE] leading-relaxed">
              Trained on authenticated European cardholder transactions recorded over a 48-hour timeframe, revealing the realistic extreme rarity of fraudulent events.
            </p>
          </div>
        </div>

        {/* Asymmetrical Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Card 1: TOTAL TRANSACTIONS (Span 6 on LG) */}
          <div className="lg:col-span-6 bg-[#153847] border border-[#315365] p-8 relative group hover:border-[#FFD400] transition-colors">
            {/* Top decorative accent */}
            <div className="w-12 h-1 bg-[#FFD400] mb-6" />
            <div className="flex items-center justify-between text-xs font-mono-num tracking-widest text-[#B9C9CE] uppercase mb-4">
              <span>01 // PRIMARY VOLUME</span>
              <span className="text-[#FFD400]">BENCHMARK BASELINE</span>
            </div>

            <div className="font-mono-num text-5xl sm:text-6xl font-bold text-[#F5F2E9] tracking-tight mb-3">
              {DATASET_STATS.totalTransactions.formatted}
            </div>

            <h3 className="font-editorial text-xl font-semibold text-[#F5F2E9] mb-2">
              TOTAL TRANSACTIONS
            </h3>
            <p className="text-xs sm:text-sm text-[#B9C9CE] leading-relaxed">
              {DATASET_STATS.totalTransactions.description}
            </p>
          </div>

          {/* Card 2: GENUINE TRANSACTIONS (Span 6 on LG) */}
          <div className="lg:col-span-6 bg-[#153847] border border-[#315365] p-8 relative group hover:border-[#10B981] transition-colors">
            <div className="w-12 h-1 bg-[#10B981] mb-6" />
            <div className="flex items-center justify-between text-xs font-mono-num tracking-widest text-[#B9C9CE] uppercase mb-4">
              <span>02 // MAJORITY CLASS</span>
              <span className="text-[#10B981]">99.83% LEGITIMATE</span>
            </div>

            <div className="font-mono-num text-5xl sm:text-6xl font-bold text-[#F5F2E9] tracking-tight mb-3">
              {DATASET_STATS.genuineTransactions.formatted}
            </div>

            <h3 className="font-editorial text-xl font-semibold text-[#F5F2E9] mb-2 flex items-center gap-2">
              <span>GENUINE TRANSACTIONS</span>
              <ShieldCheck className="w-5 h-5 text-[#10B981]" />
            </h3>
            <p className="text-xs sm:text-sm text-[#B9C9CE] leading-relaxed">
              {DATASET_STATS.genuineTransactions.description}
            </p>
          </div>

          {/* Card 3: FRAUDULENT TRANSACTIONS (Span 7 on LG - Asymmetrical) */}
          <div className="lg:col-span-7 bg-[#123B4B] border-2 border-[#315365] p-8 relative group hover:border-[#EF4444] transition-colors">
            <div className="w-12 h-1 bg-[#EF4444] mb-6" />
            <div className="flex items-center justify-between text-xs font-mono-num tracking-widest text-[#B9C9CE] uppercase mb-4">
              <span>03 // TARGET CLASS</span>
              <span className="text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 border border-[#EF4444]/30">0.17% MINORITY ANOMALY</span>
            </div>

            <div className="flex items-baseline gap-4 mb-3">
              <div className="font-mono-num text-5xl sm:text-6xl font-bold text-[#EF4444] tracking-tight">
                {DATASET_STATS.fraudulentTransactions.formatted}
              </div>
              <span className="text-xs font-mono-num text-[#B9C9CE] uppercase tracking-wider">
                Confirmed Infiltrations
              </span>
            </div>

            <h3 className="font-editorial text-xl font-semibold text-[#F5F2E9] mb-2 flex items-center gap-2">
              <span>FRAUDULENT TRANSACTIONS</span>
              <ShieldAlert className="w-5 h-5 text-[#EF4444]" />
            </h3>
            <p className="text-xs sm:text-sm text-[#B9C9CE] leading-relaxed">
              {DATASET_STATS.fraudulentTransactions.description} Demonstrates why basic classification accuracy fails without precision-recall balancing.
            </p>
          </div>

          {/* Card 4: DATASET FEATURES (Span 5 on LG - Asymmetrical) */}
          <div className="lg:col-span-5 bg-[#153847] border border-[#315365] p-8 relative group hover:border-[#FFD400] transition-colors">
            <div className="w-12 h-1 bg-[#FFD400] mb-6" />
            <div className="flex items-center justify-between text-xs font-mono-num tracking-widest text-[#B9C9CE] uppercase mb-4">
              <span>04 // DIMENSIONALITY</span>
              <span className="text-[#FFD400]">PCA + TIME + AMOUNT</span>
            </div>

            <div className="font-mono-num text-5xl sm:text-6xl font-bold text-[#F5F2E9] tracking-tight mb-3">
              {DATASET_STATS.datasetFeatures.formatted}
            </div>

            <h3 className="font-editorial text-xl font-semibold text-[#F5F2E9] mb-2 flex items-center gap-2">
              <span>DATASET FEATURES</span>
              <Layers className="w-5 h-5 text-[#FFD400]" />
            </h3>
            <p className="text-xs sm:text-sm text-[#B9C9CE] leading-relaxed">
              {DATASET_STATS.datasetFeatures.description}
            </p>
          </div>

        </div>

        {/* Mandatory Editorial Disclaimer Note */}
        <div className="bg-[#092936] border border-[#315365] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#FFD400] shrink-0" />
            <span className="text-xs font-mono-num text-[#B9C9CE]">
              <strong className="text-[#F5F2E9] uppercase font-bold">Important Notice:</strong> These values represent the original dataset used to train and validate the Machine Learning models, not live website activity.
            </span>
          </div>
          <div className="text-[11px] font-mono-num text-[#FFD400] whitespace-nowrap uppercase tracking-wider">
            Kaggle ML Benchmark
          </div>
        </div>

      </div>
    </section>
  );
}
