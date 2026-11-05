import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  ShieldAlert, 
  Settings, 
  Shield, 
  Activity,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen, backendConnected }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'detection', label: 'Fraud Detection', icon: ShieldAlert },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#E5EAF0] flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#E5EAF0]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#17243A] flex items-center justify-center text-[#4568F5] shadow-xs">
                <Shield className="w-5 h-5 fill-[#4568F5]/20 text-[#4568F5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-wide text-[#17243A] uppercase font-mono-num">
                  CREDIT GUARD
                </span>
                <span className="text-[10px] text-[#7B8798] font-medium">
                  Fraud Detection Platform
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 text-[#7B8798] hover:text-[#17243A] rounded-md"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-[#7B8798] uppercase">
              Main Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#4568F5]/10 text-[#4568F5] font-semibold'
                      : 'text-[#7B8798] hover:bg-[#F5F7FA] hover:text-[#17243A]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#4568F5]' : 'text-[#7B8798]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / System Status */}
        <div className="p-4 border-t border-[#E5EAF0] bg-[#F5F7FA]/60">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#7B8798] text-[11px] font-medium">Service Engine</span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono-num font-medium text-[#17243A]">
              <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-[#13B8A6]' : 'bg-[#F5A623]'}`} />
              {backendConnected ? 'Online' : 'Standby'}
            </span>
          </div>
          <div className="text-[10px] text-[#7B8798] font-mono-num">
            Inference Gateway v2.4
          </div>
        </div>
      </aside>
    </>
  );
}
