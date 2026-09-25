import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Search,
  Bell,
  User,
  ChevronDown,
  X,
  UserCheck,
  Users,
  Calendar,
  CreditCard,
  Sparkles,
  Globe,
  LogOut
} from 'lucide-react';

export const Topbar = ({ onLogout }) => {
  const {
    activeTab,
    setActiveTab,
    globalSearch,
    setGlobalSearch,
    setMobileMenuOpen,
    adminProfile,
    logout,
    notifications,
    markNotificationRead,
    patients,
    leads,
    appointments,
    payments,
    treatments,
    setSelectedPatient,
    setSelectedLead,
    setSelectedAppointment,
    setSelectedPayment
  } = useApp();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const unreadNotifs = notifications ? notifications.filter((n) => !n.read) : [];

  // Global search multi-entity results
  const getSearchResults = () => {
    if (!globalSearch || !globalSearch.trim()) return [];
    const term = globalSearch.toLowerCase();
    const results = [];

    // Search Patients
    if (patients) {
      patients.forEach((p) => {
        if (p.name.toLowerCase().includes(term) || p.id.toLowerCase().includes(term) || (p.phone && p.phone.includes(term))) {
          results.push({ type: 'Patient', id: p.id, title: p.name, sub: p.phone, item: p });
        }
      });
    }

    // Search Leads
    if (leads) {
      leads.forEach((l) => {
        if (l.name.toLowerCase().includes(term) || l.id.toLowerCase().includes(term) || (l.phone && l.phone.includes(term))) {
          results.push({ type: 'Lead', id: l.id, title: l.name, sub: l.interestedTreatment, item: l });
        }
      });
    }

    // Search Appointments
    if (appointments) {
      appointments.forEach((a) => {
        if (a.patientName.toLowerCase().includes(term) || a.id.toLowerCase().includes(term)) {
          results.push({ type: 'Appointment', id: a.id, title: a.patientName, sub: `${a.treatment || a.service} • ${a.date}`, item: a });
        }
      });
    }

    // Search Payments
    if (payments) {
      payments.forEach((pay) => {
        if (pay.patientName.toLowerCase().includes(term) || pay.id.toLowerCase().includes(term) || (pay.orderId && pay.orderId.toLowerCase().includes(term))) {
          results.push({ type: 'Payment', id: pay.id, title: pay.patientName, sub: `₹${(pay.amount || 0).toLocaleString('en-IN')} (${pay.status})`, item: pay });
        }
      });
    }

    // Search Treatments
    if (treatments) {
      treatments.forEach((t) => {
        if (t.name.toLowerCase().includes(term) || t.id.toLowerCase().includes(term)) {
          results.push({ type: 'Treatment', id: t.id, title: t.name, sub: `₹${(t.price || 0).toLocaleString('en-IN')}`, item: t });
        }
      });
    }

    return results.slice(0, 6);
  };

  const searchResults = getSearchResults();

  const handleResultClick = (result) => {
    setGlobalSearch('');
    setSearchFocused(false);
    if (result.type === 'Patient') {
      if (setSelectedPatient) setSelectedPatient(result.item);
      setActiveTab('patients');
    } else if (result.type === 'Lead') {
      if (setSelectedLead) setSelectedLead(result.item);
      setActiveTab('leads');
    } else if (result.type === 'Appointment') {
      if (setSelectedAppointment) setSelectedAppointment(result.item);
      setActiveTab('appointments');
    } else if (result.type === 'Payment') {
      if (setSelectedPayment) setSelectedPayment(result.item);
      setActiveTab('payments');
    } else if (result.type === 'Treatment') {
      setActiveTab('treatments');
    }
  };

  const handleGoToWebsite = () => {
    window.location.href = '/';
  };

  const handleSignOut = () => {
    setProfileDropdownOpen(false);
    if (onLogout) {
      onLogout();
    } else if (logout) {
      logout();
    } else {
      localStorage.removeItem('dna_admin_token');
      localStorage.removeItem('dna_admin_user');
      window.location.href = '/admin';
    }
  };

  const pageTitles = {
    dashboard: 'Clinic Overview Dashboard',
    analytics: 'Practice Analytics & Insights',
    leads: 'Lead Management CRM',
    enquiries: 'Website Patient Enquiries',
    patients: 'Patient Records & Clinical Files',
    'follow-ups': 'Follow-up Tracker',
    appointments: 'Appointment Management',
    calendar: 'Interactive Schedule Calendar',
    payments: 'Razorpay Payment Ledger',
    treatments: 'Treatment & Procedure Catalog',
    services: 'Services & Packages Management',
    staff: 'Staff Management & RBAC Permissions',
    chats: 'WhatsApp & AI Bot Chat Inbox',
    messages: 'Contact Messages Inbox',
    notifications: 'Notification Stream',
    'website-cms': 'Website Content CMS Editor',
    reviews: 'Patient Reviews Moderation',
    reports: 'Clinical Reports & Data Export',
    settings: 'Clinic Settings & Integrations',
  };

  return (
    <header className="bg-[#090D14] text-white border-b border-gold/30 h-16 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
            {pageTitles[activeTab] || 'Admin Dashboard'}
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Global Search Input & Dropdown */}
        <div className="relative hidden md:block w-64 lg:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Patients, Leads, Bookings..."
            value={globalSearch}
            onFocus={() => setSearchFocused(true)}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full bg-charcoal border border-slate-700/80 rounded-full pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Search Dropdown Results */}
          {searchFocused && globalSearch && (
            <div className="absolute left-0 right-0 mt-2 bg-obsidian border border-gold/30 rounded-2xl shadow-2xl overflow-hidden z-50 animate-modal-in">
              <div className="p-2 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Search Results ({searchResults.length})
              </div>
              <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto">
                {searchResults.length === 0 ? (
                  <p className="p-3 text-xs text-slate-400 text-center">No matching records found.</p>
                ) : (
                  searchResults.map((r, i) => (
                    <div
                      key={i}
                      onClick={() => handleResultClick(r)}
                      className="p-3 hover:bg-charcoal cursor-pointer flex items-center justify-between text-xs transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white">{r.title}</div>
                        <div className="text-[10px] text-slate-400">{r.sub}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${
                        r.type === 'Patient' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                        r.type === 'Lead' ? 'bg-blue-950 text-blue-300 border-blue-800' :
                        r.type === 'Payment' ? 'bg-purple-950 text-purple-300 border-purple-800' :
                        'bg-amber-950 text-amber-300 border-amber-800'
                      }`}>
                        {r.type}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* View Live Website Button */}
        <button
          onClick={handleGoToWebsite}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/40 text-gold text-xs font-bold transition-all"
          title="Return to Public Website"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Website</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setProfileDropdownOpen(false);
            }}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-charcoal transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold animate-pulse" />
            )}
          </button>

          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-obsidian border border-gold/30 rounded-2xl shadow-2xl overflow-hidden z-50 animate-modal-in">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Notifications ({unreadNotifs.length})
                </h4>
                <button
                  onClick={() => {
                    setActiveTab('notifications');
                    setNotifDropdownOpen(false);
                  }}
                  className="text-[10px] text-gold hover:underline font-semibold"
                >
                  View Stream
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/60">
                {notifications && notifications.slice(0, 4).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className="p-3 text-xs hover:bg-charcoal cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-100">{n.title}</span>
                      <span className="text-[9px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{n.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotifDropdownOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-charcoal transition-colors border border-transparent hover:border-slate-800"
          >
            <img
              src={adminProfile.avatar}
              alt={adminProfile.name}
              className="w-7 h-7 rounded-full object-cover border border-gold/50"
            />
            <span className="text-xs font-semibold text-slate-200 hidden lg:inline">
              {adminProfile.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-obsidian border border-gold/30 rounded-2xl shadow-2xl overflow-hidden z-50 animate-modal-in">
              <div className="p-4 border-b border-slate-800 bg-charcoal/50">
                <p className="text-xs font-bold text-white">{adminProfile.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{adminProfile.email}</p>
              </div>
              <div className="p-2 space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-charcoal rounded-xl text-left"
                >
                  <User className="w-3.5 h-3.5 text-gold" />
                  <span>Admin Profile & Settings</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-left transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
