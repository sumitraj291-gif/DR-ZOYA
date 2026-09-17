import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { ANALYTICS_DATA } from '../data/mockData';
import { TrendingUp, Users, Calendar, Award, DollarSign } from 'lucide-react';

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6 Months');

  const analyticsData = ANALYTICS_DATA || {
    conversionRates: { conversionPercentage: '61.7%' },
    monthlyAppointments: [
      { month: 'Apr', appointments: 120, revenue: 380000 },
      { month: 'May', appointments: 135, revenue: 420000 },
      { month: 'Jun', appointments: 140, revenue: 440000 },
      { month: 'Jul', appointments: 155, revenue: 470000 },
      { month: 'Aug', appointments: 148, revenue: 460000 },
      { month: 'Sep', appointments: 160, revenue: 482000 },
    ],
    serviceDistribution: [
      { service: 'Hollywood Smile Makeover', count: 48, percentage: 35, color: '#C5A059' },
      { service: 'Invisalign Aligners', count: 38, percentage: 28, color: '#090D14' },
      { service: 'Laser Teeth Whitening', count: 26, percentage: 19, color: '#1E293B' },
      { service: 'Porcelain Veneers', count: 18, percentage: 13, color: '#9A7736' },
      { service: 'Dental Implants', count: 8, percentage: 5, color: '#64748B' },
    ],
  };

  return (
    <div className="space-y-8 animate-modal-in">
      <PageHeader
        category="INSIGHTS & PERFORMANCE"
        title="Practice Analytics"
        subtitle="Editorial business analytics tracking patient acquisition, treatment revenue, and conversion metrics."
      />

      {/* Date Range Selector */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm">
        <span className="text-xs font-bold text-obsidian uppercase tracking-wider">Date Filter Range:</span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['7 Days', '30 Days', '3 Months', '6 Months', '1 Year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                timeRange === range
                  ? 'bg-obsidian text-white shadow-sm'
                  : 'bg-[#FAF8F5] text-slate-600 border border-[#E8E2D9] hover:bg-slate-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Rate</span>
          <p className="font-serif text-3xl font-bold text-obsidian mt-1">+14.2%</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">↑ Steady patient acquisition</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enquiry Conversion</span>
          <p className="font-serif text-3xl font-bold text-obsidian mt-1">{analyticsData.conversionRates.conversionPercentage}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">148 converted from 240 leads</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Procedure Value</span>
          <p className="font-serif text-3xl font-bold text-obsidian mt-1">₹42,500</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">Per cosmetic consultation</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Retention Rate</span>
          <p className="font-serif text-3xl font-bold text-gold mt-1">88.4%</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">Repeat hygiene & aligner checkups</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Appointments & Revenue Chart */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">MONTHLY PERFORMANCE</span>
              <h3 className="font-serif text-2xl font-bold text-obsidian">Appointments & Revenue</h3>
            </div>
          </div>

          <div className="space-y-5">
            {analyticsData.monthlyAppointments.map((item) => (
              <div key={item.month} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-obsidian font-mono">{item.month} 2026</span>
                  <span className="text-slate-700">{item.appointments} bookings (₹{(item.revenue / 100000).toFixed(2)}L)</span>
                </div>
                <div className="w-full h-3 bg-[#FAF8F5] rounded-full overflow-hidden border border-[#E8E2D9]">
                  <div
                    className="h-full bg-gold-gradient rounded-full"
                    style={{ width: `${(item.appointments / 180) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Requested Services Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">CATALOG DEMAND</span>
              <h3 className="font-serif text-2xl font-bold text-obsidian">Most Requested Services</h3>
            </div>
          </div>

          <div className="space-y-5">
            {analyticsData.serviceDistribution.map((srv) => (
              <div key={srv.service} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-obsidian">{srv.service}</span>
                  <span className="text-slate-600">{srv.count} cases ({srv.percentage}%)</span>
                </div>
                <div className="w-full h-3 bg-[#FAF8F5] rounded-full overflow-hidden border border-[#E8E2D9]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${srv.percentage}%`,
                      backgroundColor: srv.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
