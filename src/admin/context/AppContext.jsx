import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_LEADS,
  INITIAL_APPOINTMENTS,
  INITIAL_PATIENTS,
  INITIAL_PAYMENTS,
  INITIAL_FOLLOWUPS,
  INITIAL_CHATS,
  INITIAL_TREATMENTS,
  INITIAL_STAFF,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  MOCK_ADMIN_PROFILE,
  MOCK_CLINIC_INFO,
  MOCK_KPIS
} from '../data/mockData';
import { useToast } from './ToastContext';

const AppContext = createContext(null);

export const AppProvider = ({ children, onLogout }) => {
  const { addToast } = useToast();

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Entities Data State
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [followups, setFollowups] = useState(INITIAL_FOLLOWUPS);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [treatments, setTreatments] = useState(INITIAL_TREATMENTS);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [adminProfile, setAdminProfile] = useState(MOCK_ADMIN_PROFILE);
  const [clinicInfo, setClinicInfo] = useState(MOCK_CLINIC_INFO);

  // Active Modals & Selected Item States
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedChat, setSelectedChat] = useState(INITIAL_CHATS[0]);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isNewTreatmentModalOpen, setIsNewTreatmentModalOpen] = useState(false);
  const [isNewStaffModalOpen, setIsNewStaffModalOpen] = useState(false);

  // Handlers for Leads
  const addLead = (newLead) => {
    const leadWithId = {
      ...newLead,
      id: `LED-${Math.floor(400 + Math.random() * 500)}`,
      date: new Date().toISOString().split('T')[0],
      status: newLead.status || 'New',
    };
    setLeads([leadWithId, ...leads]);
    addToast(`Lead created for ${leadWithId.name}`);
    setIsNewLeadModalOpen(false);
  };

  const updateLeadStatus = (id, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    addToast(`Lead ${id} moved to ${newStatus}`);
  };

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    addToast(`Lead ${id} deleted`);
  };

  const convertLeadToPatient = (lead) => {
    const newPatient = {
      id: `PAT-${Math.floor(8000 + Math.random() * 1000)}`,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      dob: '1995-01-01',
      gender: 'Female',
      lastVisit: new Date().toISOString().split('T')[0],
      totalAppointments: 1,
      totalSpent: 0,
      status: 'Active',
      leadHistory: `Lead ${lead.id} via ${lead.source}`,
      notes: lead.notes,
      appointments: [],
      treatments: [lead.interestedTreatment],
      payments: []
    };
    setPatients([newPatient, ...patients]);
    updateLeadStatus(lead.id, 'Converted');
    addToast(`Successfully converted ${lead.name} to Patient ${newPatient.id}!`);
    setSelectedLead(null);
  };

  // Handlers for Appointments
  const addAppointment = (newApt) => {
    const aptWithId = {
      ...newApt,
      id: `APT-${Math.floor(10000 + Math.random() * 90000)}`,
      paymentStatus: newApt.paymentStatus || 'Pending',
    };
    setAppointments([aptWithId, ...appointments]);
    addToast(`Appointment ${aptWithId.id} scheduled successfully`);
    setIsNewAppointmentModalOpen(false);
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
    addToast(`Appointment ${id} status set to ${newStatus}`);
  };

  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    addToast(`Appointment ${id} deleted`);
  };

  // Handlers for Patients
  const updatePatient = (id, updatedFields) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    addToast(`Patient ${id} updated`);
  };

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    addToast(`Patient ${id} record removed`);
  };

  // Handlers for Payments (Razorpay Ready)
  const initiateRefund = (paymentId) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? { ...p, status: 'Refunded', refundStatus: `Full Refund (₹${p.amount.toLocaleString('en-IN')})` }
          : p
      )
    );
    addToast(`Razorpay Refund initiated for ${paymentId}`);
  };

  // Handlers for Follow-ups
  const completeFollowup = (id) => {
    setFollowups((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'Completed' } : f))
    );
    addToast(`Follow-up ${id} marked completed`);
  };

  // Handlers for Treatments
  const addTreatment = (newTrt) => {
    const trtWithId = {
      ...newTrt,
      id: `TRT-0${treatments.length + 1}`,
      status: 'Active',
    };
    setTreatments([...treatments, trtWithId]);
    addToast(`Treatment ${trtWithId.name} added to catalog`);
    setIsNewTreatmentModalOpen(false);
  };

  const toggleTreatmentStatus = (id) => {
    setTreatments((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'Active' ? 'Inactive' : 'Active' } : t
      )
    );
    addToast(`Treatment status updated`);
  };

  const deleteTreatment = (id) => {
    setTreatments((prev) => prev.filter((t) => t.id !== id));
    addToast(`Treatment removed from catalog`);
  };

  // Handlers for Staff & RBAC
  const addStaffMember = (newStaff) => {
    const stfWithId = {
      ...newStaff,
      id: `STF-0${staff.length + 1}`,
      status: 'Active',
      permissions: newStaff.permissions || { leads: 'View', appointments: 'Manage', patients: 'View', payments: 'None', treatments: 'View', reports: 'None', settings: 'None' }
    };
    setStaff([...staff, stfWithId]);
    addToast(`Staff member ${stfWithId.name} registered`);
    setIsNewStaffModalOpen(false);
  };

  const deleteStaffMember = (id) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
    addToast(`Staff member removed`);
  };

  // Handlers for Reviews
  const updateReviewStatus = (id, newStatus) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    addToast(`Review status updated to ${newStatus}`);
  };

  const deleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    addToast(`Review deleted`);
  };

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    addToast('Notifications cleared');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        globalSearch,
        setGlobalSearch,
        mobileMenuOpen,
        setMobileMenuOpen,

        leads,
        addLead,
        updateLeadStatus,
        deleteLead,
        convertLeadToPatient,
        selectedLead,
        setSelectedLead,
        isNewLeadModalOpen,
        setIsNewLeadModalOpen,

        appointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        selectedAppointment,
        setSelectedAppointment,
        isNewAppointmentModalOpen,
        setIsNewAppointmentModalOpen,

        patients,
        selectedPatient,
        setSelectedPatient,
        updatePatient,
        deletePatient,

        payments,
        initiateRefund,
        selectedPayment,
        setSelectedPayment,

        followups,
        completeFollowup,

        chats,
        selectedChat,
        setSelectedChat,

        treatments,
        addTreatment,
        toggleTreatmentStatus,
        deleteTreatment,
        isNewTreatmentModalOpen,
        setIsNewTreatmentModalOpen,

        staff,
        addStaffMember,
        deleteStaffMember,
        isNewStaffModalOpen,
        setIsNewStaffModalOpen,

        reviews,
        updateReviewStatus,
        deleteReview,

        notifications,
        markNotificationRead,
        clearAllNotifications,

        adminProfile,
        setAdminProfile,
        clinicInfo,
        setClinicInfo,
        logout: onLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
