import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { Search, CreditCard, RefreshCw, FileText, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export const Payments = () => {
  const { payments, initiateRefund, selectedPayment, setSelectedPayment } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPayments = (payments || []).filter((pay) => {
    const matchesSearch =
      (pay.patientName && pay.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pay.id && pay.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pay.orderId && pay.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pay.razorpayPaymentId && pay.razorpayPaymentId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || (pay.status && pay.status.toLowerCase() === statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="FINANCE & BILLING"
        title="Razorpay Payment Ledger"
        subtitle="Manage clinic transaction logs, Razorpay Order IDs, zero-interest EMI financing, and refund requests."
      />

      {/* Razorpay Readiness Status Card */}
      <div className="bg-obsidian text-white p-5 rounded-3xl border border-gold/40 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gold/20 text-gold flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl font-bold text-white">Razorpay Payment Gateway API</h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-700">
                READY FOR API KEYS
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Configured for INR (₹) transactions, instant webhook updates, and 0% EMI financing.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Patient Name, PAY ID, Razorpay Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#FAF8F5] border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-gold"
        >
          <option value="All">All Payment Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Refunded">Refunded</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      {filteredPayments.length === 0 ? (
        <EmptyState
          title="No payment logs found"
          description="There are no payment records matching your filter criteria."
        />
      ) : (
        <div className="luxury-table-container">
          <table className="w-full text-left luxury-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Patient</th>
                <th>Treatment</th>
                <th>Amount (₹)</th>
                <th>Method</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((pay) => (
                <tr key={pay.id}>
                  <td>
                    <div className="font-mono text-[11px] font-bold text-slate-900">{pay.id}</div>
                    <div className="font-mono text-[9px] text-slate-400">{pay.orderId}</div>
                  </td>
                  <td>
                    <div className="font-semibold text-slate-900 text-xs">{pay.patientName}</div>
                    <div className="text-[10px] text-slate-400">{pay.appointmentId}</div>
                  </td>
                  <td>
                    <div className="text-xs text-slate-800 font-medium">{pay.treatment}</div>
                  </td>
                  <td>
                    <div className="text-xs font-bold text-obsidian">₹{pay.amount.toLocaleString('en-IN')}</div>
                  </td>
                  <td>
                    <span className="text-[11px] font-semibold text-slate-700">{pay.method}</span>
                  </td>
                  <td>
                    <div className="text-[11px] text-slate-600 font-mono">{pay.date}</div>
                  </td>
                  <td>
                    <Badge status={pay.status} />
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {pay.status === 'Paid' && (
                        <button
                          onClick={() => initiateRefund(pay.id)}
                          className="px-2.5 py-1 text-[10px] font-bold text-rose-800 bg-rose-50 border border-rose-300 rounded-lg hover:bg-rose-100 flex items-center gap-1"
                          title="Initiate Razorpay Refund"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Refund</span>
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedPayment(pay)}
                        className="px-2.5 py-1 text-[10px] font-bold text-slate-800 bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg hover:bg-slate-200"
                      >
                        Receipt
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Receipt Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl border border-[#E8E2D9] shadow-2xl overflow-hidden p-6 animate-modal-in space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#F1ECE5] pb-3">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider">RAZORPAY RECEIPT</span>
                <h3 className="font-serif text-2xl font-bold text-obsidian">{selectedPayment.id}</h3>
              </div>
              <Badge status={selectedPayment.status} />
            </div>

            <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9]">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Razorpay Payment ID:</span>
                <span className="font-mono text-obsidian font-bold">{selectedPayment.razorpayPaymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Order ID:</span>
                <span className="font-mono text-obsidian font-bold">{selectedPayment.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Patient:</span>
                <span className="font-bold text-slate-900">{selectedPayment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Treatment:</span>
                <span className="font-medium text-slate-800">{selectedPayment.treatment}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E8E2D9]">
                <span className="text-slate-700 font-bold">Total Amount Paid:</span>
                <span className="font-serif text-xl font-bold text-obsidian">₹{selectedPayment.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedPayment(null)}
                className="btn-gold-primary px-5 py-2 font-bold"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
