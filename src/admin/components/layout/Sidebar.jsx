import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  UserCheck,
  Users,
  Clock,
  CalendarDays,
  Calendar,
  CreditCard,
  Sparkles,
  UserCog,
  MessageCircle,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  X,
  Globe,
  SlidersHorizontal,
  Mail,
  HelpCircle,
  Star,
  Layers
} from 'lucide-react';

export const Sidebar = ({ isMobile = false, onLogout }) => {
  const { activeTab, setActiveTab, setMobileMenuOpen, adminProfile, notifications, followups, logout } = useApp();

  const unreadCount = notifications ? notifications.filter((n) => !n.read).length : 0;
  const overdueFollowupsCount = followups ? followups.filter((f) => f.status === 'Due Today' || f.status === 'Overdue').length : 0;

  const navSections = [
    {
      group: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'analytics', label: 'Practice Analytics', icon: BarChart3 },
      ]
    },
    {
      group: 'CRM',
      items: [
        { id: 'leads', label: 'Lead Management', icon: UserCheck },
        { id: 'enquiries', label: 'Patient Enquiries', icon: HelpCircle },
        { id: 'patients', label: 'Patient Records', icon: Users },
        { id: 'follow-ups', label: 'Follow-up Tracker', icon: Clock, badge: overdueFollowupsCount > 0 ? overdueFollowupsCount : null },
      ]
    },
    {
      group: 'Appointments',
      items: [
        { id: 'appointments', label: 'Appointments', icon: CalendarDays },
        { id: 'calendar', label: 'Calendar Schedule', icon: Calendar },
      ]
    },
    {
      group: 'Finance',
      items: [
        { id: 'payments', label: 'Payment Ledger', icon: CreditCard },
      ]
    },
    {
      group: 'Clinic & Catalog',
      items: [
        { id: 'treatments', label: 'Treatments Catalog', icon: Sparkles },
        { id: 'services', label: 'Services & Packages', icon: Layers },
        { id: 'staff', label: 'Staff & RBAC', icon: UserCog },
      ]
    },
    {
      group: 'Communication',
      items: [
        { id: 'chats', label: 'WhatsApp / AI Chat', icon: MessageCircle },
        { id: 'messages', label: 'Messages Inbox', icon: Mail },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
      ]
    },
    {
      group: 'Website CMS',
      items: [
        { id: 'website-cms', label: 'Website Live CMS', icon: SlidersHorizontal },
        { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
        { id: 'reports', label: 'Reports & Export', icon: BarChart3 },
      ]
    },
    {
      group: 'System',
      items: [
        { id: 'settings', label: 'Clinic Settings', icon: Settings },
      ]
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const handleGoToWebsite = () => {
    window.location.href = '/';
  };

  const handleSignOut = () => {
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

  return (
    <aside className="w-64 bg-[#090D14] text-slate-300 flex flex-col h-full border-r border-gold/20 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-gold/20 relative">
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-4 p-1 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center text-obsidian font-serif font-bold text-xl shadow-gold-glow flex-shrink-0">
            Z
          </div>
          <div className="min-w-0">
            <h2 className="font-serif text-lg font-bold tracking-widest text-white leading-none truncate">
              DR. ZOYA
            </h2>
            <p className="text-[9px] font-medium tracking-wider text-gold uppercase mt-1 truncate">
              DNA CLINIC ADMIN
            </p>
          </div>
        </div>

        {/* 1-Click Return to Live Website */}
        <button
          onClick={handleGoToWebsite}
          className="mt-3.5 w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-gold/15 hover:bg-gold/25 border border-gold/40 text-gold text-xs font-bold transition-all"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>🌐 View Live Website</span>
        </button>

        <div className="h-[1px] w-full bg-gradient-to-r from-gold/50 via-gold/20 to-transparent mt-3.5" />
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navSections.map((section) => (
          <div key={section.group}>
            <span className="px-3 text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase">
              {section.group}
            </span>
            <div className="mt-1 space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-gold/15 text-white font-bold border-l-2 border-gold'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isActive ? 'text-gold' : 'text-slate-400 group-hover:text-slate-300'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-gold text-obsidian shadow-sm ml-1 flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Admin Profile Footer */}
      <div className="p-3 border-t border-gold/20 bg-charcoal/40">
        <div className="flex items-center justify-between p-2 rounded-xl bg-charcoal/80 border border-slate-800">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={adminProfile.avatar}
              alt={adminProfile.name}
              className="w-7 h-7 rounded-full object-cover border border-gold/50 flex-shrink-0"
            />
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{adminProfile.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{adminProfile.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setActiveTab('settings')}
              title="Clinic Settings"
              className="p-1.5 rounded-lg text-slate-400 hover:text-gold hover:bg-slate-900 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleSignOut}
              title="Sign Out of Admin"
              className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
