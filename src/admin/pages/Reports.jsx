import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { useToast } from '../context/ToastContext';
import { Download, FileSpreadsheet, FileText, BarChart3, TrendingUp, Users } from 'lucide-react';

export const Reports = () => {
  const { addToast } = useToast();
  const [reportTab, setReportTab] = useState('Lead'); // Lead, Appointment, Revenue, Conversion
  const [dateRange, setDateRange] = useState('30 Days');

  const handleExportCSV = () => {
    addToast(`${reportTab} Performance Report exported as CSV file`);
  };

  const handleExportPDF = () => {
    addToast(`${reportTab} Performance Report exported as PDF statement`);
  };

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="PRACTICE INSIGHTS"
        title="Reports & Business Analytics"
        subtitle="Exportable clinical performance reports for leads, appointments, revenue, and conversion trends."
        actionBtn={
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-white border border-[#E8E2D9] hover:bg-[#FAF8F5] text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="btn-gold-primary px-3.5 py-2 text-xs font-bold flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        }
      />

      {/* Date & Category Controls */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {['Lead', 'Appointment', 'Revenue', 'Conversion'].map((cat) => (
            <button
              key={cat}
              onClick={() => setReportTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                reportTab === cat
                  ? 'bg-obsidian text-white shadow-md'
                  : 'bg-[#FAF8F5] text-slate-600 border border-[#E8E2D9] hover:bg-slate-100'
              }`}
            >
              {cat} Reports
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Period:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-[#FAF8F5] border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-gold"
          >
            <option value="Today">Today</option>
            <option value="7 Days">7 Days</option>
            <option value="30 Days">30 Days</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
            <option value="1 Year">1 Year</option>
          </select>
        </div>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Volume</span>
          <p className="font-serif text-3xl font-bold text-obsidian mt-1">1,284</p>
          <span className="text-xs text-emerald-600 font-semibold">↑ +14.2% in {dateRange}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Successful Conversions</span>
          <p className="font-serif text-3xl font-bold text-emerald-700 mt-1">236</p>
          <span className="text-xs text-emerald-600 font-semibold">18.4% conversion rate</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Gross Revenue</span>
          <p className="font-serif text-3xl font-bold text-obsidian mt-1">₹4,82,000</p>
          <span className="text-xs text-emerald-600 font-semibold">↑ +12.6% vs previous cycle</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average Patient Spend</span>
          <p className="font-serif text-3xl font-bold text-gold mt-1">₹42,500</p>
          <span className="text-xs text-slate-500 font-semibold">Cosmetic dentistry average</span>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2D9] shadow-sm p-6 space-y-4">
        <h3 className="font-serif text-2xl font-bold text-obsidian">
          {reportTab} Performance Breakdown ({dateRange})
        </h3>

        <div className="luxury-table-container">
          <table className="w-full text-left luxury-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Leads / Bookings</th>
                <th>Converted / Completed</th>
                <th>Conversion Rate</th>
                <th>Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold text-slate-900 text-xs">Website Consultations</td>
                <td className="text-xs">480 leads</td>
                <td className="text-xs">96 converted</td>
                <td className="text-xs font-bold text-emerald-800">20.0%</td>
                <td className="text-xs font-bold text-obsidian">₹1,92,000</td>
              </tr>
              <tr>
                <td className="font-semibold text-slate-900 text-xs">WhatsApp AI Bot Chat</td>
                <td className="text-xs">320 leads</td>
                <td className="text-xs">74 converted</td>
                <td className="text-xs font-bold text-emerald-800">23.1%</td>
                <td className="text-xs font-bold text-obsidian">₹1,48,000</td>
              </tr>
              <tr>
                <td className="font-semibold text-slate-900 text-xs">Instagram & Social DMs</td>
                <td className="text-xs">240 leads</td>
                <td className="text-xs">38 converted</td>
                <td className="text-xs font-bold text-emerald-800">15.8%</td>
                <td className="text-xs font-bold text-obsidian">₹76,000</td>
              </tr>
              <tr>
                <td className="font-semibold text-slate-900 text-xs">Referrals & Walk-ins</td>
                <td className="text-xs">244 leads</td>
                <td className="text-xs">28 converted</td>
                <td className="text-xs font-bold text-emerald-800">11.4%</td>
                <td className="text-xs font-bold text-obsidian">₹66,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
