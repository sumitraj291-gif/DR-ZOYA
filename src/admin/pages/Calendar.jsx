import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  FileText,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';

export const CalendarPage = () => {
  const {
    appointments,
    updateAppointmentStatus,
    setSelectedAppointment,
    setIsNewAppointmentModalOpen
  } = useApp();

  const [viewMode, setViewMode] = useState('Month'); // Month, Week, Day
  const [currentDate, setCurrentDate] = useState('September 2026');

  // Generate September 2026 calendar days
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="CLINIC MANAGEMENT"
        title="Calendar"
        subtitle="Visual daily, weekly, and monthly schedule for consultations and dental procedures."
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

      {/* Calendar Controls Top Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border border-[#E8E2D9] rounded-xl p-1 bg-[#FAF8F5]">
            <button className="p-1.5 text-slate-500 hover:text-obsidian hover:bg-white rounded-lg transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-slate-500 hover:text-obsidian hover:bg-white rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="font-serif text-xl font-bold text-obsidian tracking-wide">
            {currentDate}
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]">
          {['Month', 'Week', 'Day'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                viewMode === mode
                  ? 'bg-obsidian text-white shadow-sm'
                  : 'text-slate-500 hover:text-obsidian'
              }`}
            >
              {mode} View
            </button>
          ))}
        </div>
      </div>

      {/* Month View Grid */}
      {viewMode === 'Month' && (
        <div className="bg-white rounded-3xl border border-[#E8E2D9] shadow-sm overflow-hidden p-4">
          {/* Day Names Header */}
          <div className="grid grid-cols-7 text-center font-bold text-[10px] text-slate-400 uppercase tracking-wider py-2 border-b border-[#F1ECE5]">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-px bg-[#E8E2D9] mt-2 rounded-2xl overflow-hidden">
            {daysInMonth.map((day) => {
              const dayStr = `2026-09-${day < 10 ? '0' + day : day}`;
              const dayApts = (appointments || []).filter((a) => a.date === dayStr);
              const isToday = day === 16;

              return (
                <div
                  key={day}
                  className={`bg-white min-h-[110px] p-2 flex flex-col justify-between hover:bg-[#FAF8F5] transition-colors ${
                    isToday ? 'ring-2 ring-gold ring-inset bg-gold/5' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold font-mono ${
                        isToday ? 'text-gold font-extrabold' : 'text-slate-700'
                      }`}
                    >
                      {day}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gold px-1.5 py-0.5 rounded bg-gold/10">
                        Today
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 my-1 overflow-y-auto max-h-[75px]">
                    {dayApts.map((apt) => (
                      <div
                        key={apt.id}
                        onClick={() => setSelectedAppointment(apt)}
                        className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9] hover:border-gold cursor-pointer transition-all text-left"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-mono font-bold text-obsidian">{apt.time}</span>
                          <span className="w-2 h-2 rounded-full bg-gold" />
                        </div>
                        <p className="text-[10px] font-semibold text-slate-800 truncate">
                          {apt.patientName}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="text-[9px] text-slate-400 text-right">
                    {dayApts.length > 0 ? `${dayApts.length} bookings` : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week / Day View List Fallback */}
      {viewMode !== 'Month' && (
        <div className="bg-white rounded-3xl border border-[#E8E2D9] shadow-sm p-6 space-y-4">
          <h3 className="font-serif text-xl font-bold text-obsidian">
            Schedule for {viewMode} View (16 Sep - 22 Sep 2026)
          </h3>
          <div className="divide-y divide-[#F1ECE5]">
            {(appointments || []).map((apt) => (
              <div
                key={apt.id}
                onClick={() => setSelectedAppointment(apt)}
                className="py-4 flex items-center justify-between cursor-pointer hover:bg-[#FAF8F5] px-4 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 text-center font-mono font-bold text-xs text-obsidian bg-[#FAF8F5] p-2 rounded-xl border border-[#E8E2D9]">
                    {apt.time}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{apt.patientName}</h4>
                    <p className="text-[11px] text-slate-500">{apt.treatment || apt.service} • {apt.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={apt.status} />
                  <span className="text-xs text-gold font-semibold">View & Action →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
