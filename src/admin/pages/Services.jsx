import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import {
  Sparkles,
  Plus,
  Clock,
  Search,
} from 'lucide-react';

export const Services = () => {
  const { treatments, toggleTreatmentStatus, addTreatment, isNewTreatmentModalOpen, setIsNewTreatmentModalOpen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const services = treatments || [];

  const filteredServices = services.filter((srv) => {
    return (
      (srv.name && srv.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (srv.category && srv.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="WEBSITE & CLINIC MANAGEMENT"
        title="Services Catalog"
        subtitle="Configure clinic treatment offerings, consultation durations, pricing, and active online availability."
        actionBtn={
          <button
            onClick={() => setIsNewTreatmentModalOpen(true)}
            className="btn-gold-primary px-4 py-2.5 text-xs tracking-wider flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Service</span>
          </button>
        }
      />

      {/* Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search service name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Grid of Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <Badge status={srv.status} />
              </div>

              <span className="text-[10px] font-bold tracking-wider uppercase text-gold">
                {srv.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-obsidian mt-0.5 mb-2">
                {srv.name}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                {srv.description}
              </p>

              <div className="grid grid-cols-2 gap-2 p-3 bg-[#FAF8F5] rounded-2xl border border-[#F1ECE5] text-xs font-semibold">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Price</span>
                  <span className="font-bold text-obsidian">₹{(srv.price || 0).toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Duration</span>
                  <span className="text-slate-800">{srv.duration} mins</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F1ECE5] flex items-center justify-between">
              <span className="font-mono text-[10px] text-slate-400 font-bold">{srv.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTreatmentStatus(srv.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    srv.status === 'Active'
                      ? 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {srv.status === 'Active' ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
