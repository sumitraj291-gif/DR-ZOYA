import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialClinicData, initialSeedAppointments } from '../data/defaultClinicData';

const ClinicContext = createContext();

export const ClinicProvider = ({ children }) => {
  // 1. Persistent Clinic Content Data (CMS)
  const [clinicData, setClinicData] = useState(() => {
    try {
      const saved = localStorage.getItem('dr_zoya_clinic_data_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading clinic data from localStorage:', e);
    }
    return initialClinicData;
  });

  // 2. Persistent Appointments & Leads (CRM)
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem('dr_zoya_appointments_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading appointments from localStorage:', e);
    }
    return initialSeedAppointments;
  });

  // 3. Navigation State (Multi-page router with back/forward support)
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validPages = ['home', 'treatments', 'smile-makeover', 'about', 'ai-analyzer', 'gallery', 'book', 'contact', 'admin'];
    return validPages.includes(hash) ? hash : 'home';
  });

  // 4. Modal & Widget States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState(null);
  const [whatsAppBotOpen, setWhatsAppBotOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync clinicData changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dr_zoya_clinic_data_v1', JSON.stringify(clinicData));
    } catch (e) {
      console.error('Error saving clinic data:', e);
    }
  }, [clinicData]);

  // Sync appointments changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dr_zoya_appointments_v1', JSON.stringify(appointments));
    } catch (e) {
      console.error('Error saving appointments:', e);
    }
  }, [appointments]);

  // Listen to browser hash changes (back/forward button support)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages = ['home', 'treatments', 'smile-makeover', 'about', 'ai-analyzer', 'gallery', 'book', 'contact', 'admin'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, data = null) => {
    window.location.hash = `#/${page}`;
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

  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all CMS content to original clinic defaults? Any custom edits will be reverted.")) {
      setClinicData(initialClinicData);
      setAppointments(initialSeedAppointments);
      localStorage.removeItem('dr_zoya_clinic_data_v1');
      localStorage.removeItem('dr_zoya_appointments_v1');
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
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
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
