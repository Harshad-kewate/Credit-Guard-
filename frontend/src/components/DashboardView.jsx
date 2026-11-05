import React from 'react';
import { 
  ArrowUpRight, 
  CreditCard, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  UploadCloud, 
  Activity, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

export default function DashboardView({ 
  transactions, 
  batchSummary,
  setActiveTab, 
  setSelectedTransaction, 
  onLoadDemoData,
  hasActiveBatch
}) {
  // Compute summary stats dynamically from loaded transactions or batch summary
  const totalCount = batchSummary?.total_transactions ?? transactions.length;
  const genuineCount = batchSummary?.genuine_count ?? transactions.filter((t) => t.status === 'Genuine').length;
  const fraudCount = batchSummary?.fraud_count ?? transactions.filter((t) => t.status === 'Potential Fraud').length;
  const pendingCount = transactions.filter((t) => t.status === 'Pending').length;
  const analyzedCount = genuineCount + fraudCount;

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#17243A] font-heading tracking-tight">
            Transaction Monitoring
          </h2>
          <p className="text-xs md:text-sm text-[#7B8798]">
            Monitor and analyze transaction activity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('detection')}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#4568F5] text-white rounded-lg text-xs font-semibold hover:bg-[#3453D8] transition-colors cursor-pointer shadow-xs"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Batch CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Compact Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Transactions */}
        <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-xs">
          <div className="flex items-center justify-between text-[#7B8798] mb-2">
            <span className="text-xs font-medium">Total Transactions</span>
            <CreditCard className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono-num text-[#17243A]">
            {hasActiveBatch ? totalCount.toLocaleString() : '--'}
          </div>
          <span className="text-[11px] text-[#7B8798] mt-1 block">
            {hasActiveBatch ? `${totalCount} records in ledger` : 'No active batch loaded'}
          </span>
        </div>

        {/* Analyzed Transactions */}
        <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-xs">
          <div className="flex items-center justify-between text-[#7B8798] mb-2">
            <span className="text-xs font-medium">Analyzed Transactions</span>
            <ShieldCheck className="w-4 h-4 text-[#13B8A6]" />
          </div>
          <div className="text-2xl font-bold font-mono-num text-[#17243A]">
            {hasActiveBatch ? analyzedCount.toLocaleString() : '--'}
          </div>
          <span className="text-[11px] text-[#7B8798] mt-1 block">
            {hasActiveBatch ? `${genuineCount} verified genuine` : 'Awaiting model inference'}
          </span>
        </div>

        {/* Potential Fraud */}
        <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-xs">
          <div className="flex items-center justify-between text-[#7B8798] mb-2">
            <span className="text-xs font-medium">Potential Fraud</span>
            <ShieldAlert className="w-4 h-4 text-[#EF5350]" />
          </div>
          <div className={`text-2xl font-bold font-mono-num ${hasActiveBatch && fraudCount > 0 ? 'text-[#EF5350]' : 'text-[#17243A]'}`}>
            {hasActiveBatch ? fraudCount.toLocaleString() : '--'}
          </div>
          <span className="text-[11px] text-[#7B8798] mt-1 block">
            {hasActiveBatch ? (fraudCount > 0 ? 'High-risk anomalies flagged' : 'Zero fraud detected') : 'Requires active model run'}
          </span>
        </div>

        {/* Pending Review */}
        <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-xs">
          <div className="flex items-center justify-between text-[#7B8798] mb-2">
            <span className="text-xs font-medium">Pending Review</span>
            <Clock className="w-4 h-4 text-[#F5A623]" />
          </div>
          <div className="text-2xl font-bold font-mono-num text-[#17243A]">
            {hasActiveBatch ? pendingCount.toLocaleString() : '--'}
          </div>
          <span className="text-[11px] text-[#7B8798] mt-1 block">
            {hasActiveBatch ? 'Unclassified queue' : 'No items queued'}
          </span>
        </div>

      </div>

      {/* Main Grid: Recent Transactions Preview + Status & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Transactions Table Preview (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EAF0] p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF0] mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#17243A] font-heading">
                Recent Monitored Transactions
              </h3>
              <p className="text-xs text-[#7B8798]">
                Real-time activity ledger preview
              </p>
            </div>

            <button
              onClick={() => setActiveTab('transactions')}
              className="text-xs font-semibold text-[#4568F5] hover:text-[#3453D8] flex items-center gap-1 cursor-pointer"
            >
              <span>View full ledger</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Table or Empty State */}
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5EAF0] text-[#7B8798]">
                    <th className="pb-3 font-medium">Transaction ID</th>
                    <th className="pb-3 font-medium">Timestamp</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF0]">
                  {transactions.slice(0, 5).map((txn) => (
                    <tr key={txn.id} className="hover:bg-[#F5F7FA]/70 transition-colors">
                      <td className="py-3 font-mono-num font-semibold text-[#17243A]">
                        {txn.id}
                      </td>
                      <td className="py-3 font-mono-num text-[#7B8798]">
                        {txn.timestamp}
                      </td>
                      <td className="py-3 font-mono-num font-semibold text-[#17243A]">
                        ${Number(txn.amount).toFixed(2)}
                      </td>
                      <td className="py-3">
                        {txn.status === 'Genuine' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#13B8A6]/10 text-[#13B8A6]">
                            Genuine
                          </span>
                        )}
                        {txn.status === 'Potential Fraud' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EF5350]/10 text-[#EF5350]">
                            Potential Fraud
                          </span>
                        )}
                        {txn.status === 'Pending' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F5A623]/10 text-[#F5A623]">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedTransaction(txn)}
                          className="text-[#4568F5] hover:underline font-medium text-[11px] cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#F5F7FA] border border-[#E5EAF0] flex items-center justify-center text-[#7B8798] mb-3">
                <CreditCard className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-[#17243A] mb-1">
                No Transactions Connected
              </h4>
              <p className="text-xs text-[#7B8798] max-w-sm mb-4">
                No active transaction stream or CSV batch is loaded into memory.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('detection')}
                  className="px-4 py-2 bg-[#4568F5] text-white rounded-lg text-xs font-semibold hover:bg-[#3453D8] transition-colors cursor-pointer"
                >
                  Upload Transaction CSV
                </button>
                <button
                  onClick={onLoadDemoData}
                  className="px-4 py-2 bg-white border border-[#E5EAF0] text-[#17243A] rounded-lg text-xs font-medium hover:bg-[#F5F7FA] transition-colors cursor-pointer"
                >
                  Load Demo Batch
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Action & Inference Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Quick Action: Fraud Screening */}
          <div className="bg-[#17243A] text-white p-5 rounded-xl shadow-xs">
            <span className="text-[10px] uppercase font-mono-num font-bold tracking-wider text-[#4568F5] block mb-1">
              Analysis Gateway
            </span>
            <h4 className="text-sm font-bold font-heading mb-2">
              Batch Fraud Screening
            </h4>
            <p className="text-xs text-[#7B8798] leading-relaxed mb-4">
              Ingest transactional datasets in CSV format for automated classification against the Random Forest inference engine.
            </p>
            <button
              onClick={() => setActiveTab('detection')}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#4568F5] text-white rounded-lg text-xs font-semibold hover:bg-[#3453D8] transition-colors cursor-pointer"
            >
              <span>Launch Ingestion Tool</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Model Inference Integration Notice */}
          <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#17243A] mb-2">
              <Activity className="w-4 h-4 text-[#F5A623]" />
              <span>Model Service Status</span>
            </div>
            <p className="text-xs text-[#7B8798] leading-relaxed mb-3">
              The frontend application shell and CSV parsing are active. ML inference executes via local Flask backend at <code className="text-[#17243A] font-mono-num font-semibold">127.0.0.1:5000</code>.
            </p>
            <div className="p-2.5 rounded-lg bg-[#F5F7FA] border border-[#E5EAF0] text-[11px] font-mono-num text-[#7B8798] flex items-center justify-between">
              <span>Status:</span>
              <span className="text-[#F5A623] font-semibold">Prediction service is not connected</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
