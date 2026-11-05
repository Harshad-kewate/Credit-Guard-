import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  CreditCard, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Plus
} from 'lucide-react';

export default function TransactionsView({ 
  transactions, 
  setSelectedTransaction, 
  setActiveTab,
  onLoadDemoData 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch = 
        txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (txn.merchant && txn.merchant.toLowerCase().includes(searchTerm.toLowerCase())) ||
        txn.amount.toString().includes(searchTerm);

      const matchesStatus = 
        statusFilter === 'ALL' || txn.status === statusFilter;

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortField === 'id') {
        comparison = a.id.localeCompare(b.id);
      } else {
        comparison = (a.timestamp || '').localeCompare(b.timestamp || '');
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [transactions, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const exportCSV = () => {
    if (filteredTransactions.length === 0) return;
    const headers = ['Transaction ID,Date & Time,Amount,Status,Merchant'];
    const rows = filteredTransactions.map(t => 
      `"${t.id}","${t.timestamp || ''}",${t.amount},"${t.status}","${t.merchant || ''}"`
    );
    const blob = new Blob([[...headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#17243A] font-heading tracking-tight">
            Transactions
          </h2>
          <p className="text-xs md:text-sm text-[#7B8798]">
            Comprehensive ledger of monitored card transactions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            disabled={filteredTransactions.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E5EAF0] text-[#17243A] rounded-lg text-xs font-semibold hover:bg-[#F5F7FA] transition-colors cursor-pointer disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5 text-[#7B8798]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('detection')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#4568F5] text-white rounded-lg text-xs font-semibold hover:bg-[#3453D8] transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Batch</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search & Status Filters */}
      <div className="bg-white p-4 rounded-xl border border-[#E5EAF0] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#7B8798] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by ID, amount, merchant..."
            className="w-full pl-9 pr-4 py-2 bg-[#F5F7FA] border border-[#E5EAF0] rounded-lg text-xs text-[#17243A] placeholder-[#7B8798] focus:outline-none focus:border-[#4568F5] focus:bg-white transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-[#7B8798] font-medium mr-2 hidden sm:inline">Status:</span>
          {['ALL', 'Genuine', 'Potential Fraud', 'Pending'].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-[#17243A] text-white'
                  : 'text-[#7B8798] hover:bg-[#F5F7FA] hover:text-[#17243A]'
              }`}
            >
              {status === 'ALL' ? 'All Transactions' : status}
            </button>
          ))}
        </div>

      </div>

      {/* Transactions Table Container */}
      <div className="bg-white rounded-xl border border-[#E5EAF0] shadow-xs overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F5F7FA]/70 border-b border-[#E5EAF0] text-[#7B8798]">
                    <th 
                      onClick={() => toggleSort('id')}
                      className="py-3 px-4 font-semibold cursor-pointer hover:text-[#17243A]"
                    >
                      <div className="flex items-center gap-1">
                        <span>Transaction ID</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th 
                      onClick={() => toggleSort('timestamp')}
                      className="py-3 px-4 font-semibold cursor-pointer hover:text-[#17243A]"
                    >
                      <div className="flex items-center gap-1">
                        <span>Date & Time</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th 
                      onClick={() => toggleSort('amount')}
                      className="py-3 px-4 font-semibold cursor-pointer hover:text-[#17243A]"
                    >
                      <div className="flex items-center gap-1">
                        <span>Amount</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-3 px-4 font-semibold">
                      Status
                    </th>
                    <th className="py-3 px-4 font-semibold text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF0]">
                  {paginatedTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-[#F5F7FA]/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono-num font-semibold text-[#17243A]">
                        {txn.id}
                      </td>
                      <td className="py-3.5 px-4 font-mono-num text-[#7B8798]">
                        {txn.timestamp || 'N/A'}
                      </td>
                      <td className="py-3.5 px-4 font-mono-num font-bold text-[#17243A]">
                        ${Number(txn.amount).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        {txn.status === 'Genuine' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#13B8A6]/10 text-[#13B8A6] border border-[#13B8A6]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#13B8A6]" />
                            Genuine
                          </span>
                        )}
                        {txn.status === 'Potential Fraud' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EF5350]/10 text-[#EF5350] border border-[#EF5350]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EF5350]" />
                            Potential Fraud
                          </span>
                        )}
                        {txn.status === 'Pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedTransaction(txn)}
                          className="px-2.5 py-1 text-xs font-semibold text-[#4568F5] hover:bg-[#4568F5]/10 rounded-md transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-[#E5EAF0] flex items-center justify-between text-xs text-[#7B8798]">
              <span>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} records
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 border border-[#E5EAF0] rounded-md hover:bg-[#F5F7FA] disabled:opacity-40 cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono-num text-[#17243A] font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 border border-[#E5EAF0] rounded-md hover:bg-[#F5F7FA] disabled:opacity-40 cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Realistic Empty State */
          <div className="py-16 text-center flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 rounded-full bg-[#F5F7FA] border border-[#E5EAF0] flex items-center justify-center text-[#7B8798] mb-3">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-[#17243A] mb-1">
              No Transaction Data Available
            </h4>
            <p className="text-xs text-[#7B8798] max-w-sm mb-4">
              {transactions.length === 0
                ? 'No transaction records are currently loaded in the monitoring ledger.'
                : 'No transactions match the selected filter criteria.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('detection')}
                className="px-4 py-2 bg-[#4568F5] text-white rounded-lg text-xs font-semibold hover:bg-[#3453D8] transition-colors cursor-pointer"
              >
                Upload CSV Dataset
              </button>
              {transactions.length === 0 && (
                <button
                  onClick={onLoadDemoData}
                  className="px-4 py-2 bg-white border border-[#E5EAF0] text-[#17243A] rounded-lg text-xs font-medium hover:bg-[#F5F7FA] transition-colors cursor-pointer"
                >
                  Load Demo Batch
                </button>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
