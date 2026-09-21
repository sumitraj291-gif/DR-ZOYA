/**
 * Dr. Zoya DNA Clinic — Backend API Service Layer
 * Base URL: https://dr-zoya-backend.onrender.com/api/v1
 * All public endpoints are accessible without auth.
 * Admin endpoints require a JWT Bearer token.
 */

export const API_BASE = 'https://dr-zoya-backend.onrender.com/api/v1';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getAuthHeader = () => {
  const token = localStorage.getItem('dna_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const request = async (method, path, body = null, authRequired = false) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(authRequired ? getAuthHeader() : {}),
  };

  const config = {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const res = await fetch(`${API_BASE}${path}`, config);
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.message || json?.error || `HTTP ${res.status}`);
    }
    return json;
  } catch (err) {
    console.error(`[API] ${method} ${path}`, err.message);
    throw err;
  }
};

// ─── Public APIs ──────────────────────────────────────────────────────────────

/**
 * Fetch all clinic content: settings, team, treatments, testimonials, gallery.
 * Used on app load to hydrate ClinicContext from the backend.
 */
export const fetchClinicData = () => request('GET', '/public/clinic-data');

/**
 * Submit a contact inquiry / lead from the contact page.
 */
export const submitContactInquiry = (data) =>
  request('POST', '/public/contact-inquiry', data);

/**
 * Submit an appointment booking from the booking modal.
 */
export const submitBookingLead = (data) =>
  request('POST', '/public/booking-lead', data);

/**
 * Submit a WhatsApp bot lead.
 */
export const submitWhatsAppBotLead = (data) =>
  request('POST', '/whatsapp-bot/lead', data);

// ─── Admin Auth ───────────────────────────────────────────────────────────────

/**
 * Admin login.
 */
export const adminLogin = (email, password) =>
  request('POST', '/auth/login', { email, password });

export const getAdminProfile = () => request('GET', '/auth/me', null, true);

// ─── Admin CRM ────────────────────────────────────────────────────────────────

export const fetchAppointments = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request('GET', `/admin/crm/appointments${qs ? '?' + qs : ''}`, null, true);
};

export const updateAppointmentStatusAPI = (id, status, staffNotes = '') =>
  request('PATCH', `/admin/crm/appointments/${id}/status`, { status, staffNotes }, true);

export const deleteAppointmentRecord = (id) =>
  request('DELETE', `/admin/crm/appointments/${id}`, null, true);

// ─── Admin CMS – Doctors ──────────────────────────────────────────────────────

export const updateDoctorOnServer = (id, fields) =>
  request('PATCH', `/admin/cms/doctors/${id}`, fields, true);

export const addDoctorOnServer = (data) =>
  request('POST', '/admin/cms/doctors', data, true);

export const deleteDoctorOnServer = (id) =>
  request('DELETE', `/admin/cms/doctors/${id}`, null, true);

// ─── Admin CMS – Profile / Hero ───────────────────────────────────────────────

export const updateClinicProfile = (data) =>
  request('PUT', '/admin/cms/profile', data, true);

export const updateHeroSection = (data) =>
  request('PUT', '/admin/cms/hero', data, true);

// ─── Admin CMS – Treatments ───────────────────────────────────────────────────

export const createTreatmentAPI = (data) =>
  request('POST', '/admin/cms/treatments', data, true);

export const updateTreatmentAPI = (id, data) =>
  request('PUT', `/admin/cms/treatments/${id}`, data, true);

export const deleteTreatmentAPI = (id) =>
  request('DELETE', `/admin/cms/treatments/${id}`, null, true);

// ─── Admin CMS – Testimonials ─────────────────────────────────────────────────

export const createTestimonialAPI = (data) =>
  request('POST', '/admin/cms/testimonials', data, true);

export const deleteTestimonialAPI = (id) =>
  request('DELETE', `/admin/cms/testimonials/${id}`, null, true);

// ─── Admin CMS – Gallery ──────────────────────────────────────────────────────

export const createGalleryItemAPI = (data) =>
  request('POST', '/admin/cms/gallery', data, true);

export const updateGalleryItemAPI = (id, data) =>
  request('PUT', `/admin/cms/gallery/${id}`, data, true);

export const deleteGalleryItemAPI = (id) =>
  request('DELETE', `/admin/cms/gallery/${id}`, null, true);

// ─── AI Analyzer ─────────────────────────────────────────────────────────────

export const analyzePatientFace = async (imageFile) => {
  const token = localStorage.getItem('dna_admin_token');
  const formData = new FormData();
  formData.append('image', imageFile);
  const res = await fetch(`${API_BASE}/ai/analyze-face`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
  return json;
};
