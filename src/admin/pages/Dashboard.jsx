import React from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import {
  UserCheck,
  Clock,
  CalendarDays,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Plus,
  Eye,
  CheckCircle,
  ChevronRight,
  Phone
} from 'lucide-react';

export const Dashboard = () => {
  const {
    appointments,
    leads,
    followups,
    updateAppointmentStatus,
    setSelectedAppointment,
    setIsNewAppointmentModalOpen,
    setActiveTab
  } = useApp();

  const todayStr = '2026-09-16';
  const todayApts = appointments ? appointments.filter((apt) => apt.date === todayStr) : [];

  return (
    <div className="space-y-8 animate-modal-in">
      {/* Page Header */}
      <PageHeader
        category="CLINIC OVERVIEW"
        title="Dashboard"
        subtitle="A real-time overview of your clinic activity, patient acquisition, revenue, and follow-ups due."
        actionBtn={
          <button
            onClick={() => setIsNewAppointmentModalOpen(true)}
            className="btn-gold-primary px-4 py-2.5 text-xs tracking-wider flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Appointment</span>
          </button>
        }
      />

      {/* 7 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {/* Card 1: Total Leads */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Leads</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-obsidian">1,284</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">↑ +14.2% vs last mo</div>
        </div>

        {/* Card 2: Today's Appointments */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Today's Appts</span>
            <div className="w-7 h-7 rounded-lg bg-gold/10 text-gold flex items-center justify-center">
              <CalendarDays className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-obsidian">{todayApts.length || 7}</div>
          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">5 confirmed • 2 pending</div>
        </div>

        {/* Card 3: Total Bookings */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Bookings</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-obsidian">1,280</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">↑ +14% this month</div>
        </div>

        {/* Card 4: Month Gross Revenue */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-obsidian">₹4.82L</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">↑ +12.6% vs target</div>
        </div>

        {/* Card 5: Conversion Rate */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Conversion</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-obsidian">18.4%</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">↑ +3.2% vs last mo</div>
        </div>

        {/* Card 6: Pending Payments */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending Dues</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-rose-700">₹65,000</div>
          <div className="text-[10px] text-rose-600 font-semibold mt-0.5">6 pending invoices</div>
        </div>

        {/* Card 7: Follow-ups Due */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Follow-ups</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-amber-700">18 Due</div>
          <div className="text-[10px] text-amber-600 font-semibold mt-0.5">Attention required</div>
        </div>
      </div>

      {/* Split Section: Today's Schedule & Recent Leads CRM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Today's Appointments Timeline */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8E2D9] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#F1ECE5] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">DAILY SCHEDULE</span>
              <h3 className="font-serif text-2xl font-bold text-obsidian">Today's Consultations</h3>
            </div>
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#F1ECE5]">
            {todayApts.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No appointments scheduled for today.</p>
            ) : (
              todayApts.map((apt) => (
                <div
                  key={apt.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] px-2 rounded-2xl transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-14 text-center font-mono font-bold text-xs text-obsidian bg-[#FAF8F5] p-2 rounded-xl border border-[#E8E2D9]">
                      {apt.time}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{apt.patientName}</h4>
                        <Badge status={apt.status} />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{apt.treatment || apt.service} • {apt.doctor}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setSelectedAppointment(apt)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-obsidian hover:bg-[#F1ECE5]"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {apt.status === 'Pending' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Fresh Leads Pipeline & Due Follow-ups */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fresh Leads Card */}
          <div className="bg-white rounded-3xl border border-[#E8E2D9] shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1ECE5] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">NEW INQUIRIES</span>
                <h3 className="font-serif text-xl font-bold text-obsidian">Recent Leads</h3>
              </div>
              <button
                onClick={() => setActiveTab('leads')}
                className="text-xs font-bold text-gold hover:underline"
              >
                CRM Pipeline →
              </button>
            </div>

            <div className="space-y-3">
              {leads && leads.slice(0, 3).map((l) => (
                <div
                  key={l.id}
                  className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{l.name}</span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase px-1.5 py-0.5 rounded bg-white border">
                        {l.source}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{l.interestedTreatment}</p>
                  </div>
                  <Badge status={l.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Follow-ups Due Today */}
          <div className="bg-white rounded-3xl border border-[#E8E2D9] shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1ECE5] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">PRIORITY TASKS</span>
                <h3 className="font-serif text-xl font-bold text-obsidian">Follow-ups Due</h3>
              </div>
              <button
                onClick={() => setActiveTab('follow-ups')}
                className="text-xs font-bold text-gold hover:underline"
              >
                Tracker →
              </button>
            </div>

            <div className="space-y-3">
              {followups && followups.slice(0, 2).map((f) => (
                <div
                  key={f.id}
                  className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950">{f.name}</span>
                    <span className="text-[10px] font-bold text-amber-800">{f.dueDate}</span>
                  </div>
                  <p className="text-[11px] text-amber-900 line-clamp-1">{f.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
