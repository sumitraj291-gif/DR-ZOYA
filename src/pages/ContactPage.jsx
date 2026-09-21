import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { submitContactInquiry } from '../services/api';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ContactPage = () => {
  const { clinicData, openBookingModal, addAppointment, showToast } = useClinic();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    treatment: 'Aesthetic Dermatology Consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    // Save to local CRM
    addAppointment({
      patientName: form.name,
      phone: form.phone,
      email: form.email || 'N/A',
      treatment: form.treatment,
      category: 'Contact Form Inquiry',
      date: 'Pending',
      timeSlot: 'Pending',
      feeAmount: 0,
      paymentStatus: 'Pending (Inquiry)',
      leadSource: 'Website Contact Page',
      notes: form.message,
      status: 'New'
    });

    // Also submit to backend API
    submitContactInquiry({
      name: form.name,
      phone: form.phone,
      email: form.email || '',
      treatment: form.treatment,
      message: form.message
    }).catch(err => console.warn('[API] Contact inquiry submission failed:', err.message));

    setSubmitted(true);
    showToast('Inquiry received! Dr. Zoya’s clinic concierge will call you shortly.');
  };

  return (
    <div className="py-10 sm:py-16 space-y-14">
      
      {/* Header */}
      <section className="clinic-container text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#FAF6EE] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clinic Concierge</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F172A]">
          Visit Our Private Studio or Connect
        </h1>

        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          We welcome you to experience aesthetic medicine in a serene, confidential private clinic setting on Golf Course Road, Gurugram.
        </p>
      </section>

      {/* Grid: Contact Cards & Form */}
      <section className="clinic-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4 text-left">
            
            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-subtle space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">Clinic Details</h3>
              
              <div className="space-y-3.5 text-xs text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#0F172A] block font-semibold mb-0.5">Location Address</strong>
                    <span>{clinicData.profile.contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#0F172A] block font-semibold mb-0.5">Clinic Timings</strong>
                    <span>{clinicData.profile.contact.timings}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#0F172A] block font-semibold mb-0.5">Priority Reception Lines</strong>
                    <span>{clinicData.profile.contact.phone}</span>
                    <span className="block text-gray-400 mt-0.5">Alt: {clinicData.profile.contact.altPhone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#0F172A] block font-semibold mb-0.5">Concierge Email</strong>
                    <span>{clinicData.profile.contact.email}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${clinicData.profile.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Directly on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Dual Clinic Branches */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EAE4DC] space-y-3 text-xs text-gray-700">
              <div className="font-bold text-[#0F172A] flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>Our Clinic Branches</span>
              </div>
              <div className="space-y-2 pt-1 border-t border-gray-200">
                <div>
                  <strong className="text-gray-900 block font-semibold">Dehradun Centre (Uttarakhand):</strong>
                  <span className="text-gray-600">{clinicData.profile.contact.dehradunAddress}</span>
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold">Muzaffarnagar Centre (Uttar Pradesh):</strong>
                  <span className="text-gray-600">{clinicData.profile.contact.muzaffarnagarAddress}</span>
                </div>
              </div>
            </div>

            {/* Instagram Card */}
            <a
              href={clinicData.profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-2xl border border-[#C5A059]/40 shadow-xs flex items-center justify-between hover:bg-[#FAF6EE] transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center">
                  <span className="font-bold text-sm">IG</span>
                </div>
                <div>
                  <div className="font-bold text-xs text-[#0F172A]">Follow Us on Instagram</div>
                  <div className="text-[11px] text-[#C5A059] font-medium">{clinicData.profile.instagramHandle}</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-500">View Page →</span>
            </a>

          </div>

          {/* Right: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-subtle">
            
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0F172A]">
                  Thank You, {form.name}!
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Your request has been logged into our clinic CRM. Dr. Zoya's concierge desk will reach out within 30 minutes during clinic hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-obsidian px-5 py-2 rounded-xl text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A]">
                    Send a Direct Clinical Inquiry
                  </h3>
                  <p className="text-xs text-gray-500">
                    Our team will answer treatment questions or schedule a callback.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Kapoor"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="priya@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Area of Interest</label>
                    <select
                      value={form.treatment}
                      onChange={e => setForm({ ...form, treatment: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059] focus:outline-none bg-white"
                    >
                      <option>Aesthetic Dermatology Consultation</option>
                      <option>Digital Smile Design & Veneers</option>
                      <option>Invisalign® Clear Aligners</option>
                      <option>PicoSure® Melasma / Pigmentation Laser</option>
                      <option>Baby Botox & Dermal Fillers</option>
                      <option>HydraFacial Elite MD</option>
                      <option>GFC Hair Regrowth</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Message or Medical Question</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your expectations, timeline, or past aesthetic treatments..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto btn-gold px-8 py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="text-xs text-[#C5A059] font-bold hover:underline"
                  >
                    Need immediate slot? Book & Pay ₹500
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
