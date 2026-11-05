import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import DashboardView from './components/DashboardView';
import TransactionsView from './components/TransactionsView';
import FraudDetectionView from './components/FraudDetectionView';
import SettingsView from './components/SettingsView';
import TransactionDetailModal from './components/TransactionDetailModal';
import { checkBackendHealth } from './services/api';
import { INITIAL_DEMO_TRANSACTIONS } from './data/mockTransactions';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [batchSummary, setBatchSummary] = useState(null);
  const [hasActiveBatch, setHasActiveBatch] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Probes Flask backend status
  const refreshBackendStatus = async () => {
    const res = await checkBackendHealth();
    setBackendConnected(res.connected);
  };

  useEffect(() => {
    refreshBackendStatus();
    const interval = setInterval(refreshBackendStatus, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleTransactionsUploaded = (newRecords, summary) => {
    setTransactions(newRecords);
    setBatchSummary(summary || null);
    setHasActiveBatch(true);
  };

  const handleLoadDemoData = () => {
    setTransactions(INITIAL_DEMO_TRANSACTIONS);
    setBatchSummary({
      total_transactions: INITIAL_DEMO_TRANSACTIONS.length,
      genuine_count: INITIAL_DEMO_TRANSACTIONS.filter(t => t.status === 'Genuine').length,
      fraud_count: INITIAL_DEMO_TRANSACTIONS.filter(t => t.status === 'Potential Fraud').length,
      fraud_rate_percentage: 25.0
    });
    setHasActiveBatch(true);
  };

  const handleClearData = () => {
    setTransactions([]);
    setBatchSummary(null);
    setHasActiveBatch(false);
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#F5F7FA] text-[#17243A]">
      
      {/* 1. Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        backendConnected={backendConnected}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Navigation Bar */}
        <TopNavbar
          activeTab={activeTab}
          setMobileOpen={setMobileOpen}
          backendConnected={backendConnected}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dynamic Viewport Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView
                transactions={transactions}
                batchSummary={batchSummary}
                setActiveTab={setActiveTab}
                setSelectedTransaction={setSelectedTransaction}
                onLoadDemoData={handleLoadDemoData}
                hasActiveBatch={hasActiveBatch}
              />
            )}

            {activeTab === 'transactions' && (
              <TransactionsView
                transactions={transactions}
                setSelectedTransaction={setSelectedTransaction}
                setActiveTab={setActiveTab}
                onLoadDemoData={handleLoadDemoData}
              />
            )}

            {activeTab === 'detection' && (
              <FraudDetectionView
                onTransactionsUploaded={handleTransactionsUploaded}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                backendConnected={backendConnected}
                setBackendConnected={setBackendConnected}
                onClearData={handleClearData}
              />
            )}
          </div>
        </main>

      </div>

      {/* 3. Transaction Details Modal Drawer */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

    </div>
  );
}
