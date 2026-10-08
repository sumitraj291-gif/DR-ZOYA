import React, { useState, useEffect } from 'react';
import { useClinic } from '../context/ClinicContext';
import { getAdminProfile, isValidToken } from '../services/api';
import { Shield, Loader } from 'lucide-react';
import { ToastProvider } from './context/ToastContext';
import { AppProvider, useApp } from './context/AppContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminLoginPage } from './pages/AdminLoginPage';

// Pages for All 18 Modules + Website CMS
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Leads } from './pages/Leads';
import { Enquiries } from './pages/Enquiries';
import { Appointments } from './pages/Appointments';
import { CalendarPage } from './pages/Calendar';
import { Patients } from './pages/Patients';
import { Payments } from './pages/Payments';
import { FollowUps } from './pages/FollowUps';
import { Chats } from './pages/Chats';
import { Messages } from './pages/Messages';
import { Treatments } from './pages/Treatments';
import { Services } from './pages/Services';
import { Staff } from './pages/Staff';
import { WebsiteCMS } from './pages/WebsiteCMS';
import { Reviews } from './pages/Reviews';
import { Reports } from './pages/Reports';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';

// Modals & Drawers
import { NewAppointmentModal } from './components/modals/NewAppointmentModal';
import { AppointmentDetailModal } from './components/modals/AppointmentDetailModal';
import { PatientProfileDrawer } from './components/drawers/PatientProfileDrawer';
import { EnquiryDetailDrawer } from './components/drawers/EnquiryDetailDrawer';
import { MessageDetailDrawer } from './components/drawers/MessageDetailDrawer';
import { LeadDetailDrawer } from './components/drawers/LeadDetailDrawer';

const MainContentSwitcher = () => {
  const { activeTab } = useApp();

  switch (activeTab) {
    case 'dashboard':
      return <Dashboard />;
    case 'analytics':
      return <Analytics />;
    case 'leads':
      return <Leads />;
    case 'enquiries':
      return <Enquiries />;
    case 'appointments':
      return <Appointments />;
    case 'calendar':
      return <CalendarPage />;
    case 'patients':
      return <Patients />;
    case 'payments':
      return <Payments />;
    case 'follow-ups':
      return <FollowUps />;
    case 'chats':
      return <Chats />;
    case 'messages':
      return <Messages />;
    case 'treatments':
      return <Treatments />;
    case 'services':
      return <Services />;
    case 'staff':
      return <Staff />;
    case 'website-cms':
      return <WebsiteCMS />;
    case 'reviews':
      return <Reviews />;
    case 'reports':
      return <Reports />;
    case 'notifications':
      return <Notifications />;
    case 'settings':
      return <Settings />;
    default:
      return <Dashboard />;
  }
};

export const AdminApp = () => {
  const { navigateTo } = useClinic();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const storedToken = localStorage.getItem('dna_admin_token');

    if (!isValidToken(storedToken)) {
      // Purge invalid/fake tokens immediately
      localStorage.removeItem('dna_admin_token');
      localStorage.removeItem('dna_admin_user');
      if (isMounted) {
        setIsAuthenticated(false);
        setIsVerifying(false);
      }
      return;
    }

    // Verify stored token with backend /auth/me
    getAdminProfile()
      .then((res) => {
        if (!isMounted) return;
        if (res?.success !== false && (res?.user || res?.data || res?.email)) {
          const userData = res.user || res.data || res;
          localStorage.setItem('dna_admin_user', JSON.stringify(userData));
          setIsAuthenticated(true);
        } else {
          throw new Error(res?.message || 'Authentication check failed.');
        }
      })
      .catch((err) => {
        console.warn('[Admin Security] Stored session invalid or expired:', err.message);
        localStorage.removeItem('dna_admin_token');
        localStorage.removeItem('dna_admin_user');
        if (isMounted) {
          setIsAuthenticated(false);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsVerifying(false);
        }
      });

    const handleUnauthorized = () => {
      if (isMounted) {
        setIsAuthenticated(false);
        setIsVerifying(false);
      }
    };
    window.addEventListener('dna_admin_unauthorized', handleUnauthorized);

    return () => {
      isMounted = false;
      window.removeEventListener('dna_admin_unauthorized', handleUnauthorized);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsVerifying(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('dna_admin_token');
    localStorage.removeItem('dna_admin_user');
    setIsAuthenticated(false);
  };

  // 1. Session verification loading state
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#080C14] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C5A059] to-[#9D7C3A] mb-4 shadow-lg shadow-[#C5A059]/30 flex items-center justify-center">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center space-x-2 text-white font-serif text-lg font-semibold mt-2">
          <Loader className="w-4 h-4 animate-spin text-[#C5A059]" />
          <span>Verifying Secure Session...</span>
        </div>
        <p className="text-[#64748B] text-xs mt-1">Connecting to clinic operations server</p>
      </div>
    );
  }

  // 2. Unauthenticated: require Admin Sign In
  if (!isAuthenticated) {
    return (
      <AdminLoginPage
        onLoginSuccess={handleLoginSuccess}
        onBackToWebsite={() => navigateTo('home')}
      />
    );
  }

  return (
    <ToastProvider>
      <AppProvider onLogout={handleLogout}>
        <AdminLayout onLogout={handleLogout}>
          <MainContentSwitcher />

          {/* Global Modals & Drawers */}
          <NewAppointmentModal />
          <AppointmentDetailModal />
          <PatientProfileDrawer />
          <EnquiryDetailDrawer />
          <MessageDetailDrawer />
          <LeadDetailDrawer />
        </AdminLayout>
      </AppProvider>
    </ToastProvider>
  );
};

export default AdminApp;
