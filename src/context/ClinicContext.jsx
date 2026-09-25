import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialClinicData, initialSeedAppointments } from '../data/defaultClinicData';
import {
  fetchClinicData,
  submitContactInquiry,
  submitBookingLead,
  submitWhatsAppBotLead,
  updateDoctorOnServer,
  addDoctorOnServer,
  deleteDoctorOnServer,
  updateClinicProfile as updateClinicProfileAPI,
  updateHeroSection as updateHeroSectionAPI,
} from '../services/api';

const ClinicContext = createContext();

const CLINIC_STORAGE_KEY = 'dna_clinic_live_data_v2026_gallery_v5';
const APPOINTMENTS_STORAGE_KEY = 'dna_clinic_appointments_v2026';

const VALID_PAGES = ['home', 'treatments', 'smile-makeover', 'about', 'ai-analyzer', 'gallery', 'book', 'contact', 'admin'];

const getPageFromLocation = () => {
  // 1. Direct path check (e.g. /about, /admin)
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (VALID_PAGES.includes(pathname)) {
    return pathname;
  }

  // 2. Legacy hash check (e.g. /#/about or #/about)
  if (window.location.hash) {
    const hashClean = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
    if (VALID_PAGES.includes(hashClean)) {
      const targetPath = hashClean === 'home' ? '/' : `/${hashClean}`;
      window.history.replaceState(null, '', targetPath);
      return hashClean;
    }
  }

  return 'home';
};

export const ClinicProvider = ({ children }) => {
  // 1. Persistent Clinic Content Data (CMS)
  const [clinicData, setClinicData] = useState(() => {
    try {
      // Purge all legacy v1 and old cache from browser
      localStorage.removeItem('dr_zoya_clinic_data_v1');
      localStorage.removeItem('dna_clinic_live_data_v2026_march');
      
      const saved = localStorage.getItem(CLINIC_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure the cache is the authentic DNA Clinic India data with real contact (+91 63953 77355)
        if (parsed?.profile?.contact?.phone?.includes('63953')) {
          if (!parsed.gallery || parsed.gallery.length < 20) {
            parsed.gallery = initialClinicData.gallery;
          }
          if (!parsed.profile?.team || parsed.profile.team.length === 0) {
            parsed.profile = {
              ...(parsed.profile || initialClinicData.profile),
              team: initialClinicData.profile.team
            };
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading clinic data from localStorage:', e);
    }
    return initialClinicData;
  });

  // 2. Persistent Appointments & Leads (CRM)
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading appointments from localStorage:', e);
    }
    return initialSeedAppointments;
  });

  // 3. Navigation State (Clean path router with back/forward history support)
  const [activePage, setActivePage] = useState(() => getPageFromLocation());

  // 4. Modal & Widget States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState(null);
  const [whatsAppBotOpen, setWhatsAppBotOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [backendLoaded, setBackendLoaded] = useState(false);

  // ── Fetch from backend on app load (non-blocking, graceful fallback) ────────
  useEffect(() => {
    if (backendLoaded) return;
    fetchClinicData()
      .then(res => {
        if (!res?.data) return;
        const { settings, team, treatments, testimonials } = res.data;
        if (!settings) return;

        // Build profile from backend settings + team
        const backendProfile = {
          clinicName: settings.clinicName,
          brandAlias: settings.brandAlias || 'Dr. Zoya\'s DNA Clinic India',
          tagline: settings.tagline || '',
          doctorName: settings.doctorName,
          doctorTitle: settings.doctorTitle,
          doctorRole: settings.doctorRole,
          doctorBio: settings.doctorBio,
          doctorExperienceYears: settings.doctorExperienceYears || 12,
          patientCount: settings.patientCount || '15,000+',
          rating: settings.rating || '4.9',
          reviewCount: settings.reviewCount || '1,240+',
          instagram: settings.instagram || 'https://www.instagram.com/dnaclinicindia/',
          instagramHandle: settings.instagramHandle || '@dnaclinicindia',
          certifications: settings.certifications || [],
          whyChooseUs: settings.whyChooseUs || [],
          contact: {
            phone: settings.phone,
            altPhone: settings.altPhone || settings.phone,
            whatsapp: settings.whatsapp,
            email: settings.email,
            address: settings.address,
            dehradunAddress: settings.dehradunAddress || '',
            muzaffarnagarAddress: settings.muzaffarnagarAddress || '',
            timings: settings.timings,
            emergencyHelpline: settings.phone,
          },
          team: (team || []).filter(d => d.isActive !== false),
        };

        const backendHero = {
          badge: settings.heroBadge,
          titlePrimary: settings.heroTitlePrimary,
          titleHighlight: settings.heroTitleHighlight,
          description: settings.heroDescription,
          stats: settings.heroStats || [],
        };

        const backendTreatments = (treatments || []).map(t => ({
          id: t.slug || t.id,
          _serverId: t.id,
          title: t.title,
          category: t.category,
          subCategory: t.subCategory || '',
          duration: t.duration,
          price: t.priceDisplay,
          advanceFee: t.advanceFee,
          description: t.description,
          benefits: t.benefits || [],
          isPopular: t.isPopular,
          image: t.imageUrl || '/images/advanced_facials.png',
        }));

        const backendTestimonials = (testimonials || []).map(t => ({
          id: t.id,
          name: t.patientName,
          location: t.location,
          verifiedProcedure: t.verifiedProcedure,
          rating: t.rating,
          date: t.reviewDate,
          text: t.reviewText,
        }));

        setClinicData(prev => ({
          ...prev,
          profile: backendProfile,
          hero: backendHero,
          treatments: backendTreatments.length > 0 ? backendTreatments : prev.treatments,
          testimonials: backendTestimonials.length > 0 ? backendTestimonials : prev.testimonials,
          gallery: (res.data.gallery?.length > 0) ? res.data.gallery : prev.gallery,
        }));

        setBackendLoaded(true);
        console.log('[DNA Clinic] ✅ Backend data synced successfully.');
      })
      .catch(err => {
        console.warn('[DNA Clinic] ⚠️ Backend unavailable, using cached/default data.', err.message);
      });
  }, []);

  // Sync clinicData changes to localStorage
  useEffect(() => {
    try {
      // Clean legacy keys
      localStorage.removeItem('dr_zoya_clinic_data_v1');
      localStorage.setItem(CLINIC_STORAGE_KEY, JSON.stringify(clinicData));
    } catch (e) {
      console.error('Error saving clinic data:', e);
    }
  }, [clinicData]);

  // Sync appointments changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
    } catch (e) {
      console.error('Error saving appointments:', e);
    }
  }, [appointments]);

  // Listen to browser URL navigation (popstate for history & hashchange for legacy)
  useEffect(() => {
    const handleLocationChange = () => {
      const page = getPageFromLocation();
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (page, data = null) => {
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState({ page }, '', targetPath);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (data?.treatment) {
      setPreselectedTreatment(data.treatment);
    }
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // CMS Mutators
  const updateProfile = (updatedProfile) => {
    setClinicData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updatedProfile }
    }));
    showToast('Clinic Profile & Contact details updated successfully!');
  };

  const updateHero = (updatedHero) => {
    setClinicData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...updatedHero }
    }));
    showToast('Hero section content updated!');
  };

  const addTreatment = (newTreatment) => {
    setClinicData(prev => ({
      ...prev,
      treatments: [newTreatment, ...prev.treatments]
    }));
    showToast(`Treatment "${newTreatment.title}" added to catalog!`);
  };

  const updateTreatment = (id, updatedFields) => {
    setClinicData(prev => ({
      ...prev,
      treatments: prev.treatments.map(item => item.id === id ? { ...item, ...updatedFields } : item)
    }));
    showToast('Treatment details updated successfully!');
  };

  const deleteTreatment = (id) => {
    setClinicData(prev => ({
      ...prev,
      treatments: prev.treatments.filter(item => item.id !== id)
    }));
    showToast('Treatment removed from catalog.');
  };

  const updateTestimonial = (id, updatedFields) => {
    setClinicData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(item => item.id === id ? { ...item, ...updatedFields } : item)
    }));
    showToast('Testimonial updated!');
  };

  const addTestimonial = (newReview) => {
    setClinicData(prev => ({
      ...prev,
      testimonials: [newReview, ...prev.testimonials]
    }));
    showToast('New patient review added!');
  };

  const deleteTestimonial = (id) => {
    setClinicData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(item => item.id !== id)
    }));
    showToast('Patient review deleted.');
  };

  // Gallery & Media CMS Mutators
  const addGalleryItem = (newItem) => {
    const item = {
      id: `gal-${Date.now()}`,
      ...newItem
    };
    setClinicData(prev => ({
      ...prev,
      gallery: [item, ...(prev.gallery || [])]
    }));
    showToast('New gallery media added!');
    return item;
  };

  const updateGalleryItem = (id, updatedFields) => {
    setClinicData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).map(item => item.id === id ? { ...item, ...updatedFields } : item)
    }));
    showToast('Gallery item updated successfully!');
  };

  const deleteGalleryItem = (id) => {
    setClinicData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter(item => item.id !== id)
    }));
    showToast('Gallery item removed from clinic showcase.');
  };

  // Doctors Team CMS Mutators
  const updateDoctor = (id, updatedFields) => {
    setClinicData(prev => {
      const currentTeam = prev.profile?.team || [];
      const updatedTeam = currentTeam.map(doc => doc.id === id ? { ...doc, ...updatedFields } : doc);
      
      let updatedProfile = { ...prev.profile, team: updatedTeam };
      
      // If lead doctor is updated, sync lead profile credentials
      const updatedDoc = updatedTeam.find(d => d.id === id);
      if (updatedDoc && (updatedDoc.id === 'doc-1' || updatedFields.isLead || updatedDoc.role?.toLowerCase().includes('director') || updatedDoc.role?.toLowerCase().includes('founder'))) {
        updatedProfile.doctorName = updatedDoc.name;
        if (updatedDoc.qualification) updatedProfile.doctorTitle = updatedDoc.qualification;
        if (updatedDoc.role) updatedProfile.doctorRole = updatedDoc.role;
        if (updatedDoc.image) updatedProfile.doctorImage = updatedDoc.image;
        if (updatedDoc.bio) updatedProfile.doctorBio = updatedDoc.bio;
      }

      return {
        ...prev,
        profile: updatedProfile
      };
    });
    // Sync to backend silently
    updateDoctorOnServer(id, updatedFields).catch(err => console.warn('[API] updateDoctor failed:', err.message));
    showToast('Doctor details and photo updated! Changes are live on the website.');
  };

  const addDoctor = (newDoctor) => {
    const doc = {
      id: `doc-${Date.now()}`,
      name: newDoctor.name || 'New Doctor',
      role: newDoctor.role || 'Specialist',
      qualification: newDoctor.qualification || 'Certified Practitioner',
      specialty: newDoctor.specialty || 'Clinical Aesthetics',
      image: newDoctor.image || '/images/dr_zoya_rana.png',
      location: newDoctor.location || 'Dehradun & Muzaffarnagar Clinics',
      ...newDoctor
    };
    setClinicData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        team: [...(prev.profile?.team || []), doc]
      }
    }));
    // Sync to backend silently
    addDoctorOnServer(doc).catch(err => console.warn('[API] addDoctor failed:', err.message));
    showToast(`Doctor "${doc.name}" added to specialist panel!`);
    return doc;
  };

  const deleteDoctor = (id) => {
    setClinicData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        team: (prev.profile?.team || []).filter(doc => doc.id !== id)
      }
    }));
    // Sync to backend silently
    deleteDoctorOnServer(id).catch(err => console.warn('[API] deleteDoctor failed:', err.message));
    showToast('Doctor removed from specialist panel.');
  };

  const updateDoctorTeam = (newTeam) => {
    setClinicData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        team: newTeam
      }
    }));
    showToast('Doctors panel updated successfully!');
  };

  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all CMS content to original clinic defaults? Any custom edits will be reverted.")) {
      setClinicData(initialClinicData);
      setAppointments(initialSeedAppointments);
      localStorage.removeItem('dr_zoya_clinic_data_v1');
      localStorage.removeItem('dr_zoya_appointments_v1');
      localStorage.removeItem(CLINIC_STORAGE_KEY);
      localStorage.removeItem(APPOINTMENTS_STORAGE_KEY);
      showToast('All clinic data reset to official defaults.', 'info');
    }
  };

  // CRM Appointment Mutators
  const addAppointment = (newAppointment) => {
    const record = {
      id: `APT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'New',
      ...newAppointment
    };
    setAppointments(prev => [record, ...prev]);
    return record;
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
    showToast(`Appointment status changed to ${newStatus}`);
  };

  const deleteAppointment = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
    showToast('Lead/Appointment record deleted.');
  };

  const openBookingModal = (treatment = null) => {
    setPreselectedTreatment(treatment);
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setPreselectedTreatment(null);
  };

  const toggleWhatsAppBot = () => {
    setWhatsAppBotOpen(prev => !prev);
  };

  return (
    <ClinicContext.Provider
      value={{
        clinicData,
        updateProfile,
        updateHero,
        addTreatment,
        updateTreatment,
        deleteTreatment,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        updateDoctorTeam,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        resetToDefaults,
        appointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        activePage,
        navigateTo,
        bookingModalOpen,
        openBookingModal,
        closeBookingModal,
        preselectedTreatment,
        whatsAppBotOpen,
        toggleWhatsAppBot,
        setWhatsAppBotOpen,
        showToast,
        toastMessage
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
