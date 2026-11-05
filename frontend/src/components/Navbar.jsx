import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Menu, X, ArrowUpRight, Activity } from 'lucide-react';
import { checkBackendHealth } from '../services/api';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'connected' | 'disconnected' | 'checking'
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial health check
    checkStatus();
  }, []);

  const checkStatus = async () => {
    setBackendStatus('checking');
    const res = await checkBackendHealth();
    setBackendStatus(res.connected ? 'connected' : 'disconnected');
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Detection', href: '#detection' },
    { name: 'Analytics', href: '#analytics' },
    { name: 'Technology', href: '#technology' },
    { name: 'About', href: '#about' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#092936]/95 backdrop-blur-md border-b border-[#315365] py-3.5 shadow-xl'
          : 'bg-[#092936]/80 backdrop-blur-sm border-b border-[#315365]/50 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home')}
          className="group flex items-center gap-3 focus:outline-none"
        >
          {/* Custom Shield Emblem */}
          <div className="relative w-9 h-10 flex items-center justify-center bg-[#0D3040] border border-[#315365] group-hover:border-[#FFD400] transition-colors">
            <div className="absolute inset-0 bg-[#FFD400]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <svg viewBox="0 0 24 28" className="w-5 h-6 text-[#FFD400] fill-current" aria-hidden="true">
              <path d="M12 1L2 5V13C2 20 6.5 25 12 27C17.5 25 22 20 22 13V5L12 1Z" fill="#0D3040" stroke="#FFD400" strokeWidth="2" strokeLinejoin="miter"/>
              <path d="M12 7L6 9.5V14C6 18 8.5 21 12 22C15.5 21 18 18 18 14V9.5L12 7Z" fill="#FFD400"/>
              <circle cx="12" cy="14" r="2.2" fill="#092936"/>
            </svg>
          </div>
          
          <div className="flex flex-col">
            <span className="font-editorial text-lg md:text-xl font-bold tracking-wider text-[#F5F2E9] uppercase flex items-center gap-1.5">
              CREDIT <span className="text-[#FFD400]">GUARD</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#B9C9CE] uppercase font-mono-num">
              Security Beyond Every Transaction
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-xs uppercase tracking-[0.18em] font-medium text-[#B9C9CE] hover:text-[#FFD400] transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFD400] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* System Status Indicator */}
          <button
            onClick={checkStatus}
            title="Click to re-ping Flask prediction backend"
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0D3040] border border-[#315365] hover:border-[#B9C9CE] transition-colors text-[11px] font-mono-num text-[#B9C9CE]"
          >
            <span className="relative flex h-2 w-2">
              {backendStatus === 'connected' ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </>
              ) : backendStatus === 'checking' ? (
                <>
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#FFD400] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD400]"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B9C9CE]/50"></span>
              )}
            </span>
            <span>
              {backendStatus === 'connected' 
                ? 'Backend: Online' 
                : backendStatus === 'checking' 
                ? 'Pinging API...' 
                : 'Service: Standby'}
            </span>
          </button>

          {/* Explore Detector Button */}
          <a
            href="#detection"
            onClick={(e) => scrollToSection(e, '#detection')}
            className="group flex items-center gap-2 px-4 py-2 bg-[#FFD400] text-[#092936] text-xs font-semibold tracking-wider uppercase border border-[#FFD400] hover:bg-[#092936] hover:text-[#FFD400] transition-all duration-200 shadow-sm"
          >
            <span>Explore Detector</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#F5F2E9] hover:text-[#FFD400] transition-colors border border-[#315365] bg-[#0D3040]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#092936] border-b border-[#315365] px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm uppercase tracking-widest text-[#F5F2E9] hover:text-[#FFD400] py-2 border-b border-[#315365]/40"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono-num text-[#B9C9CE] px-1">
                <span>System Status</span>
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${backendStatus === 'connected' ? 'bg-[#10B981]' : 'bg-[#FFD400]'}`}></span>
                  {backendStatus === 'connected' ? 'Connected' : 'Prediction Service Standby'}
                </span>
              </div>

              <a
                href="#detection"
                onClick={(e) => scrollToSection(e, '#detection')}
                className="w-full text-center py-2.5 bg-[#FFD400] text-[#092936] text-xs font-bold tracking-wider uppercase"
              >
                Explore Detector
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
