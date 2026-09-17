import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { PageHeader } from '../components/common/PageHeader';
import {
  SlidersHorizontal,
  FileText,
  Save,
  RotateCcw,
  Sparkles,
  Camera,
  Layers,
  Star,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export const WebsiteCMS = () => {
  const {
    clinicData,
    updateProfile,
    updateHero,
    addGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
    showToast
  } = useClinic();

  const [cmsTab, setCmsTab] = useState('profile'); // profile, hero, gallery, testimonials

  const [profileForm, setProfileForm] = useState(clinicData?.profile || {});
  const [heroForm, setHeroForm] = useState(clinicData?.hero || {});

  // Gallery New Item State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Smile');
  const [newGalleryType, setNewGalleryType] = useState('before_after');
  const [newGalleryBefore, setNewGalleryBefore] = useState('/images/ba_smile_before.png');
  const [newGalleryAfter, setNewGalleryAfter] = useState('/images/ba_smile_after.png');
  const [newGalleryDescription, setNewGalleryDescription] = useState('');

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  const handleHeroSave = (e) => {
    e.preventDefault();
    updateHero(heroForm);
  };

  const handleAddGallery = (e) => {
    e.preventDefault();
    if (!newGalleryTitle.trim()) return;
    addGalleryItem({
      title: newGalleryTitle,
      category: newGalleryCategory,
      type: newGalleryType,
      beforeImage: newGalleryBefore,
      afterImage: newGalleryAfter,
      singleImage: newGalleryAfter,
      procedure: newGalleryTitle,
      timeframe: '2 Visits / 7 Days',
      doctorNotes: newGalleryDescription || 'Completed at DNA Clinic',
      tags: [newGalleryCategory, 'Aesthetics']
    });
    setNewGalleryTitle('');
    setNewGalleryDescription('');
  };

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="WEBSITE MANAGEMENT"
        title="Website Live CMS"
        subtitle="Directly modify public website content, hero tagline, contact phone numbers, and before/after gallery showcase."
        actionBtn={
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Website Defaults</span>
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E2D9]">
        {[
          { id: 'profile', label: 'Clinic Profile & Contacts', icon: FileText },
          { id: 'hero', label: 'Hero Header Banner', icon: Sparkles },
          { id: 'gallery', label: 'Before & After Gallery', icon: Camera },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = cmsTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCmsTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                isActive
                  ? 'bg-obsidian text-white shadow-md'
                  : 'bg-white text-slate-600 border border-[#E8E2D9] hover:bg-[#FAF8F5]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Profile Form */}
      {cmsTab === 'profile' && (
        <form onSubmit={handleProfileSave} className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-6 max-w-2xl text-xs">
          <div className="flex items-center justify-between border-b border-[#F1ECE5] pb-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-obsidian">Main Website Identity</h3>
              <p className="text-slate-500">Live details reflected immediately across all website header & footer sections.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Doctor Name / Title</label>
              <input
                type="text"
                value={profileForm?.name || ''}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Professional Tagline</label>
              <input
                type="text"
                value={profileForm?.tagline || ''}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reception Phone</label>
                <input
                  type="text"
                  value={profileForm?.contact?.phone || ''}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    contact: { ...profileForm.contact, phone: e.target.value }
                  })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">WhatsApp Hotline</label>
                <input
                  type="text"
                  value={profileForm?.contact?.whatsapp || ''}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    contact: { ...profileForm.contact, whatsapp: e.target.value }
                  })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Operating Hours</label>
              <input
                type="text"
                value={profileForm?.contact?.timings || ''}
                onChange={(e) => setProfileForm({
                  ...profileForm,
                  contact: { ...profileForm.contact, timings: e.target.value }
                })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
          </div>

          <button type="submit" className="btn-gold-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>Publish Live Identity</span>
          </button>
        </form>
      )}

      {/* Hero Form */}
      {cmsTab === 'hero' && (
        <form onSubmit={handleHeroSave} className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-6 max-w-2xl text-xs">
          <div className="flex items-center justify-between border-b border-[#F1ECE5] pb-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-obsidian">Homepage Hero Banner</h3>
              <p className="text-slate-500">Main headline, luxury badges, and subheading on the landing page.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hero Super-Badge</label>
              <input
                type="text"
                value={heroForm?.badge || ''}
                onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Main Heading</label>
              <input
                type="text"
                value={heroForm?.title || ''}
                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gold Highlighted Subtitle</label>
              <input
                type="text"
                value={heroForm?.highlight || ''}
                onChange={(e) => setHeroForm({ ...heroForm, highlight: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Editorial Description Paragraph</label>
              <textarea
                rows={3}
                value={heroForm?.description || ''}
                onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
          </div>

          <button type="submit" className="btn-gold-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>Publish Hero Banner</span>
          </button>
        </form>
      )}

      {/* Gallery CMS */}
      {cmsTab === 'gallery' && (
        <div className="space-y-6">
          {/* Add Gallery Item Card */}
          <form onSubmit={handleAddGallery} className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-4 max-w-2xl text-xs">
            <h3 className="font-serif text-xl font-bold text-obsidian">Add New Before & After Transformation</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Transformation Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 8 Unit Ceramic Smile Makeover"
                  value={newGalleryTitle}
                  onChange={(e) => setNewGalleryTitle(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newGalleryCategory}
                  onChange={(e) => setNewGalleryCategory(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                >
                  <option value="Smile">Smile Makeover</option>
                  <option value="Skin">Clinical Dermatology</option>
                  <option value="Hair">Hair Restoration</option>
                  <option value="Laser">Laser Aesthetics</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Before Image URL</label>
                <input
                  type="text"
                  value={newGalleryBefore}
                  onChange={(e) => setNewGalleryBefore(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">After Image URL</label>
                <input
                  type="text"
                  value={newGalleryAfter}
                  onChange={(e) => setNewGalleryAfter(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinical Notes</label>
              <textarea
                rows={2}
                placeholder="Doctor explanation of procedure..."
                value={newGalleryDescription}
                onChange={(e) => setNewGalleryDescription(e.target.value)}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <button type="submit" className="btn-gold-primary px-5 py-2 font-bold flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Add to Live Showcase</span>
            </button>
          </form>

          {/* Current Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(clinicData?.gallery || []).slice(0, 9).map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3 relative">
                    <img
                      src={item.afterImage || item.singleImage || item.beforeImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-obsidian/80 text-gold text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-obsidian text-xs line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{item.doctorNotes}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#F1ECE5] flex justify-end">
                  <button
                    onClick={() => deleteGalleryItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove from showcase"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
