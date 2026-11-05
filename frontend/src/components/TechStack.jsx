import React from 'react';
import { Layers, Code2, Cpu, Wrench } from 'lucide-react';

export default function TechStack() {
  const technologies = [
    {
      name: 'PYTHON',
      category: 'Core Runtime',
      desc: 'High-level analytical programming language driving training, evaluation, and ETL pipelines.',
      version: '3.14 / 3.10+',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" aria-hidden="true">
          <path d="M11.9 2c-3.8 0-6.2 1.7-6.2 4.1v2.1h6.3v.9H3.9C2 9.1 0 11.2 0 14.1c0 2.9 1.9 5 4.8 5h1.9v-2.5c0-2.2 1.9-4.1 4.1-4.1h6.2v-.9h-6.2V9.9h7.4c2.2 0 4-1.8 4-4.1V4.2C22.2 2.6 18.2 2 11.9 2zm-1.8 1.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zM12.1 22c3.8 0 6.2-1.7 6.2-4.1v-2.1H12v-.9h8.1c1.9 0 3.9-2.1 3.9-5 0-2.9-1.9-5-4.8-5h-1.9v2.5c0 2.2-1.9 4.1-4.1 4.1H7v.9h6.2v1.7H5.8c-2.2 0-4 1.8-4 4.1v1.6c0 1.6 4 2.2 10.3 2.2zm1.8-1.8c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"/>
        </svg>
      )
    },
    {
      name: 'PANDAS',
      category: 'Data Manipulation',
      desc: 'DataFrame architecture for tabular dataset ingestion, cleaning, and time-series normalization.',
      version: 'v2.x Series',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="18" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    },
    {
      name: 'NUMPY',
      category: 'Tensor Mathematics',
      desc: 'N-dimensional array acceleration powering linear algebra, matrix operations, and PCA projections.',
      version: 'High Performance',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v16l8-8 8 8V4" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'SCIKIT-LEARN',
      category: 'Machine Learning',
      desc: 'State-of-the-art implementations of Random Forest, Logistic Regression, and cross-validation scorers.',
      version: 'Production ML',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="18" r="3" />
          <path d="M8.5 7.5L10 16M15.5 7.5L14 16M9 6h6" />
        </svg>
      )
    },
    {
      name: 'MATPLOTLIB',
      category: 'Visualization',
      desc: 'Comprehensive plotting library generating experimental ROC-AUC, confusion matrices, and precision curves.',
      version: 'Statistical Plots',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M7 16l4-8 4 6 5-10" />
        </svg>
      )
    },
    {
      name: 'FLASK',
      category: 'REST Microframework',
      desc: 'Lightweight WSGI web microframework hosting low-latency model inference endpoints on port 5000.',
      version: 'API Serving',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2">
          <path d="M10 2v7.31a2 2 0 0 1-.37 1.17l-5.3 7.82A2 2 0 0 0 6 21h12a2 2 0 0 0 1.67-2.7l-5.3-7.82A2 2 0 0 1 14 9.31V2" />
          <path d="M8.5 2h7M7 16h10" />
        </svg>
      )
    },
    {
      name: 'JOBLIB',
      category: 'Model Serialization',
      desc: 'Efficient disk caching and fast persistence of trained Scikit-Learn tree models (.pkl serialization).',
      version: 'Binary Serialization',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      name: 'HTML',
      category: 'Semantic Structure',
      desc: 'Accessible, SEO-compliant modern semantic document structure adhering to W3C standards.',
      version: 'HTML5 Semantic',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2">
          <path d="M4 3l1.5 15.5L12 21l6.5-2.5L20 3H4z" />
          <path d="M8 8h8M7.5 12h8.5M8 16l4 1 4-1" />
        </svg>
      )
    },
    {
      name: 'CSS',
      category: 'Editorial Styling',
      desc: 'Precision typography, fluid layout grids, custom properties, and responsive design systems.',
      version: 'Modern CSS3',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2">
          <path d="M4 3l1.5 15.5L12 21l6.5-2.5L20 3H4z" />
          <path d="M16 8H8l.5 4h7l-.5 4-3 1-3-1" />
        </svg>
      )
    },
    {
      name: 'JAVASCRIPT',
      category: 'Interactive Client',
      desc: 'Modern ES6+ frontend client executing real-time tensor validation, asynchronous API calls, and telemetry.',
      version: 'ES2024+',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 17v-4a2 2 0 0 1 2-2h1" />
          <path d="M14 17c1.5 0 2-.8 2-2 0-1.5-2-1.5-2-2.5 0-.8.5-1.5 1.5-1.5s1.5.5 1.5 1" />
        </svg>
      )
    }
  ];

  return (
    <section id="technology" className="relative py-24 bg-[#0D3040] border-b border-[#315365]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono-num tracking-[0.25em] text-[#FFD400] uppercase font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Robust Engineering Foundation</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F2E9] tracking-tight leading-tight mb-4">
            Built With <br />
            <span className="italic font-normal text-[#FFD400]">Intelligent Technology.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#B9C9CE] leading-relaxed">
            Engineered at the intersection of production machine learning systems, statistical mathematical libraries, and modern editorial web design.
          </p>
        </div>

        {/* Technology Grid: 10 clean logo-based cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group bg-[#153847] border border-[#315365] p-6 flex flex-col justify-between hover:border-[#FFD400] transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle yellow hover accent indicator */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-[#FFD400] group-hover:w-full transition-all duration-300" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[#FFD400] group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <span className="text-[9px] font-mono-num text-[#B9C9CE]/70 bg-[#092936] px-2 py-0.5 border border-[#315365]">
                    {tech.version}
                  </span>
                </div>

                <div className="text-[10px] font-mono-num uppercase tracking-wider text-[#FFD400] font-semibold mb-1">
                  {tech.category}
                </div>

                <h3 className="font-editorial text-lg font-bold text-[#F5F2E9] mb-2 tracking-wide">
                  {tech.name}
                </h3>

                <p className="text-xs text-[#B9C9CE] leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#315365]/40 flex items-center justify-between text-[10px] font-mono-num text-[#B9C9CE]/50">
                <span>CREDIT GUARD</span>
                <span className="group-hover:text-[#FFD400] transition-colors">STACK // ML</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
