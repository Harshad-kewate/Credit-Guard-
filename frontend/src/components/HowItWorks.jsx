import React from 'react';
import { WORKFLOW_STAGES } from '../data/datasetStats';
import { 
  CreditCard, 
  Cpu, 
  GitBranch, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function HowItWorks() {
  const icons = [
    CreditCard,
    Cpu,
    GitBranch,
    ShieldCheck,
    Activity
  ];

  return (
    <section className="relative py-24 bg-[#092936] bg-editorial-grid border-b border-[#315365] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono-num tracking-[0.25em] text-[#FFD400] uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Algorithmic Pipeline</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F2E9] tracking-tight leading-tight">
              From Transaction <br />
              <span className="editorial-underline italic font-normal text-[#F5F2E9]">
                to Intelligence.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 border-l-2 border-[#FFD400] pl-6">
            <p className="text-sm text-[#B9C9CE] leading-relaxed">
              A high-precision sequence transforming 30 encrypted transactional vectors into an actionable fraud diagnosis in milliseconds.
            </p>
          </div>
        </div>

        {/* Editorial Process Timeline: Asymmetrical Staggered Flow */}
        <div className="relative">
          
          {/* Subtle Vertical Yellow Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD400] via-[#FFD400]/40 to-transparent -translate-x-1/2 pointer-events-none" />

          <div className="space-y-12 lg:space-y-16">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const Icon = icons[idx];
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={stage.step}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  
                  {/* Content Column (5 cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:text-right' : 'lg:order-3 lg:text-left'}`}>
                    <div className="bg-[#153847] border border-[#315365] p-6 sm:p-8 hover:border-[#FFD400] transition-colors relative group">
                      
                      {/* Top Bar */}
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? 'lg:justify-end' : ''}`}>
                        <span className="text-[10px] font-mono-num uppercase tracking-widest text-[#FFD400] font-bold">
                          {stage.subtitle}
                        </span>
                        <span className="w-2 h-2 bg-[#FFD400]" />
                      </div>

                      <h3 className="font-editorial text-2xl font-bold text-[#F5F2E9] mb-3">
                        {stage.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#B9C9CE] leading-relaxed">
                        {stage.description}
                      </p>

                      <div className={`mt-4 pt-3 border-t border-[#315365]/50 text-[10px] font-mono-num text-[#B9C9CE]/60 flex items-center gap-2 ${
                        isEven ? 'lg:justify-end' : ''
                      }`}>
                        <span>STAGE LATENCY: &lt; 0.5ms</span>
                        <span>•</span>
                        <span>INTEGRITY VERIFIED</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node Column (2 cols) */}
                  <div className="hidden lg:flex lg:col-span-2 lg:order-2 flex-col items-center justify-center relative">
                    <div className="w-16 h-16 bg-[#0D3040] border-2 border-[#FFD400] flex items-center justify-center text-[#FFD400] shadow-xl relative z-10 group hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-mono-num text-2xl font-bold text-[#FFD400] mt-2 select-none">
                      {stage.step}
                    </span>
                  </div>

                  {/* Spacer Column (5 cols) */}
                  <div className={`hidden lg:block lg:col-span-5 ${isEven ? 'lg:order-3' : 'lg:order-1'}`}>
                    <div className="p-6">
                      <span className="font-mono-num text-7xl font-bold text-[#315365]/25 select-none block">
                        STAGE // {stage.step}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
