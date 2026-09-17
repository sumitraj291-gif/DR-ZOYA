import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { useToast } from '../context/ToastContext';
import { Building, Calendar, User, Globe, Save } from 'lucide-react';

export const Settings = () => {
  const { clinicInfo, setClinicInfo, adminProfile, setAdminProfile } = useApp();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('clinic');

  // Form states
  const [clinicForm, setClinicForm] = useState(clinicInfo || {});
  const [profileForm, setProfileForm] = useState(adminProfile || {});

  const handleSaveClinic = (e) => {
    e.preventDefault();
    if (setClinicInfo) setClinicInfo(clinicForm);
    addToast('Clinic settings updated successfully');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (setAdminProfile) setAdminProfile(profileForm);
    addToast('Admin profile saved successfully');
  };

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="SYSTEM CONFIGURATION"
        title="Settings"
        subtitle="Manage clinic operating hours, booking rules, admin profiles, and system preferences."
      />

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#E8E2D9] pb-3">
        {[
          { id: 'clinic', label: 'Clinic Information', icon: Building },
          { id: 'booking', label: 'Appointment Rules', icon: Calendar },
          { id: 'profile', label: 'Admin Profile', icon: User },
          { id: 'website', label: 'Website CMS Integration', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

      {/* Clinic Info Tab */}
      {activeTab === 'clinic' && (
        <form onSubmit={handleSaveClinic} className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-6 max-w-2xl">
          <h3 className="font-serif text-2xl font-bold text-obsidian">Clinic Contact & Location</h3>
          
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinic Name</label>
              <input
                type="text"
                value={clinicForm.name || ''}
                onChange={(e) => setClinicForm({ ...clinicForm, name: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={clinicForm.tagline || ''}
                onChange={(e) => setClinicForm({ ...clinicForm, tagline: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Concierge Phone</label>
                <input
                  type="text"
                  value={clinicForm.phone || ''}
                  onChange={(e) => setClinicForm({ ...clinicForm, phone: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={clinicForm.email || ''}
                  onChange={(e) => setClinicForm({ ...clinicForm, email: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Physical Address</label>
              <textarea
                rows={2}
                value={clinicForm.address || ''}
                onChange={(e) => setClinicForm({ ...clinicForm, address: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
          </div>

          <button type="submit" className="btn-gold-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>Save Clinic Changes</span>
          </button>
        </form>
      )}

      {/* Booking Settings Tab */}
      {activeTab === 'booking' && (
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-6 max-w-2xl text-xs">
          <h3 className="font-serif text-2xl font-bold text-obsidian">Appointment Booking Rules</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Default Slot Duration (mins)</label>
              <input type="number" defaultValue={45} className="w-full p-2.5 border rounded-xl max-w-xs" />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Working Operating Hours</label>
              <p className="text-slate-500 mb-2">Mon-Sat: 10:00 AM - 08:00 PM (Prior Appointment Only)</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 font-semibold">
              ✓ Automated WhatsApp confirmation reminders enabled for all booked patients.
            </div>
          </div>
        </div>
      )}

      {/* Admin Profile Tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-6 max-w-2xl text-xs">
          <h3 className="font-serif text-2xl font-bold text-obsidian">Admin Profile & Security</h3>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profileForm.name || ''}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={profileForm.email || ''}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Avatar Image URL</label>
              <input
                type="text"
                value={profileForm.avatar || ''}
                onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
          </div>

          <button type="submit" className="btn-gold-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>Update Profile</span>
          </button>
        </form>
      )}

      {/* Website CMS Tab */}
      {activeTab === 'website' && (
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-4 max-w-2xl text-xs">
          <h3 className="font-serif text-2xl font-bold text-obsidian">Website Integration (CMS / API)</h3>
          <p className="text-slate-600 leading-relaxed">
            The Admin Panel is integrated directly with the live website database and state management.
          </p>
          <div className="p-4 bg-obsidian text-slate-200 rounded-2xl font-mono text-[11px] border border-gold/30">
            CLINIC STATE: Synchronized with localStorage and ClinicContext live.
          </div>
        </div>
      )}
    </div>
  );
};
