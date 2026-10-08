import React, { Suspense, lazy } from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';
import { BookingModal } from './components/BookingModal';

import { HomePage } from './pages/HomePage';

// Lazy-loaded routes for optimal bundle code-splitting
const TreatmentsPage = lazy(() => import('./pages/TreatmentsPage').then(m => ({ default: m.TreatmentsPage })));
const SmileMakeoverPage = lazy(() => import('./pages/SmileMakeoverPage').then(m => ({ default: m.SmileMakeoverPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const AIAnalyzerPage = lazy(() => import('./pages/AIAnalyzerPage').then(m => ({ default: m.AIAnalyzerPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const BookPage = lazy(() => import('./pages/BookPage').then(m => ({ default: m.BookPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AdminApp = lazy(() => import('./admin/AdminApp').then(m => ({ default: m.AdminApp })));

import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { SEO } from './components/SEO';

const PAGE_META = {
  home: {
    title: 'Luxury Aesthetic Dermatology & Cosmetic Smile Studio',
    description: 'Premier clinic for Aesthetic Dermatology, Cosmetic Dentistry, Invisible Aligners, Laser Treatments, and Facial Rejuvenation in Dehradun & Muzaffarnagar.',
    path: '/'
  },
  treatments: {
    title: 'Aesthetic & Cosmetic Treatments',
    description: 'Explore certified dermatology, skin rejuvenation, hair restoration, and dental aesthetic procedures at DNA Clinics.',
    path: '/treatments'
  },
  'smile-makeover': {
    title: 'Cosmetic Dentistry & Smile Designing',
    description: 'Digital smile design, invisible aligners, ceramic veneers, and laser teeth whitening by expert cosmetic dental specialists.',
    path: '/smile-makeover'
  },
  about: {
    title: 'About Dr. Zoya & Clinical Team',
    description: 'Meet Dr. Zoya Rana and our certified clinical specialists in Dehradun and Muzaffarnagar dedicated to natural aesthetic outcomes.',
    path: '/about'
  },
  'ai-analyzer': {
    title: 'AI Smile & Skin Analyzer',
    description: 'Experience preliminary AI-powered facial symmetry, skin texture assessment, and smile makeover simulation.',
    path: '/ai-analyzer'
  },
  gallery: {
    title: 'Cases & Transformations Gallery',
    description: 'Documented before-and-after smile designing, acne revision, hair restoration, and clinical outcomes at DNA Clinics.',
    path: '/gallery'
  },
  book: {
    title: 'Book an Appointment',
    description: 'Schedule a clinical consultation with Dr. Zoya Rana and specialist doctors at our Dehradun or Muzaffarnagar clinic.',
    path: '/book'
  },
  contact: {
    title: 'Contact & Clinic Locations',
    description: 'Get clinic addresses, telephone numbers, WhatsApp contact, and operating hours for Dr. Zoya DNA Clinics.',
    path: '/contact'
  },
  admin: {
    title: 'Clinical Operations Portal',
    description: 'Authorized clinical portal',
    path: '/admin',
    noindex: true
  }
};

const LuxuryLoadingFallback = ({ message = 'Loading experience...' }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
    <div className="relative flex items-center justify-center w-14 h-14 mb-4">
      <div className="absolute inset-0 rounded-full border-2 border-[#C5A059]/20 border-t-[#C5A059] animate-spin" />
      <div className="w-9 h-9 rounded-full bg-[#090D14] flex items-center justify-center text-xs font-serif font-bold text-[#C5A059]">
        Z
      </div>
    </div>
    <span className="text-xs font-serif tracking-widest text-[#9A7736] uppercase font-semibold">
      {message}
    </span>
  </div>
);

const AdminLoadingFallback = () => (
  <div className="min-h-screen bg-[#080C14] flex flex-col items-center justify-center p-8">
    <div className="relative flex items-center justify-center w-16 h-16 mb-4">
      <div className="absolute inset-0 rounded-full border-2 border-[#C5A059]/25 border-t-[#C5A059] animate-spin" />
      <div className="w-10 h-10 rounded-full bg-[#0D131F] flex items-center justify-center text-xs font-serif font-bold text-[#C5A059]">
        Z
      </div>
    </div>
    <span className="text-xs font-serif tracking-widest text-[#C5A059] uppercase font-semibold">
      Securing Clinical Portal...
    </span>
  </div>
);

const PageContent = () => {
  const { activePage, toastMessage } = useClinic();
  const currentMeta = PAGE_META[activePage] || PAGE_META.home;

  // Full-screen dedicated workspace for Admin CRM & CMS portal (lazy-loaded outside public bundle)
  if (activePage === 'admin') {
    return (
      <>
        <SEO {...PAGE_META.admin} />
        <Suspense fallback={<AdminLoadingFallback />}>
          <AdminApp />
        </Suspense>
      </>
    );
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
    <div className="flex flex-col min-h-screen relative selection:bg-[#C5A059] selection:text-white overflow-x-hidden">
      <SEO {...currentMeta} />
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
        <Suspense fallback={<LuxuryLoadingFallback />}>
          {renderActivePage()}
        </Suspense>
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

