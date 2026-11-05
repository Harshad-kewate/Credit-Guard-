import React from 'react';
import { X, ShieldCheck, ShieldAlert, Clock, CreditCard, Store, ExternalLink } from 'lucide-react';

export default function TransactionDetailModal({ transaction, onClose }) {
  if (!transaction) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Genuine':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#13B8A6]/10 text-[#13B8A6] border border-[#13B8A6]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Genuine
          </span>
        );
      case 'Potential Fraud':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#EF5350]/10 text-[#EF5350] border border-[#EF5350]/30 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            Potential Fraud
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/30">
            <Clock className="w-3.5 h-3.5" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E5EAF0] rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5EAF0] flex items-center justify-between bg-[#F5F7FA]/50">
          <div>
            <h3 className="text-sm font-bold text-[#17243A] font-heading">
              Transaction Details
            </h3>
            <span className="text-xs font-mono-num text-[#7B8798]">
              {transaction.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#7B8798] hover:text-[#17243A] rounded-md hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Top Amount & Status Row */}
          <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg border border-[#E5EAF0]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7B8798] font-medium block">
                Transaction Amount
              </span>
              <span className="text-2xl font-bold font-mono-num text-[#17243A]">
                ${Number(transaction.amount).toFixed(2)}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7B8798] font-medium block mb-1">
                Classification Status
              </span>
              {getStatusBadge(transaction.status)}
            </div>
          </div>

          {/* Key-Value Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#7B8798] block mb-0.5">Timestamp</span>
              <span className="font-mono-num text-[#17243A] font-medium">
                {transaction.timestamp || 'N/A'}
              </span>
            </div>

            <div>
              <span className="text-[#7B8798] block mb-0.5">Merchant</span>
              <span className="text-[#17243A] font-medium">
                {transaction.merchant || 'Standard Point of Sale'}
              </span>
            </div>

            <div>
              <span className="text-[#7B8798] block mb-0.5">Payment Channel</span>
              <span className="text-[#17243A] font-medium">
                {transaction.channel || 'POS Contactless'}
              </span>
            </div>

            <div>
              <span className="text-[#7B8798] block mb-0.5">Model Fraud Probability</span>
              <span className={`font-mono-num font-semibold ${
                transaction.score !== undefined && transaction.score !== null && transaction.score > 0.5 
                  ? 'text-[#EF5350]' 
                  : 'text-[#17243A]'
              }`}>
                {transaction.score !== undefined && transaction.score !== null 
                  ? `${(transaction.score * 100).toFixed(1)}%` 
                  : 'Classified'}
              </span>
            </div>
          </div>

          {/* Risk Notes / Reason */}
          <div className="p-3.5 bg-white border border-[#E5EAF0] rounded-lg">
            <span className="text-[11px] font-semibold text-[#17243A] block mb-1">
              Analysis Notes
            </span>
            <p className="text-xs text-[#7B8798] leading-relaxed">
              {transaction.flagReason || 'Transaction recorded within standard behavioral threshold.'}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#E5EAF0] bg-[#F5F7FA]/50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#17243A] hover:bg-white border border-[#E5EAF0] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
