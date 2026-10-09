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
  createTreatmentAPI,
  updateTreatmentAPI,
  deleteTreatmentAPI,
  createGalleryItemAPI,
  updateGalleryItemAPI,
  deleteGalleryItemAPI,
  createTestimonialAPI,
  deleteTestimonialAPI,
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
          if (!parsed.profile?.team || parsed.profile.team.length < 6 || !parsed.profile.team.some(d => d.name?.includes('Rohan')) || !parsed.profile.team.some(d => d.name?.includes('Amit')) || !parsed.profile.team.some(d => d.name?.includes('Nasida'))) {
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

  // ── Sync clinic content from real backend ───────────────────────────────────
  const syncClinicDataFromServer = async () => {
    try {
      const res = await fetchClinicData();
      if (!res?.data) return false;
      const { settings, team, treatments, testimonials, gallery } = res.data;
      if (!settings) return false;

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

      setClinicData(prev => {
        const serverTeam = (team || []).filter(d => d.isActive !== false);

        // Start merged list with server doctors
        const mergedTeam = [...serverTeam];

        // Ensure all default specialists (Dr. Nasida, Dr. Rohan, Dr. Amit, Dr. Varsha, Dr. Zoya Talat, etc.) are always included
        (initialClinicData.profile?.team || []).forEach(initialDoc => {
          const normName = initialDoc.name ? initialDoc.name.toLowerCase().replace(/[^a-z]/g, '') : '';
          const exists = mergedTeam.some(
            d => d.id === initialDoc.id || (normName && d.name && d.name.toLowerCase().replace(/[^a-z]/g, '') === normName)
          );
          if (!exists) {
            mergedTeam.push(initialDoc);
          }
        });

        // Also preserve any custom doctors added or edited in local state / CMS
        (prev.profile?.team || []).forEach(localDoc => {
          const normName = localDoc.name ? localDoc.name.toLowerCase().replace(/[^a-z]/g, '') : '';
          const existingIndex = mergedTeam.findIndex(
            d => d.id === localDoc.id || (normName && d.name && d.name.toLowerCase().replace(/[^a-z]/g, '') === normName)
          );
          if (existingIndex === -1) {
            mergedTeam.push(localDoc);
          } else {
            // Keep local custom edits (like changed photo or role)
            mergedTeam[existingIndex] = {
              ...mergedTeam[existingIndex],
              ...localDoc,
            };
          }
        });

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
          team: mergedTeam,
        };

        return {
          ...prev,
          profile: backendProfile,
          hero: backendHero,
          treatments: backendTreatments.length > 0 ? backendTreatments : prev.treatments,
          testimonials: backendTestimonials.length > 0 ? backendTestimonials : prev.testimonials,
          gallery: (gallery && gallery.length > 0) ? gallery : (res.data.gallery && res.data.gallery.length > 0 ? res.data.gallery : prev.gallery),
        };
      });

      setBackendLoaded(true);
      return true;
    } catch (err) {
      console.warn('[DNA Clinic] ⚠️ Backend unavailable, using cached/default data.', err.message);
      return false;
    }
  };

  useEffect(() => {
    if (!backendLoaded) {
      syncClinicDataFromServer();
    }
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

  // CMS Mutators (Connected to Backend REST APIs)
  const updateProfile = async (updatedProfile) => {
    try {
      await updateClinicProfileAPI(updatedProfile);
      setClinicData(prev => ({
        ...prev,
        profile: { ...prev.profile, ...updatedProfile }
      }));
      showToast('Clinic Profile & Contact details saved to server!');
      await syncClinicDataFromServer();
      return true;
    } catch (err) {
      console.error('[CMS] Failed to save profile:', err);
      showToast(err.message || 'Failed to save profile to server.', 'error');
      throw err;
    }
  };

  const updateHero = async (updatedHero) => {
    try {
      await updateHeroSectionAPI(updatedHero);
      setClinicData(prev => ({
        ...prev,
        hero: { ...prev.hero, ...updatedHero }
      }));
      showToast('Hero section content saved to server!');
      await syncClinicDataFromServer();
      return true;
    } catch (err) {
      console.error('[CMS] Failed to save hero:', err);
      showToast(err.message || 'Failed to save hero section to server.', 'error');
      throw err;
    }
  };

  const addTreatment = async (newTreatment) => {
    try {
      const res = await createTreatmentAPI(newTreatment);
      const created = res?.data || { ...newTreatment, id: res?.id || `trt-${Date.now()}` };
      setClinicData(prev => ({
        ...prev,
        treatments: [created, ...prev.treatments]
      }));
      showToast(`Treatment "${newTreatment.title}" saved to server!`);
      await syncClinicDataFromServer();
      return created;
    } catch (err) {
      console.error('[CMS] Failed to add treatment:', err);
      showToast(err.message || 'Failed to add treatment on server.', 'error');
      throw err;
    }
  };

  const updateTreatment = async (id, updatedFields) => {
    try {
      await updateTreatmentAPI(id, updatedFields);
      setClinicData(prev => ({
        ...prev,
        treatments: prev.treatments.map(item => item.id === id ? { ...item, ...updatedFields } : item)
      }));
      showToast('Treatment details updated on server!');
      await syncClinicDataFromServer();
      return true;
    } catch (err) {
      console.error('[CMS] Failed to update treatment:', err);
      showToast(err.message || 'Failed to update treatment on server.', 'error');
      throw err;
    }
  };

  const deleteTreatment = async (id) => {
    try {
      await deleteTreatmentAPI(id);
      setClinicData(prev => ({
        ...prev,
        treatments: prev.treatments.filter(item => item.id !== id)
      }));
      showToast('Treatment removed from catalog.');
      return true;
    } catch (err) {
      console.error('[CMS] Failed to delete treatment:', err);
      showToast(err.message || 'Failed to delete treatment on server.', 'error');
      throw err;
    }
  };

  const updateTestimonial = (id, updatedFields) => {
    setClinicData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(item => item.id === id ? { ...item, ...updatedFields } : item)
    }));
    showToast('Testimonial updated!');
  };

  const addTestimonial = async (newReview) => {
    try {
      const res = await createTestimonialAPI(newReview);
      const created = res?.data || { ...newReview, id: res?.id || `rev-${Date.now()}` };
      setClinicData(prev => ({
        ...prev,
        testimonials: [created, ...prev.testimonials]
      }));
      showToast('New patient review saved to server!');
      return created;
    } catch (err) {
      console.error('[CMS] Failed to add review:', err);
      showToast(err.message || 'Failed to add review on server.', 'error');
      throw err;
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await deleteTestimonialAPI(id);
      setClinicData(prev => ({
        ...prev,
        testimonials: prev.testimonials.filter(item => item.id !== id)
      }));
      showToast('Patient review removed from server.');
      return true;
    } catch (err) {
      console.error('[CMS] Failed to delete review:', err);
      showToast(err.message || 'Failed to delete review on server.', 'error');
      throw err;
    }
  };

  // Gallery & Media CMS Mutators
  const addGalleryItem = async (newItem) => {
    const item = {
      id: `gal-${Date.now()}`,
      ...newItem
    };
    try {
      const res = await createGalleryItemAPI(item);
      const created = res?.data || item;
      setClinicData(prev => ({
        ...prev,
        gallery: [created, ...(prev.gallery || [])]
      }));
      showToast('New gallery item saved to server!');
      await syncClinicDataFromServer();
      return created;
    } catch (err) {
      console.error('[CMS] Failed to add gallery item:', err);
      showToast(err.message || 'Failed to save gallery item to server.', 'error');
      throw err;
    }
  };

  const updateGalleryItem = async (id, updatedFields) => {
    try {
      await updateGalleryItemAPI(id, updatedFields);
      setClinicData(prev => ({
        ...prev,
        gallery: (prev.gallery || []).map(item => item.id === id ? { ...item, ...updatedFields } : item)
      }));
      showToast('Gallery item updated on server!');
      await syncClinicDataFromServer();
      return true;
    } catch (err) {
      console.error('[CMS] Failed to update gallery item:', err);
      showToast(err.message || 'Failed to update gallery item on server.', 'error');
      throw err;
    }
  };

  const deleteGalleryItem = async (id) => {
    try {
      await deleteGalleryItemAPI(id);
      setClinicData(prev => ({
        ...prev,
        gallery: (prev.gallery || []).filter(item => item.id !== id)
      }));
      showToast('Gallery item removed from clinic showcase.');
      return true;
    } catch (err) {
      console.error('[CMS] Failed to delete gallery item:', err);
      showToast(err.message || 'Failed to delete gallery item on server.', 'error');
      throw err;
    }
  };

  // Doctors Team CMS Mutators
  const updateDoctor = async (id, updatedFields) => {
    try {
      try {
        await updateDoctorOnServer(id, updatedFields);
      } catch (serverErr) {
        console.warn('[CMS] Server doctor update skipped/failed, keeping local update:', serverErr.message);
      }
      setClinicData(prev => {
        const currentTeam = prev.profile?.team || [];
        const updatedTeam = currentTeam.map(doc => doc.id === id ? { ...doc, ...updatedFields } : doc);
        
        let updatedProfile = { ...prev.profile, team: updatedTeam };
        
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
      showToast('Doctor details and photo updated!');
      return true;
    } catch (err) {
      console.error('[CMS] Failed to update doctor:', err);
      showToast(err.message || 'Failed to update doctor.', 'error');
      throw err;
    }
  };

  const addDoctor = async (newDoctor) => {
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
    try {
      try {
        await addDoctorOnServer(doc);
      } catch (serverErr) {
        console.warn('[CMS] Server doctor add skipped/failed, keeping local addition:', serverErr.message);
      }
      setClinicData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          team: [...(prev.profile?.team || []), doc]
        }
      }));
      showToast(`Doctor "${doc.name}" added to specialist panel!`);
      return doc;
    } catch (err) {
      console.error('[CMS] Failed to add doctor:', err);
      showToast(err.message || 'Failed to add doctor.', 'error');
      throw err;
    }
  };

  const deleteDoctor = async (id) => {
    try {
      try {
        await deleteDoctorOnServer(id);
      } catch (serverErr) {
        console.warn('[CMS] Server doctor delete skipped/failed, removing locally:', serverErr.message);
      }
      setClinicData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          team: (prev.profile?.team || []).filter(doc => doc.id !== id)
        }
      }));
      showToast('Doctor removed from specialist panel.');
      return true;
    } catch (err) {
      console.error('[CMS] Failed to delete doctor:', err);
      showToast(err.message || 'Failed to delete doctor.', 'error');
      throw err;
    }
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
        syncClinicDataFromServer,
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
