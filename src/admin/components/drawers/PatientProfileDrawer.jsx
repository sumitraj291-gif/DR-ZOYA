import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';
import { User, Phone, Mail, Calendar, FileText, Activity, Plus } from 'lucide-react';

export const PatientProfileDrawer = () => {
  const { selectedPatient, setSelectedPatient } = useApp();
  const { addToast } = useToast();
  const [newNote, setNewNote] = useState('');

  if (!selectedPatient) return null;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addToast('Clinical note attached to patient record');
    setNewNote('');
  };

  return (
    <Drawer
      isOpen={!!selectedPatient}
      onClose={() => setSelectedPatient(null)}
      subtitle={`PATIENT CRM FILE — ${selectedPatient.id}`}
      title={selectedPatient.name}
    >
      <div className="space-y-6 text-xs">
        {/* Personal Info Header Card */}
        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-gold uppercase">PERSONAL INFORMATION</span>
            <Badge status={selectedPatient.status} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Phone</span>
              <span className="font-bold text-obsidian text-xs">{selectedPatient.phone}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Email</span>
              <span className="font-medium text-slate-700">{selectedPatient.email}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Date of Birth</span>
              <span className="font-medium text-slate-700">{selectedPatient.dob || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Gender</span>
              <span className="font-medium text-slate-700">{selectedPatient.gender}</span>
            </div>
          </div>
        </div>

        {/* Clinical Notes & Shade Preferences */}
        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">CLINICAL PREFERENCES & NOTES</span>
          <p className="text-slate-700 bg-amber-50 p-3 rounded-2xl border border-amber-200 leading-relaxed font-medium">
            {selectedPatient.notes || 'No special clinical notes recorded.'}
          </p>

          <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add quick clinical note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="flex-1 p-2 border rounded-xl bg-[#FAF8F5] text-xs"
            />
            <button type="submit" className="btn-gold-primary px-3 py-1.5 text-xs font-bold">
              + Note
            </button>
          </form>
        </div>

        {/* Appointment History */}
        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">APPOINTMENT HISTORY</span>
          
          <div className="divide-y divide-[#F1ECE5]">
            {selectedPatient.appointments && selectedPatient.appointments.length > 0 ? (
              selectedPatient.appointments.map((apt) => (
                <div key={apt.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 font-bold block">{apt.id}</span>
                    <span className="font-semibold text-slate-900">{apt.treatment || apt.service}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">{apt.date}</span>
                    <Badge status={apt.status} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 py-2">No appointment history found.</p>
            )}
          </div>
        </div>

        {/* Treatment History */}
        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">COMPLETED SERVICES & TREATMENTS</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {selectedPatient.treatments && selectedPatient.treatments.length > 0 ? (
              selectedPatient.treatments.map((t, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#FAF8F5] border border-[#E8E2D9] text-obsidian font-semibold rounded-full text-[11px]">
                  ✓ {t}
                </span>
              ))
            ) : (
              <p className="text-slate-400">No previous completed procedures recorded.</p>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
