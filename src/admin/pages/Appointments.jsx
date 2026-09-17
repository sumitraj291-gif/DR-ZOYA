import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Search,
  Filter,
  Plus,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  FileText
} from 'lucide-react';
import { MOCK_DOCTORS, MOCK_SERVICES } from '../data/mockData';

export const Appointments = () => {
  const {
    appointments,
    updateAppointmentStatus,
    setIsNewAppointmentModalOpen,
    setSelectedAppointment
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [doctorFilter, setDoctorFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');

  const filteredApts = (appointments || []).filter((apt) => {
    const matchesSearch =
      (apt.patientName && apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (apt.id && apt.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (apt.phone && apt.phone.includes(searchTerm));
    const matchesStatus = statusFilter === 'All' || (apt.status && apt.status.toLowerCase() === statusFilter.toLowerCase());
    const matchesDoctor = doctorFilter === 'All' || apt.doctor === doctorFilter;
    const matchesService = serviceFilter === 'All' || ((apt.treatment || apt.service || '').toLowerCase().includes(serviceFilter.toLowerCase()));

    return matchesSearch && matchesStatus && matchesDoctor && matchesService;
  });

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="CLINIC MANAGEMENT"
        title="Appointments"
        subtitle="Manage and monitor all clinic consultations, procedures, and patient bookings."
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

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Patient Name, Phone, APT ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-gold"
            >
              <option value="All">All Booking Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <select
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-gold"
            >
              <option value="All">All Specialist Doctors</option>
              {MOCK_DOCTORS.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setDoctorFilter('All');
                setServiceFilter('All');
              }}
              className="w-full bg-[#F1ECE5] hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2 rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Appointments Data Table */}
      {filteredApts.length === 0 ? (
        <EmptyState
          title="No appointments found"
          description="There are no consultation bookings matching your search query or filters."
          actionText="Clear All Filters"
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('All');
            setDoctorFilter('All');
            setServiceFilter('All');
          }}
        />
      ) : (
        <div className="luxury-table-container">
          <table className="w-full text-left luxury-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Patient Details</th>
                <th>Service / Procedure</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Payment</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApts.map((apt) => (
                <tr key={apt.id}>
                  <td>
                    <span className="font-mono text-[11px] font-bold text-slate-900 bg-[#FAF8F5] px-2 py-1 rounded border border-[#E8E2D9]">
                      {apt.id}
                    </span>
                  </td>
                  <td>
                    <div className="font-semibold text-slate-900 text-xs">{apt.patientName}</div>
                    <div className="text-[10px] text-slate-400">{apt.phone}</div>
                  </td>
                  <td>
                    <div className="text-xs text-slate-800 font-medium">{apt.treatment || apt.service}</div>
                  </td>
                  <td>
                    <div className="text-xs text-slate-700 font-medium">{apt.doctor}</div>
                  </td>
                  <td>
                    <div className="text-xs font-semibold text-slate-900">{apt.date}</div>
                    <div className="text-[10px] font-mono text-slate-500">{apt.time}</div>
                  </td>
                  <td>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      apt.paymentStatus === 'Paid'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-50 text-amber-800 border border-amber-300'
                    }`}>
                      {apt.paymentStatus || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <Badge status={apt.status} />
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedAppointment(apt)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-obsidian hover:bg-[#F1ECE5]"
                        title="View & Edit Booking"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {apt.status === 'Pending' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                          className="px-2.5 py-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
