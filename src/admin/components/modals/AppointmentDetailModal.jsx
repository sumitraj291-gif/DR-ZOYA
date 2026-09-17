import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { User, Phone, Mail, Calendar, Clock, FileText, CheckCircle, XCircle } from 'lucide-react';

export const AppointmentDetailModal = () => {
  const { selectedAppointment, setSelectedAppointment, updateAppointmentStatus } = useApp();

  if (!selectedAppointment) return null;

  return (
    <Modal
      isOpen={!!selectedAppointment}
      onClose={() => setSelectedAppointment(null)}
      title={`Appointment ${selectedAppointment.id}`}
    >
      <div className="space-y-5 text-xs">
        <div className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9]">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">STATUS</span>
            <div className="mt-1">
              <Badge status={selectedAppointment.status} />
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PAYMENT</span>
            <div className="mt-1 font-bold text-emerald-800">
              {selectedAppointment.paymentStatus || 'Paid'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Patient Name</span>
            <div className="font-bold text-obsidian text-sm">{selectedAppointment.patientName}</div>
            <div className="text-slate-500">{selectedAppointment.phone}</div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Specialist Doctor</span>
            <div className="font-bold text-slate-800 text-xs">{selectedAppointment.doctor}</div>
          </div>
        </div>

        <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#F1ECE5] space-y-1">
          <span className="text-[10px] font-bold text-gold uppercase">Service / Procedure</span>
          <p className="font-bold text-slate-900 text-sm">{selectedAppointment.treatment || selectedAppointment.service}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Scheduled Date</span>
            <div className="font-bold text-slate-900">{selectedAppointment.date}</div>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Time Slot</span>
            <div className="font-mono font-bold text-slate-900">{selectedAppointment.time}</div>
          </div>
        </div>

        {selectedAppointment.notes && (
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase mb-1">Clinical Notes</span>
            <div className="p-3 bg-amber-50 text-amber-950 rounded-xl border border-amber-200">
              {selectedAppointment.notes}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#F1ECE5] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {selectedAppointment.status !== 'Confirmed' && (
              <button
                onClick={() => {
                  updateAppointmentStatus(selectedAppointment.id, 'Confirmed');
                  setSelectedAppointment(null);
                }}
                className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-xl hover:bg-emerald-100"
              >
                Confirm Booking
              </button>
            )}

            {selectedAppointment.status === 'Confirmed' && (
              <button
                onClick={() => {
                  updateAppointmentStatus(selectedAppointment.id, 'Completed');
                  setSelectedAppointment(null);
                }}
                className="px-3 py-1.5 text-xs font-bold text-purple-800 bg-purple-50 border border-purple-300 rounded-xl hover:bg-purple-100"
              >
                Mark Completed
              </button>
            )}

            {selectedAppointment.status !== 'Cancelled' && (
              <button
                onClick={() => {
                  updateAppointmentStatus(selectedAppointment.id, 'Cancelled');
                  setSelectedAppointment(null);
                }}
                className="px-3 py-1.5 text-xs font-bold text-rose-800 bg-rose-50 border border-rose-300 rounded-xl hover:bg-rose-100"
              >
                Cancel Booking
              </button>
            )}
          </div>

          <button
            onClick={() => setSelectedAppointment(null)}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
