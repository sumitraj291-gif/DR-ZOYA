/**
 * Dr. Zoya DNA Clinic — Backend API Service Layer
 * Base URL: https://dr-zoya-backend.onrender.com/api/v1
 * All public endpoints are accessible without auth.
 * Admin endpoints require a JWT Bearer token.
 */

export const API_BASE =
  import.meta.env.VITE_API_BASE || 'https://dr-zoya-backend.onrender.com/api/v1';

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const isValidToken = (token) => {
  if (!token || typeof token !== 'string') return false;
  const clean = token.trim();
  if (['true', 'false', 'null', 'undefined', '1', '[object object]'].includes(clean.toLowerCase())) {
    return false;
  }
  if (clean.length < 20 || /\s/.test(clean)) return false;
  // A standard JWT has three base64url segments separated by dots
  const parts = clean.split('.');
  if (parts.length === 3 && parts.every(p => p.length > 0)) {
    return true;
  }
  return clean.length >= 25;
};

const getAuthHeader = () => {
  const token = localStorage.getItem('dna_admin_token');
  return isValidToken(token) ? { Authorization: `Bearer ${token}` } : {};
};

const sanitizeErrorMessage = (status, serverMsg) => {
  if (status === 401) {
    return 'Your admin session has expired. Please sign in again.';
  }
  if (status === 403) {
    return 'Access denied. You do not have permission for this clinical action.';
  }
  if (status === 404) {
    return 'The requested clinic resource was not found.';
  }
  if (status === 422) {
    return serverMsg && !serverMsg.includes('SQL') && !serverMsg.includes('Error:')
      ? serverMsg
      : 'Validation error: Please verify the submitted clinical details.';
  }
  if (status === 429) {
    return 'Too many requests. Please wait a moment before trying again.';
  }
  if (status >= 500) {
    return 'Clinic server is temporarily unavailable. Please try again shortly.';
  }
  if (serverMsg && typeof serverMsg === 'string' && !serverMsg.includes('node_modules') && !serverMsg.includes('Traceback')) {
    return serverMsg;
  }
  return `Server request failed (Status ${status}).`;
};

const request = async (method, path, body = null, authRequired = false) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(authRequired ? getAuthHeader() : {}),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s network timeout

  const config = {
    method,
    headers,
    signal: controller.signal,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const res = await fetch(`${API_BASE}${path}`, config);
    clearTimeout(timeoutId);

    if (authRequired && (res.status === 401 || res.status === 403)) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dna_admin_token');
        localStorage.removeItem('dna_admin_user');
        window.dispatchEvent(new CustomEvent('dna_admin_unauthorized'));
      }
    }

    let json = {};
    try {
      json = await res.json();
    } catch {
      json = {};
    }

    if (!res.ok) {
      const sanitized = sanitizeErrorMessage(res.status, json?.message || json?.error);
      throw new Error(sanitized);
    }
    return json;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Clinic server request timed out. Please check your connection and try again.');
    }
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
 * NOTE: Backend uses the same /public/contact-inquiry endpoint for all lead types.
 * /bookings/create-order is for Razorpay Phase 2 (paid advance booking).
 */
export const submitBookingLead = (data) =>
  request('POST', '/public/contact-inquiry', data);


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
