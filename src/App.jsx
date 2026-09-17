import React from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';
import { BookingModal } from './components/BookingModal';

import { HomePage } from './pages/HomePage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { SmileMakeoverPage } from './pages/SmileMakeoverPage';
import { AboutPage } from './pages/AboutPage';
import { AIAnalyzerPage } from './pages/AIAnalyzerPage';
import { GalleryPage } from './pages/GalleryPage';
import { BookPage } from './pages/BookPage';
import { ContactPage } from './pages/ContactPage';
import { AdminApp } from './admin/AdminApp';

import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

const PageContent = () => {
  const { activePage, toastMessage } = useClinic();

  // Full-screen dedicated workspace for Admin CRM & CMS portal
  if (activePage === 'admin') {
    return <AdminApp />;
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'treatments':
        return <TreatmentsPage />;
      case 'smile-makeover':
        return <SmileMakeoverPage />;
      case 'about':
        return <AboutPage />;
      case 'ai-analyzer':
        return <AIAnalyzerPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'book':
        return <BookPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#C5A059] selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 modal-enter">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center space-x-2 text-xs font-semibold ${
            toastMessage.type === 'error'
              ? 'bg-red-50 text-red-800 border-red-200'
              : toastMessage.type === 'info'
              ? 'bg-blue-50 text-blue-800 border-blue-200'
              : 'bg-[#090D14] text-white border-[#C5A059]'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      <Navbar />
      
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      <Footer />
      
      {/* Interactive Phase 2 Elements */}
      <FloatingWidgets />
      <BookingModal />
    </div>
  );
};

export default function App() {
  return (
    <ClinicProvider>
      <PageContent />
    </ClinicProvider>
  );
}

