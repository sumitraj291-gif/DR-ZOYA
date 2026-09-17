import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Search,
  Plus,
  UserCheck,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  UserPlus,
  Eye,
  Trash2,
  ChevronRight,
  Filter
} from 'lucide-react';

export const Leads = () => {
  const {
    leads,
    updateLeadStatus,
    deleteLead,
    convertLeadToPatient,
    setSelectedLead,
    addLead,
    setIsNewLeadModalOpen,
    isNewLeadModalOpen
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');

  // New lead form local state
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    interestedTreatment: 'Hollywood Smile Makeover',
    source: 'Website',
    assignedStaff: 'Dr. Zoya Khan',
    notes: '',
  });

  const filteredLeads = (leads || []).filter((l) => {
    const matchesSearch =
      (l.name && l.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.id && l.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.phone && l.phone.includes(searchTerm)) ||
      (l.interestedTreatment && l.interestedTreatment.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || (l.status && l.status.toLowerCase() === statusFilter.toLowerCase());
    const matchesSource = sourceFilter === 'All' || (l.source && l.source.toLowerCase() === sourceFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) return;
    addLead(newLeadForm);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      interestedTreatment: 'Hollywood Smile Makeover',
      source: 'Website',
      assignedStaff: 'Dr. Zoya Khan',
      notes: '',
    });
  };

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="PATIENT ACQUISITION"
        title="Lead Management CRM"
        subtitle="Track incoming patient consultations across website forms, WhatsApp AI, Instagram, and referrals."
        actionBtn={
          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            className="btn-gold-primary px-4 py-2.5 text-xs tracking-wider flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Lead</span>
          </button>
        }
      />

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Lead Name, LED ID, Phone..."
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
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Interested">Interested</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-gold"
            >
              <option value="All">All Lead Sources</option>
              <option value="Website">Website</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Instagram">Instagram</option>
              <option value="Google">Google</option>
              <option value="Referral">Referral</option>
              <option value="Walk-in">Walk-in</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
              setSourceFilter('All');
            }}
            className="bg-[#F1ECE5] hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2 rounded-xl transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Leads Table */}
      {filteredLeads.length === 0 ? (
        <EmptyState
          title="No leads found"
          description="There are no leads matching your search and filter options."
          actionText="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('All');
            setSourceFilter('All');
          }}
        />
      ) : (
        <div className="luxury-table-container">
          <table className="w-full text-left luxury-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Name & Contact</th>
                <th>Interested Treatment</th>
                <th>Source</th>
                <th>Assigned Staff</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <span className="font-mono text-[11px] font-bold text-slate-900 bg-[#FAF8F5] px-2 py-1 rounded border border-[#E8E2D9]">
                      {lead.id}
                    </span>
                  </td>
                  <td>
                    <div className="font-semibold text-slate-900 text-xs">{lead.name}</div>
                    <div className="text-[10px] text-slate-400">{lead.phone} • {lead.email}</div>
                  </td>
                  <td>
                    <div className="text-xs text-slate-800 font-medium">{lead.interestedTreatment}</div>
                  </td>
                  <td>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {lead.source}
                    </span>
                  </td>
                  <td>
                    <div className="text-xs text-slate-600">{lead.assignedStaff}</div>
                  </td>
                  <td>
                    <Badge status={lead.status} />
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {lead.status !== 'Converted' && (
                        <button
                          onClick={() => convertLeadToPatient(lead)}
                          className="px-2.5 py-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 flex items-center gap-1"
                          title="Convert Lead to Patient Record"
                        >
                          <UserPlus className="w-3 h-3" />
                          <span>Convert to Patient</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-obsidian hover:bg-[#F1ECE5]"
                        title="View Lead CRM File"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Lead Modal */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#E8E2D9] shadow-2xl overflow-hidden p-6 animate-modal-in space-y-4">
            <h3 className="font-serif text-2xl font-bold text-obsidian">Create New Patient Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Lead Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shalini Rao"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="lead@example.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Interested Treatment</label>
                  <input
                    type="text"
                    placeholder="Hollywood Smile Makeover"
                    value={newLeadForm.interestedTreatment}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, interestedTreatment: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Lead Source</label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  >
                    <option value="Website">Website</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Google">Google</option>
                    <option value="Referral">Referral</option>
                    <option value="Walk-in">Walk-in</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Initial Consultation Notes</label>
                <textarea
                  rows={3}
                  placeholder="Patient requirements..."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold-primary px-5 py-2 font-bold">
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
