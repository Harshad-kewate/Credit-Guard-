import React from 'react';
import { Target, Binary, Database, GitCompare, Shield, CheckCircle2 } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      id: 'objective',
      title: 'Project Objective',
      icon: Target,
      tag: 'FINANCIAL INTEGRITY',
      description: 'Develop an intelligent machine learning pipeline capable of pinpointing unauthorized card transactions without disrupting legitimate user commerce, reconciling the friction between security and convenience.'
    },
    {
      id: 'approach',
      title: 'Machine Learning Approach',
      icon: Binary,
      tag: 'ENSEMBLE MODELING',
      description: 'Utilize non-linear Random Forest decision trees trained on multi-dimensional orthogonal PCA vectors, tuned to penalize false-negative misclassifications while sustaining high operational precision.'
    },
    {
      id: 'dataset',
      title: 'Dataset Information',
      icon: Database,
      tag: '284,807 RECORDS',
      description: 'Derived from real European credit transactions. Includes 30 standardized features comprising Time, Amount, and 28 PCA-transformed components (V1–V28) to protect cardholder anonymity.'
    },
    {
      id: 'comparison',
      title: 'Model Comparison',
      icon: GitCompare,
      tag: 'BENCHMARK ANALYSIS',
      description: 'Rigorous empirical evaluation comparing Logistic Regression (6.10% Precision, 91.84% Recall) against Random Forest (96.05% Precision, 74.49% Recall), validating why ensemble architectures dominate imbalanced fraud detection.'
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-[#092936] bg-editorial-grid border-b border-[#315365]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Asymmetrical Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono-num tracking-[0.25em] text-[#FFD400] uppercase font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Project Overview & Philosophy</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F2E9] tracking-tight leading-tight mb-6">
              Making Digital <br />
              <span className="editorial-underline italic font-normal text-[#F5F2E9]">
                Transactions Smarter.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#B9C9CE] font-light leading-relaxed">
              Credit Guard is a Machine Learning project focused on identifying potentially fraudulent credit card transactions. It explores classification algorithms, transaction patterns, and model evaluation techniques to understand how data-driven systems can support financial security.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#0D3040] border border-[#315365] p-6 sm:p-8 relative">
            <div className="w-8 h-1 bg-[#FFD400] mb-4" />
            <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFD400] font-bold block mb-2">
              FOUNDATIONAL THESIS
            </span>
            <p className="text-xs sm:text-sm text-[#F5F2E9] font-editorial italic leading-relaxed">
              "Financial fraud detection is not merely an exercise in model accuracy; it is an optimization problem balancing user friction against fraud loss prevention across extreme class imbalances."
            </p>
            <div className="mt-4 pt-3 border-t border-[#315365] text-[11px] font-mono-num text-[#B9C9CE]">
              CREDIT GUARD RESEARCH // 2026
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <div 
                key={pillar.id}
                className="bg-[#153847] border border-[#315365] p-6 sm:p-8 hover:border-[#FFD400] transition-all relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-[#092936] border border-[#315365] flex items-center justify-center text-[#FFD400] group-hover:border-[#FFD400] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono-num text-[#FFD400] bg-[#0D3040] px-2.5 py-1 border border-[#315365]">
                    {pillar.tag}
                  </span>
                </div>

                <div className="text-xs font-mono-num text-[#B9C9CE]/60 uppercase tracking-widest mb-1">
                  PILLAR 0{idx + 1}
                </div>

                <h3 className="font-editorial text-2xl font-bold text-[#F5F2E9] mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#B9C9CE] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
