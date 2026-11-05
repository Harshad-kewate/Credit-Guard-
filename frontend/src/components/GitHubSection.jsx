import React from 'react';
import { ExternalLink, GitBranch, Star, GitFork, Terminal, Code2, FolderGit2 } from 'lucide-react';

export default function GitHubSection() {
  const repoUrl = 'https://github.com/Harshad-kewate/Credit-Card-Fraud-Detection-ML';

  return (
    <section className="relative py-24 bg-[#0D3040] border-b border-[#315365]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Asymmetrical Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial CTA */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono-num tracking-[0.25em] text-[#FFD400] uppercase font-semibold">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Open Source Architecture</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F2E9] tracking-tight leading-tight mb-6">
              Explore the Technology <br />
              <span className="italic font-normal text-[#FFD400]">Behind It.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#B9C9CE] leading-relaxed mb-8 max-w-xl">
              Discover the implementation, source code, and Machine Learning experiments. Inspect model training pipelines, evaluate feature importances, and clone the repository.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFD400] text-[#092936] text-xs font-bold tracking-widest uppercase border border-[#FFD400] hover:bg-[#092936] hover:text-[#FFD400] transition-all shadow-lg"
              >
                <span>Explore GitHub Repository</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="flex items-center gap-4 text-xs font-mono-num text-[#B9C9CE] px-4 py-2 border border-[#315365] bg-[#092936]">
                <div className="flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-[#FFD400]" />
                  <span>main branch</span>
                </div>
                <span>•</span>
                <span className="text-[#F5F2E9]">MIT Licensed</span>
              </div>
            </div>

            <div className="text-xs font-mono-num text-[#B9C9CE]/70">
              Repository URL: <code className="text-[#FFD400] select-all">{repoUrl}</code>
            </div>
          </div>

          {/* Right Column: Code & Repo Blueprint Panel */}
          <div className="lg:col-span-5">
            <div className="bg-[#092936] border-2 border-[#315365] p-6 shadow-2xl relative">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-[#315365] pb-3 mb-4 text-xs font-mono-num text-[#B9C9CE]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFD400]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span className="ml-2 text-[#F5F2E9]">Harshad-kewate / Credit-Card-Fraud-Detection-ML</span>
                </div>
              </div>

              {/* Terminal / File Tree */}
              <div className="font-mono-num text-xs text-[#B9C9CE] space-y-2 mb-6">
                <div className="text-[#FFD400] flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>$ git clone https://github.com/.../Credit-Card-Fraud-Detection-ML.git</span>
                </div>
                <div className="pl-4 text-[#B9C9CE]/80 border-l border-[#315365] space-y-1 my-3">
                  <div className="text-[#F5F2E9]">├── main.py <span className="text-[10px] text-[#B9C9CE]/60">// Model training pipeline</span></div>
                  <div className="text-[#F5F2E9]">├── predict.py <span className="text-[10px] text-[#B9C9CE]/60">// Flask inference service</span></div>
                  <div className="text-[#FFD400]">├── fraud_model.pkl <span className="text-[10px] text-[#FFD400]/80">// Serialized Random Forest</span></div>
                  <div className="text-[#F5F2E9]">├── requirements.txt <span className="text-[10px] text-[#B9C9CE]/60">// Python dependencies</span></div>
                  <div className="text-[#F5F2E9]">└── frontend/ <span className="text-[10px] text-[#B9C9CE]/60">// Modern editorial interface</span></div>
                </div>
              </div>

              {/* Status footer inside code panel */}
              <div className="bg-[#153847] border border-[#315365] p-3 flex items-center justify-between text-[11px] font-mono-num">
                <span className="text-[#B9C9CE]">Architecture: Python + Scikit-Learn</span>
                <span className="text-[#10B981] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Production Ready
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
