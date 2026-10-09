import React, { useState, useEffect } from 'react';
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
  Image as ImageIcon,
  RefreshCw,
  Loader,
  Users,
  Edit3,
  Check
} from 'lucide-react';

export const WebsiteCMS = () => {
  const {
    clinicData,
    updateProfile,
    updateHero,
    addGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
    syncClinicDataFromServer,
    showToast,
    updateDoctor,
    addDoctor,
    deleteDoctor
  } = useClinic();

  const [cmsTab, setCmsTab] = useState('profile'); // profile, hero, gallery, doctors
  const [editingDocId, setEditingDocId] = useState(null);
  const [docForm, setDocForm] = useState({});
  const [savingDoc, setSavingDoc] = useState(false);

  const [profileForm, setProfileForm] = useState(clinicData?.profile || {});
  const [heroForm, setHeroForm] = useState(clinicData?.hero || {});
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingHero, setSavingHero] = useState(false);
  const [savingGallery, setSavingGallery] = useState(false);
  const [syncingServer, setSyncingServer] = useState(false);

  // Synchronize local form inputs when clinicData updates from server
  useEffect(() => {
    if (clinicData?.profile) setProfileForm(clinicData.profile);
    if (clinicData?.hero) setHeroForm(clinicData.hero);
  }, [clinicData]);

  // Gallery New Item State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Smile');
  const [newGalleryType, setNewGalleryType] = useState('before_after');
  const [newGalleryBefore, setNewGalleryBefore] = useState('/images/ba_smile_before.png');
  const [newGalleryAfter, setNewGalleryAfter] = useState('/images/ba_smile_after.png');
  const [newGalleryDescription, setNewGalleryDescription] = useState('');

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await updateProfile(profileForm);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleHeroSave = async (e) => {
    e.preventDefault();
    setSavingHero(true);
    try {
      await updateHero(heroForm);
    } finally {
      setSavingHero(false);
    }
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!newGalleryTitle.trim()) return;
    setSavingGallery(true);
    try {
      const ok = await addGalleryItem({
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
      if (ok) {
        setNewGalleryTitle('');
        setNewGalleryDescription('');
      }
    } finally {
      setSavingGallery(false);
    }
  };

  const handleSyncServer = async () => {
    setSyncingServer(true);
    try {
      await syncClinicDataFromServer();
    } finally {
      setSyncingServer(false);
    }
  };

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="WEBSITE MANAGEMENT"
        title="Website Live CMS"
        subtitle="Directly modify public website content, hero tagline, contact phone numbers, and before/after gallery showcase."
        actionBtn={
          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncServer}
              disabled={syncingServer}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-[#E8E2D9] text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
              title="Sync latest CMS data from backend"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncingServer ? 'animate-spin text-gold' : ''}`} />
              <span>{syncingServer ? 'Syncing...' : 'Sync Server'}</span>
            </button>
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Website Defaults</span>
            </button>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E2D9]">
        {[
          { id: 'profile', label: 'Clinic Profile & Contacts', icon: FileText },
          { id: 'doctors', label: 'Doctors & Specialists', icon: Users },
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

          <button
            type="submit"
            disabled={savingProfile}
            className="btn-gold-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2 disabled:opacity-60"
          >
            {savingProfile ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{savingProfile ? 'Publishing...' : 'Publish Live Identity'}</span>
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

          <button
            type="submit"
            disabled={savingHero}
            className="btn-gold-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2 disabled:opacity-60"
          >
            {savingHero ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{savingHero ? 'Publishing...' : 'Publish Hero Banner'}</span>
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

            <button
              type="submit"
              disabled={savingGallery}
              className="btn-gold-primary px-5 py-2 font-bold flex items-center gap-1.5 disabled:opacity-60"
            >
              {savingGallery ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>{savingGallery ? 'Adding...' : 'Add to Live Showcase'}</span>
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

      {/* Doctors & Specialists CMS */}
      {cmsTab === 'doctors' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-obsidian">Medical Specialists & Doctors Panel</h3>
              <p className="text-xs text-slate-500">Live roster of licensed specialists featured on the homepage and about page.</p>
            </div>
            <div className="text-xs bg-amber-50 text-amber-800 font-semibold px-3 py-1.5 rounded-xl border border-amber-200">
              {clinicData?.profile?.team?.length || 0} Certified Doctors Listed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(clinicData?.profile?.team || []).map((doc) => {
              const isEditing = editingDocId === doc.id;
              return (
                <div key={doc.id} className="bg-white rounded-2xl border border-[#E8E2D9] p-5 shadow-sm space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative border border-[#E8E2D9]">
                      <img src={isEditing ? (docForm.image || doc.image) : doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {doc.role}
                        </span>
                        {!isEditing ? (
                          <button
                            onClick={() => {
                              setEditingDocId(doc.id);
                              setDocForm({ ...doc });
                            }}
                            className="text-xs font-semibold text-gold hover:text-amber-700 flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingDocId(null)}
                            className="text-xs text-slate-400 hover:text-slate-600"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                      <h4 className="font-serif text-base font-bold text-obsidian mt-1">{doc.name}</h4>
                      <p className="text-xs text-[#85611E] font-medium truncate">{doc.qualification}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{doc.specialty}</p>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="pt-3 border-t border-[#F1ECE5] space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Doctor Name</label>
                        <input
                          type="text"
                          value={docForm.name || ''}
                          onChange={(e) => setDocForm({ ...docForm, name: e.target.value })}
                          className="w-full p-2 border rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Role / Designation</label>
                          <input
                            type="text"
                            value={docForm.role || ''}
                            onChange={(e) => setDocForm({ ...docForm, role: e.target.value })}
                            className="w-full p-2 border rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Specialty Focus</label>
                          <input
                            type="text"
                            value={docForm.specialty || ''}
                            onChange={(e) => setDocForm({ ...docForm, specialty: e.target.value })}
                            className="w-full p-2 border rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Medical Degrees & Qualifications</label>
                        <input
                          type="text"
                          value={docForm.qualification || ''}
                          onChange={(e) => setDocForm({ ...docForm, qualification: e.target.value })}
                          className="w-full p-2 border rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Photo URL</label>
                        <input
                          type="text"
                          value={docForm.image || ''}
                          onChange={(e) => setDocForm({ ...docForm, image: e.target.value })}
                          className="w-full p-2 border rounded-xl font-mono text-[11px]"
                        />
                      </div>

                      {/* Photo quick selector if Dr. Nasida */}
                      {doc.id === 'doc-4' && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[11px] text-slate-500">Quick Photo:</span>
                          <button
                            type="button"
                            onClick={() => setDocForm({ ...docForm, image: '/images/dr_nasida_fathima.jpg' })}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${docForm.image === '/images/dr_nasida_fathima.jpg' ? 'bg-obsidian text-white border-obsidian' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                          >
                            Formal Blazer
                          </button>
                          <button
                            type="button"
                            onClick={() => setDocForm({ ...docForm, image: '/images/dr_nasida_fathima_scrubs.jpg' })}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${docForm.image === '/images/dr_nasida_fathima_scrubs.jpg' ? 'bg-obsidian text-white border-obsidian' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                          >
                            OT Scrubs
                          </button>
                        </div>
                      )}

                      {/* Photo quick selector if Dr. Rohan */}
                      {doc.id === 'doc-5' && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[11px] text-slate-500">Quick Photo:</span>
                          <button
                            type="button"
                            onClick={() => setDocForm({ ...docForm, image: '/images/dr_rohan_portrait.jpg' })}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${docForm.image === '/images/dr_rohan_portrait.jpg' ? 'bg-obsidian text-white border-obsidian' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                          >
                            Portrait
                          </button>
                          <button
                            type="button"
                            onClick={() => setDocForm({ ...docForm, image: '/images/dr_rohan_goel.jpg' })}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${docForm.image === '/images/dr_rohan_goel.jpg' ? 'bg-obsidian text-white border-obsidian' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                          >
                            Spain Fellowship
                          </button>
                          <button
                            type="button"
                            onClick={() => setDocForm({ ...docForm, image: '/images/dr_rohan_goel_ot.jpg' })}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${docForm.image === '/images/dr_rohan_goel_ot.jpg' ? 'bg-obsidian text-white border-obsidian' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                          >
                            OT Surgery
                          </button>
                        </div>
                      )}

                      {/* Photo quick selector if Dr. Amit */}
                      {doc.id === 'doc-6' && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[11px] text-slate-500">Quick Photo:</span>
                          <button
                            type="button"
                            onClick={() => setDocForm({ ...docForm, image: '/images/dr_amit_portrait.jpg' })}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${docForm.image === '/images/dr_amit_portrait.jpg' ? 'bg-obsidian text-white border-obsidian' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                          >
                            Portrait
                          </button>
                          <button
                            type="button"
                            onClick={() => setDocForm({ ...docForm, image: '/images/dr_amit_agarrwal.jpg' })}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${docForm.image === '/images/dr_amit_agarrwal.jpg' ? 'bg-obsidian text-white border-obsidian' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                          >
                            Clinical Banner
                          </button>
                          <button
                            type="button"
                            onClick={() => setDocForm({ ...docForm, image: '/images/dr_amit_agarrwal_clinic.jpg' })}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${docForm.image === '/images/dr_amit_agarrwal_clinic.jpg' ? 'bg-obsidian text-white border-obsidian' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                          >
                            Dental Suite
                          </button>
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          disabled={savingDoc}
                          onClick={async () => {
                            setSavingDoc(true);
                            try {
                              await updateDoctor(doc.id, docForm);
                              setEditingDocId(null);
                            } finally {
                              setSavingDoc(false);
                            }
                          }}
                          className="btn-gold-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 disabled:opacity-60"
                        >
                          {savingDoc ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          <span>{savingDoc ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
