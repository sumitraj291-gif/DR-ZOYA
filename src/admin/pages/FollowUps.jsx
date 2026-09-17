import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { Clock, CheckCircle2, AlertCircle, Phone, User, Calendar } from 'lucide-react';

export const FollowUps = () => {
  const { followups, completeFollowup } = useApp();
  const [filterTab, setFilterTab] = useState('All');

  const filteredFollowups = (followups || []).filter((f) => {
    if (filterTab === 'All') return true;
    return f.status && f.status.toLowerCase() === filterTab.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="PATIENT ENGAGEMENT"
        title="Follow-up Tracker"
        subtitle="Monitor overdue patient follow-ups, post-procedure checks, and consultation callbacks."
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Due Today', 'Overdue', 'Pending', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              filterTab === tab
                ? 'bg-obsidian text-white shadow-md'
                : 'bg-white text-slate-600 border border-[#E8E2D9] hover:bg-[#FAF8F5]'
            }`}
          >
            <span>{tab}</span>
          </button>
        ))}
      </div>

      {/* Follow-ups Grid */}
      {filteredFollowups.length === 0 ? (
        <EmptyState
          title="No follow-ups due"
          description="There are no patient follow-ups matching this category."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFollowups.map((f) => (
            <div
              key={f.id}
              className={`bg-white p-5 rounded-3xl border shadow-sm transition-all flex flex-col justify-between ${
                f.status === 'Overdue' ? 'border-rose-300 bg-rose-50/30' : 'border-[#E8E2D9]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">{f.id} • {f.type}</span>
                    <h3 className="font-serif text-xl font-bold text-obsidian">{f.name}</h3>
                  </div>
                  <Badge status={f.status} />
                </div>

                <div className="space-y-2 text-xs text-slate-700 mb-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="font-semibold">{f.phone}</span>
                  </div>
                  <p className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#F1ECE5] leading-relaxed italic">
                    "{f.reason}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-medium mb-3">
                  <div>Due Date: <span className="font-bold text-slate-900">{f.dueDate}</span></div>
                  <div>Assigned: <span className="font-bold text-slate-900">{f.assignedStaff}</span></div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1ECE5] flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  f.priority === 'High' ? 'bg-rose-50 text-rose-800 border-rose-300' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {f.priority} Priority
                </span>

                {f.status !== 'Completed' && (
                  <button
                    onClick={() => completeFollowup(f.id)}
                    className="px-3.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Completed</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
