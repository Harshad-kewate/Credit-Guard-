import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Activity, 
  ChevronDown, 
  ShieldCheck,
  User
} from 'lucide-react';

export default function TopNavbar({ 
  activeTab, 
  setMobileOpen, 
  backendConnected, 
  searchQuery, 
  setSearchQuery 
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'transactions':
        return 'Transactions Ledger';
      case 'detection':
        return 'Fraud Detection & Analysis';
      case 'settings':
        return 'Application Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-[#E5EAF0] px-4 md:px-8 flex items-center justify-between shrink-0">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-[#7B8798] hover:text-[#17243A] rounded-md hover:bg-[#F5F7FA]"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-base md:text-lg font-bold text-[#17243A] font-heading tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Middle: Global Search Field */}
      <div className="hidden sm:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#7B8798] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Transaction ID, amount, or status..."
            className="w-full pl-9 pr-4 py-2 bg-[#F5F7FA] border border-[#E5EAF0] rounded-lg text-xs text-[#17243A] placeholder-[#7B8798] focus:outline-none focus:border-[#4568F5] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Actions, System Status, & Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        
        {/* System Status Pill */}
        <div 
          className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-[#E5EAF0] bg-[#F5F7FA] text-[11px] font-mono-num text-[#17243A]"
          title="Backend Machine Learning Inference Gateway Status"
        >
          <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-[#13B8A6] animate-pulse' : 'bg-[#F5A623]'}`} />
          <span>{backendConnected ? 'Model: Ready' : 'Model: Standby'}</span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-[#7B8798] hover:text-[#17243A] hover:bg-[#F5F7FA] rounded-lg transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4568F5] rounded-full" />
          </button>

          {/* Simple notifications popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E5EAF0] rounded-xl shadow-lg p-3 z-50 text-xs">
              <div className="font-semibold text-[#17243A] pb-2 border-b border-[#E5EAF0] flex items-center justify-between">
                <span>System Alerts</span>
                <span className="text-[10px] text-[#4568F5] font-normal">Mark all read</span>
              </div>
              <div className="py-2.5 space-y-2">
                <div className="p-2 rounded-md bg-[#F5F7FA] text-[11px] text-[#17243A]">
                  <span className="font-semibold text-[#17243A] block">Batch Ingestion Ready</span>
                  <span className="text-[#7B8798]">Upload transaction CSV files in Fraud Detection to analyze.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Placeholder */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#E5EAF0]">
          <div className="w-8 h-8 rounded-full bg-[#17243A] text-white flex items-center justify-center text-xs font-semibold font-mono-num">
            RC
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#17243A] leading-tight">
              Risk Analyst
            </span>
            <span className="text-[10px] text-[#7B8798]">
              Compliance & Fraud Ops
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
