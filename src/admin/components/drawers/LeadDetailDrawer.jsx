import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';
import { Phone, Mail, Sparkles, UserPlus, FileText } from 'lucide-react';

export const LeadDetailDrawer = () => {
  const { selectedLead, setSelectedLead, updateLeadStatus, convertLeadToPatient } = useApp();
  const { addToast } = useToast();
  const [noteText, setNoteText] = useState('');

  if (!selectedLead) return null;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addToast(`Note attached to Lead ${selectedLead.id}`);
    setNoteText('');
  };

  return (
    <Drawer
      isOpen={!!selectedLead}
      onClose={() => setSelectedLead(null)}
      subtitle={`LEAD CRM RECORD — ${selectedLead.id}`}
      title={selectedLead.name}
    >
      <div className="space-y-6 text-xs">
        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-gold uppercase">STATUS & SOURCE</span>
            <Badge status={selectedLead.status} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Phone</span>
              <span className="font-bold text-obsidian">{selectedLead.phone}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Email</span>
              <span className="font-medium text-slate-700">{selectedLead.email}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Interested Treatment</span>
              <span className="font-bold text-gold">{selectedLead.interestedTreatment}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block">Lead Source</span>
              <span className="font-medium text-slate-700">{selectedLead.source}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">CONVERSATION NOTES</span>
          <p className="text-slate-800 bg-[#FAF8F5] p-3 rounded-2xl border border-[#F1ECE5] leading-relaxed italic">
            "{selectedLead.notes || 'No notes available.'}"
          </p>

          <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add staff lead note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="flex-1 p-2 border rounded-xl bg-[#FAF8F5] text-xs"
            />
            <button type="submit" className="btn-gold-primary px-3 py-1.5 font-bold">
              Save Note
            </button>
          </form>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          {selectedLead.status !== 'Converted' && (
            <button
              onClick={() => convertLeadToPatient(selectedLead)}
              className="btn-gold-primary px-4 py-2.5 font-bold w-full flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Convert Lead to Patient Record</span>
            </button>
          )}
        </div>
      </div>
    </Drawer>
  );
};
