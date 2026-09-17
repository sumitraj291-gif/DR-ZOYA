import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { AppProvider, useApp } from './context/AppContext';
import { AdminLayout } from './components/layout/AdminLayout';

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
  return (
    <ToastProvider>
      <AppProvider>
        <AdminLayout>
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
