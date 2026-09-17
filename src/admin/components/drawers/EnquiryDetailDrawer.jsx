import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';
import { Phone, Mail, Sparkles, MessageSquare, Calendar } from 'lucide-react';

export const EnquiryDetailDrawer = () => {
  const { selectedEnquiry, setSelectedEnquiry, updateEnquiryStatus } = useApp();
  const { addToast } = useToast();
  const [noteInput, setNoteInput] = useState('');

  if (!selectedEnquiry) return null;

  const handleAddStaffNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    addToast('Internal staff note added to enquiry');
    setNoteInput('');
  };

  return (
    <Drawer
      isOpen={!!selectedEnquiry}
      onClose={() => setSelectedEnquiry(null)}
      subtitle={`ENQUIRY RECORD — ${selectedEnquiry.id}`}
      title={selectedEnquiry.name}
    >
      <div className="space-y-6 text-xs">
        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-gold uppercase">STATUS PIPELINE</span>
            <Badge status={selectedEnquiry.status} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Phone</span>
              <span className="font-bold text-obsidian">{selectedEnquiry.phone}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Email</span>
              <span className="font-medium text-slate-700">{selectedEnquiry.email}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Interested Service</span>
              <span className="font-bold text-gold">{selectedEnquiry.interestedService}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Enquiry Date</span>
              <span className="font-medium text-slate-700">{selectedEnquiry.date}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">WEBSITE ENQUIRY MESSAGE</span>
          <p className="text-slate-800 bg-[#FAF8F5] p-4 rounded-2xl border border-[#F1ECE5] leading-relaxed italic">
            "{selectedEnquiry.message}"
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">INTERNAL CONCIERGE NOTES</span>
          {selectedEnquiry.notes && (
            <p className="text-amber-900 bg-amber-50 p-3 rounded-2xl border border-amber-200">
              📌 {selectedEnquiry.notes}
            </p>
          )}

          <form onSubmit={handleAddStaffNote} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Add staff note (e.g. Sent pricing info via WhatsApp)..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="flex-1 p-2 border rounded-xl bg-[#FAF8F5] text-xs"
            />
            <button type="submit" className="btn-gold-primary px-3 py-1.5 font-bold">
              Save Note
            </button>
          </form>
        </div>

        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (updateEnquiryStatus) updateEnquiryStatus(selectedEnquiry.id, 'Converted');
              setSelectedEnquiry(null);
            }}
            className="btn-gold-primary px-4 py-2 font-bold flex-1"
          >
            Mark as Converted Patient
          </button>
        </div>
      </div>
    </Drawer>
  );
};
