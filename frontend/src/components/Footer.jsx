import React from 'react';
import { Shield, ArrowUp, ExternalLink } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#092936] text-[#F5F2E9] border-t border-[#315365] relative overflow-hidden">
      {/* Thin Mustard-Yellow Decorative Line across the top */}
      <div className="w-full h-1 bg-[#FFD400]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between pb-12 border-b border-[#315365]/50">
          
          {/* Brand & Tagline (Md: 6 cols) */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-9 bg-[#0D3040] border border-[#FFD400] flex items-center justify-center text-[#FFD400]">
                <Shield className="w-5 h-5 fill-[#FFD400]/20 text-[#FFD400]" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-wider text-[#F5F2E9] uppercase">
                CREDIT <span className="text-[#FFD400]">GUARD</span>
              </span>
            </div>

            <p className="font-editorial text-lg text-[#F5F2E9] italic mb-3">
              "Security Beyond Every Transaction."
            </p>

            <p className="text-xs text-[#B9C9CE] max-w-md leading-relaxed font-light">
              Machine Learning powered financial security platform designed to detect fraudulent credit card anomalies with high precision and operational resilience.
            </p>
          </div>

          {/* Quick Navigation Links (Md: 4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <span className="text-[10px] font-mono-num uppercase tracking-[0.25em] text-[#FFD400] font-bold mb-2">
              NAVIGATION INDEX
            </span>
            <div className="flex flex-col gap-2 text-xs font-mono-num uppercase tracking-wider text-[#B9C9CE]">
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
                className="hover:text-[#FFD400] transition-colors"
              >
                Home
              </a>
              <a 
                href="#detection" 
                onClick={(e) => { e.preventDefault(); scrollTo('#detection'); }}
                className="hover:text-[#FFD400] transition-colors"
              >
                Detection
              </a>
              <a 
                href="#analytics" 
                onClick={(e) => { e.preventDefault(); scrollTo('#analytics'); }}
                className="hover:text-[#FFD400] transition-colors"
              >
                Analytics
              </a>
              <a 
                href="#technology" 
                onClick={(e) => { e.preventDefault(); scrollTo('#technology'); }}
                className="hover:text-[#FFD400] transition-colors"
              >
                Technology
              </a>
              <a 
                href="https://github.com/Harshad-kewate/Credit-Card-Fraud-Detection-ML"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFD400] transition-colors inline-flex items-center gap-1"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Scroll to Top (Md: 2 cols) */}
          <div className="md:col-span-2 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 bg-[#0D3040] border border-[#315365] hover:border-[#FFD400] text-xs font-mono-num text-[#B9C9CE] hover:text-[#FFD400] transition-all cursor-pointer"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>

        </div>

        {/* Bottom Editorial Legal & System Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-num text-[#B9C9CE]/60">
          <div>
            © {new Date().getFullYear()} CREDIT GUARD. Open Source Research Project.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>DATASET: 284K RECORDS</span>
            <span>•</span>
            <span>MODEL: RANDOM FOREST</span>
            <span>•</span>
            <span className="text-[#FFD400]">ACCURACY: 99.95%</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
