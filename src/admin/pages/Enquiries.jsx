import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Search,
  Phone,
  Mail,
  Eye,
  Trash2,
} from 'lucide-react';

export const Enquiries = () => {
  const { leads, updateLeadStatus, deleteLead, setSelectedLead } = useApp();

  const [activePipelineTab, setActivePipelineTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const enquiries = leads ? leads.filter(l => l.source === 'Website' || l.source === 'WhatsApp' || l.source === 'Instagram') : [];

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      (enq.name && enq.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (enq.phone && enq.phone.includes(searchTerm)) ||
      (enq.interestedTreatment && enq.interestedTreatment.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab =
      activePipelineTab === 'All' || (enq.status && enq.status.toLowerCase() === activePipelineTab.toLowerCase());

    return matchesSearch && matchesTab;
  });

  const pipelineTabs = [
    { label: 'All Enquiries', value: 'All', count: enquiries.length },
    { label: 'New', value: 'New', count: enquiries.filter((e) => e.status === 'New').length },
    { label: 'Contacted', value: 'Contacted', count: enquiries.filter((e) => e.status === 'Contacted').length },
    { label: 'Follow-up', value: 'Follow-up', count: enquiries.filter((e) => e.status === 'Follow-up').length },
    { label: 'Converted', value: 'Converted', count: enquiries.filter((e) => e.status === 'Converted').length },
  ];

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="CLINIC MANAGEMENT"
        title="Patient Enquiries CRM"
        subtitle="Manage website consultation requests, WhatsApp enquiries, and conversion status."
      />

      {/* Pipeline Workflow Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {pipelineTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActivePipelineTab(tab.value)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
              activePipelineTab === tab.value
                ? 'bg-obsidian text-white shadow-md'
                : 'bg-white text-slate-600 border border-[#E8E2D9] hover:bg-[#FAF8F5]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                activePipelineTab === tab.value
                  ? 'bg-gold text-obsidian font-extrabold'
                  : 'bg-[#F1ECE5] text-slate-700'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Enquiry by Name, Phone, or Service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Pipeline Cards / Data Table */}
      {filteredEnquiries.length === 0 ? (
        <EmptyState
          title="No enquiries found"
          description="There are no patient enquiries in this pipeline column."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 font-bold">{enq.id}</span>
                    <h3 className="font-serif text-xl font-bold text-obsidian">{enq.name}</h3>
                  </div>
                  <Badge status={enq.status} />
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{enq.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="truncate">{enq.email}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-slate-900 pt-1">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Interested in:</span>
                    <span className="text-gold">{enq.interestedTreatment}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#F1ECE5] text-xs text-slate-700 italic mb-3">
                  "{enq.notes || 'Website Consultation Request'}"
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1ECE5] flex items-center justify-between gap-2">
                {/* Workflow Status Actions */}
                <select
                  value={enq.status}
                  onChange={(e) => updateLeadStatus(enq.id, e.target.value)}
                  className="bg-[#FAF8F5] border border-slate-300 text-xs font-bold rounded-xl px-2.5 py-1.5 text-slate-800 focus:border-gold"
                >
                  <option value="New">Move to New</option>
                  <option value="Contacted">Move to Contacted</option>
                  <option value="Follow-up">Move to Follow-up</option>
                  <option value="Converted">Move to Converted</option>
                </select>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedLead(enq)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-obsidian hover:bg-[#F1ECE5]"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteLead(enq.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
