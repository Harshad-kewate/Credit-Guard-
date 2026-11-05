import React from 'react';
import { ArrowRight, ShieldCheck, Cpu, Terminal, Lock, Activity, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-[#092936] bg-editorial-grid">
      {/* Editorial Decorative Grid Marks & Lines */}
      <div className="absolute top-24 left-8 text-[10px] font-mono-num text-[#315365] hidden lg:block select-none tracking-widest">
        LAT: 50.8503° N // LON: 4.3517° E — FRAUD_DETECTION_CORE_V1
      </div>
      <div className="absolute top-24 right-8 text-[10px] font-mono-num text-[#315365] hidden lg:block select-none tracking-widest">
        DATASET_SIZE: 284,807 // MODEL: RANDOM_FOREST
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Editorial Typography & Call to Action (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
            
            {/* Small uppercase label with geometric yellow tag */}
            <div className="inline-flex items-center gap-3 mb-6 bg-[#0D3040] border border-[#315365] px-3.5 py-1.5">
              <span className="w-2 h-2 bg-[#FFD400]" />
              <span className="text-[11px] font-mono-num tracking-[0.25em] text-[#FFD400] uppercase font-semibold">
                MACHINE LEARNING POWERED SECURITY
              </span>
            </div>

            {/* Oversized Editorial Heading */}
            <h1 className="font-editorial text-4xl sm:text-6xl xl:text-7xl font-bold leading-[1.08] text-[#F5F2E9] mb-8 tracking-tight">
              Security Beyond <br />
              <span className="editorial-underline text-[#F5F2E9] italic font-normal">
                Every Transaction.
              </span>
            </h1>

            {/* Editorial Description */}
            <p className="text-base sm:text-lg lg:text-xl text-[#B9C9CE] font-light leading-relaxed max-w-2xl mb-10">
              Smarter financial security powered by Machine Learning. Analyze transaction patterns, identify suspicious activity, and make informed security decisions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => scrollTo('#detection')}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#FFD400] text-[#092936] text-sm font-semibold tracking-wider uppercase border border-[#FFD400] hover:bg-[#0D3040] hover:text-[#FFD400] transition-all duration-300 shadow-lg cursor-pointer"
              >
                <span>Explore Detection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('#technology')}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#0D3040] text-[#F5F2E9] text-sm font-medium tracking-wider uppercase border border-[#315365] hover:border-[#FFD400] hover:text-[#FFD400] transition-all duration-300 cursor-pointer"
              >
                <span>Discover Technology</span>
              </button>
            </div>

            {/* Small Supporting Text & Technical Badges */}
            <div className="pt-6 border-t border-[#315365]/60 w-full flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-mono-num text-[#B9C9CE]">
                <Activity className="w-4 h-4 text-[#FFD400]" />
                <span className="text-[#F5F2E9] font-medium">Intelligent Transaction Analysis</span>
              </div>
              <div className="text-[11px] font-mono-num text-[#B9C9CE]/70">
                284K+ Historical Benchmark Records
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Sophisticated Cybersecurity Composition (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Geometric Mustard Yellow Backdrop Blocks */}
            <div className="absolute -top-8 -right-4 w-56 h-72 bg-[#FFD400] opacity-90 hidden sm:block transform translate-x-3 translate-y-3 pointer-events-none" />
            <div className="absolute top-1/2 -left-8 w-24 h-40 bg-[#123B4B] border border-[#315365] hidden lg:block -z-0" />
            
            {/* Main Visual Composition Container */}
            <div className="relative z-10 w-full max-w-md lg:max-w-none">
              
              {/* Back Card: Security Shield & Neural Stream Panel */}
              <div className="bg-[#0D3040] border-2 border-[#315365] p-6 shadow-2xl relative">
                {/* Header ribbon of editorial card */}
                <div className="flex items-center justify-between border-b border-[#315365] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#FFD400]" />
                    <span className="text-xs font-mono-num tracking-widest text-[#F5F2E9] uppercase font-semibold">
                      TELEMETRY NODE // 01
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-num text-[#FFD400] bg-[#153847] px-2 py-0.5 border border-[#315365]">
                    LIVE CLASSIFIER
                  </span>
                </div>

                {/* Editorial Credit Card Illustration */}
                <div className="relative bg-gradient-to-br from-[#123B4B] via-[#092936] to-[#0D3040] border border-[#315365] p-6 shadow-xl mb-6 overflow-hidden group hover:border-[#FFD400] transition-colors duration-300">
                  {/* Subtle golden metallic accents on card */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD400]/5 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Card Header: Brand & Contactless */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#FFD400]" />
                      <span className="font-editorial text-sm font-bold tracking-wider text-[#F5F2E9]">
                        CREDIT GUARD
                      </span>
                    </div>
                    {/* Contactless symbol */}
                    <div className="flex items-center gap-0.5 text-[#B9C9CE]">
                      <svg className="w-5 h-5 text-[#FFD400]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8.5 16.5a5 5 0 0 1 0-7" />
                        <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                        <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                      </svg>
                    </div>
                  </div>

                  {/* EMV Microchip Illustration */}
                  <div className="w-12 h-9 bg-gradient-to-br from-[#FFD400] via-[#E5BF00] to-[#B39200] rounded-sm p-1 shadow-md mb-6 border border-[#FFD400]/80 relative flex items-center justify-center">
                    <div className="w-full h-full border border-[#092936]/40 flex flex-col justify-between p-0.5">
                      <div className="h-0.5 bg-[#092936]/30 w-full" />
                      <div className="flex justify-between">
                        <div className="w-2 h-2 rounded-full border border-[#092936]/40" />
                        <div className="w-2 h-2 rounded-full border border-[#092936]/40" />
                      </div>
                      <div className="h-0.5 bg-[#092936]/30 w-full" />
                    </div>
                  </div>

                  {/* Embossed Card Number */}
                  <div className="font-mono-num text-lg sm:text-xl tracking-[0.25em] text-[#F5F2E9] font-medium mb-4 drop-shadow">
                    ••••  ••••  ••••  8421
                  </div>

                  {/* Cardholder & Expiry */}
                  <div className="flex items-end justify-between text-[11px] font-mono-num uppercase text-[#B9C9CE]">
                    <div>
                      <div className="text-[9px] text-[#B9C9CE]/60 tracking-wider">VALIDATION PROTOCOL</div>
                      <div className="text-[#F5F2E9] tracking-wider font-semibold">ENTERPRISE INTELLIGENCE</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-[#B9C9CE]/60 tracking-wider">EXPIRES</div>
                      <div className="text-[#FFD400] font-semibold">12 / 28</div>
                    </div>
                  </div>
                </div>

                {/* Overlapping Diagnostic Status Badge */}
                <div className="bg-[#153847] border border-[#315365] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0D3040] border border-[#FFD400] flex items-center justify-center text-[#FFD400]">
                      <ShieldCheck className="w-5 h-5 text-[#FFD400]" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-mono-num text-[#B9C9CE]">
                        ANALYTIC VERDICT
                      </div>
                      <div className="text-sm font-bold text-[#F5F2E9] font-editorial">
                        Pattern Integrity Verified
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono-num">
                    <span className="text-[10px] text-[#B9C9CE] block">ACCURACY BENCHMARK</span>
                    <span className="text-sm font-bold text-[#FFD400]">99.95%</span>
                  </div>
                </div>

                {/* Subtle Technical Footer */}
                <div className="mt-4 pt-3 border-t border-[#315365]/50 flex items-center justify-between text-[10px] font-mono-num text-[#B9C9CE]/60">
                  <span>VECTOR: [Time, Amount, V1..V28]</span>
                  <span>STATUS: SECURE</span>
                </div>

              </div>

              {/* Offset Geometric Mustard Badge on corner */}
              <div className="absolute -bottom-4 -left-4 bg-[#FFD400] text-[#092936] px-4 py-2 text-xs font-mono-num font-bold tracking-widest uppercase shadow-xl hidden sm:flex items-center gap-2 border border-[#092936]">
                <Lock className="w-3.5 h-3.5" />
                <span>30-FEATURE ML TENSOR</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
