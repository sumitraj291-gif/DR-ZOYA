import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Sparkles, Plus, Search, Tag, Percent, Clock } from 'lucide-react';

export const Treatments = () => {
  const { treatments, toggleTreatmentStatus, addTreatment, isNewTreatmentModalOpen, setIsNewTreatmentModalOpen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const [form, setForm] = useState({
    name: '',
    category: 'Smile Designing',
    price: '',
    discountedPrice: '',
    duration: '45',
    offer: '',
    description: '',
  });

  const filteredTreatments = (treatments || []).filter((t) => {
    return (
      (t.name && t.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.category && t.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    addTreatment({
      ...form,
      price: Number(form.price),
      discountedPrice: Number(form.discountedPrice || form.price),
      duration: Number(form.duration),
    });
    setForm({ name: '', category: 'Smile Designing', price: '', discountedPrice: '', duration: '45', offer: '', description: '' });
  };

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="CLINIC CATALOG"
        title="Treatment Management"
        subtitle="Manage cosmetic dentistry procedures, seasonal special offers, and pricing."
        actionBtn={
          <button
            onClick={() => setIsNewTreatmentModalOpen(true)}
            className="btn-gold-primary px-4 py-2.5 text-xs tracking-wider flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Treatment</span>
          </button>
        }
      />

      {/* Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search treatment name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Grid of Treatment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTreatments.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <Badge status={t.status} />
              </div>

              <span className="text-[10px] font-bold tracking-wider uppercase text-gold">{t.category}</span>
              <h3 className="font-serif text-2xl font-bold text-obsidian mt-0.5 mb-2">{t.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{t.description}</p>

              {t.offer && (
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] font-bold text-amber-900 flex items-center gap-1.5 mb-4">
                  <Tag className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Offer: {t.offer}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 p-3 bg-[#FAF8F5] rounded-2xl border border-[#F1ECE5] text-xs font-semibold">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Standard / Offer Price</span>
                  <div className="flex items-center gap-1.5">
                    {t.discountedPrice < t.price && (
                      <span className="line-through text-slate-400 text-[11px]">₹{(t.price || 0).toLocaleString('en-IN')}</span>
                    )}
                    <span className="font-bold text-obsidian">₹{(t.discountedPrice || t.price || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Duration</span>
                  <span className="text-slate-800">{t.duration} mins</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F1ECE5] flex items-center justify-between">
              <span className="font-mono text-[10px] text-slate-400 font-bold">{t.id}</span>
              <button
                onClick={() => toggleTreatmentStatus(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  t.status === 'Active' ? 'bg-rose-50 text-rose-800 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                {t.status === 'Active' ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Treatment Modal */}
      {isNewTreatmentModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#E8E2D9] shadow-2xl overflow-hidden p-6 animate-modal-in space-y-4 text-xs">
            <h3 className="font-serif text-2xl font-bold text-obsidian">Add New Treatment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Treatment Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Composite Edge Bonding"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  >
                    <option value="Smile Designing">Smile Designing</option>
                    <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                    <option value="Aligners">Aligners</option>
                    <option value="Dental Implants">Dental Implants</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Standard Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="25000"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Offer Price (₹)</label>
                  <input
                    type="number"
                    placeholder="22000"
                    value={form.discountedPrice}
                    onChange={(e) => setForm({ ...form, discountedPrice: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Special Promotional Offer</label>
                <input
                  type="text"
                  placeholder="e.g. 10% Monsoon Discount"
                  value={form.offer}
                  onChange={(e) => setForm({ ...form, offer: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTreatmentModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold-primary px-5 py-2 font-bold">
                  Save Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
