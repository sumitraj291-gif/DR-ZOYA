import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { submitWhatsAppBotLead } from '../services/api';
import { 
  MessageCircle, 
  X, 
  Send, 
  Calendar, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';

export const FloatingWidgets = () => {
  const { 
    clinicData, 
    whatsAppBotOpen, 
    toggleWhatsAppBot, 
    openBookingModal, 
    addAppointment,
    showToast 
  } = useClinic();

  const [botMessages, setBotMessages] = useState([
    {
      id: 'm1',
      sender: 'bot',
      text: `Hello! 👋 Welcome to Dr. Zoya Aesthetic & Smile Studio. I am your 24/7 Clinic Assistant. How can we help you achieve your aesthetic goals today?`,
      time: 'Just now'
    }
  ]);

  const [leadFormActive, setLeadFormActive] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorConcern, setVisitorConcern] = useState('');
  const [submittedLead, setSubmittedLead] = useState(false);

  const quickFaqs = [
    { label: "💳 Consultation Fees", query: "fees" },
    { label: "✨ Treatments & Pricing", query: "pricing" },
    { label: "📍 Clinic Location & Hours", query: "location" },
    { label: "📅 Book an Appointment", query: "book" },
  ];

  const handleQuickQuestion = (query) => {
    let botReply = "";
    if (query === 'fees') {
      botReply = "Our consultation fee is ₹500 for Standard Clinical Assessment or ₹1,000 for Priority In-Clinic/3D Scan consultation. 100% of this fee is fully adjustable against any procedure you take!";
    } else if (query === 'pricing') {
      botReply = "Popular treatments: HydraFacial Elite MD (₹6,500), PicoSure Laser (₹9,500), Zoom Whitening (₹12,500), Baby Botox (₹450/unit), and Invisalign aligner packages. Would you like to consult Dr. Zoya for personalized pricing?";
    } else if (query === 'location') {
      botReply = `We are located at: ${clinicData.profile.contact.address}. Timings: ${clinicData.profile.contact.timings}. Valet parking is available!`;
    } else if (query === 'book') {
      botReply = "Wonderful! Please fill in your name and phone below so our concierge can immediately reserve your slot on WhatsApp!";
      setLeadFormActive(true);
    }

    setBotMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: quickFaqs.find(f => f.query === query)?.label || query,
        time: 'Just now'
      },
      {
        id: `bot-${Date.now() + 1}`,
        sender: 'bot',
        text: botReply,
        time: 'Just now'
      }
    ]);

    if (query !== 'book') {
      setLeadFormActive(true);
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim()) {
      alert("Please provide your name and phone number.");
      return;
    }

    // 1. Add to CRM Appointments & Leads
    addAppointment({
      patientName: visitorName,
      phone: visitorPhone,
      email: 'WhatsApp Lead',
      treatment: visitorConcern || 'Aesthetic Consultation',
      category: 'Smart WhatsApp Bot',
      date: 'Next Available',
      timeSlot: 'Pending Confirmation',
      feeAmount: 0,
      paymentStatus: 'Pending (WhatsApp Bot Lead)',
      leadSource: 'Phase 2 Smart WhatsApp Bot',
      notes: visitorConcern ? `Bot Lead Note: ${visitorConcern}` : 'Inquired via Smart WhatsApp Bot',
      status: 'New'
    });

    // 2. Also submit to backend API
    submitWhatsAppBotLead({
      name: visitorName,
      phone: visitorPhone,
      concern: visitorConcern || 'Aesthetic Consultation'
    }).catch(err => console.warn('[API] WhatsApp bot lead submission failed:', err.message));

    setSubmittedLead(true);
    showToast('Inquiry logged into clinic system! Redirecting to WhatsApp...');

    // 3. Open WhatsApp with prefilled message to Dr. Zoya's official clinic line
    const textMsg = encodeURIComponent(
      `Hi Dr. Zoya's Clinic! I am ${visitorName}. I was chatting with your website bot regarding: ${visitorConcern || 'Aesthetic / Smile consultation'}. My phone is ${visitorPhone}. Please share available appointment slots!`
    );

    setTimeout(() => {
      window.open(
        `https://wa.me/${clinicData.profile.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${textMsg}`,
        '_blank'
      );
    }, 1200);
  };

  return (
    <>
      {/* 1. SMART WHATSAPP BOT FLOATING BUTTON & WINDOW */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
        
        {/* Expanded Chat Box */}
        {whatsAppBotOpen && (
          <div className="w-[92vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#C5A059]/30 overflow-hidden mb-3 modal-enter flex flex-col max-h-[540px]">
            {/* Header */}
            <div className="bg-[#0A111C] p-4 text-white flex items-center justify-between border-b border-[#C5A059]/30">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#125B50] to-[#25D366] flex items-center justify-center text-white">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0A111C] rounded-full" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm text-white flex items-center space-x-1">
                    <span>Dr. Zoya Bot</span>
                    <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span>Online • Instant Clinic Assistant</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={toggleWhatsAppBot}
                className="btn-ghost text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat History */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-[#F9F8F6] text-xs">
              {botMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[82%] p-3 rounded-2xl shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0F172A] text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-[#EAE4DC] rounded-tl-none'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`block text-[9px] mt-1 ${msg.sender === 'user' ? 'text-gray-400' : 'text-gray-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Quick FAQ Chips */}
              <div className="pt-2 space-y-1.5">
                <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  Frequently Asked Questions:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickFaqs.map((faq) => (
                    <button
                      key={faq.query}
                      onClick={() => handleQuickQuestion(faq.query)}
                      className="btn-pill btn-pill-inactive text-[11px] font-medium px-2.5 py-1.5"
                    >
                      <span>{faq.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Lead Capture Form */}
              {leadFormActive && !submittedLead && (
                <div className="bg-white p-3.5 rounded-xl border border-[#C5A059] shadow-xs space-y-2.5 mt-3">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-[#0F172A]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Send Details to Clinic WhatsApp</span>
                  </div>
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Mobile Number *"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Skin/Smile concern or preferred time"
                      value={visitorConcern}
                      onChange={(e) => setVisitorConcern(e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Connect on WhatsApp Now</span>
                    </button>
                  </form>
                </div>
              )}

              {submittedLead && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl text-center space-y-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                  <p className="font-bold text-xs">Inquiry Sent!</p>
                  <p className="text-[10px]">Opening WhatsApp chat with Dr. Zoya's clinical team...</p>
                </div>
              )}
            </div>

            {/* Bottom Input bar */}
            <div className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask about skin, smile, or treatments..."
                className="flex-1 bg-gray-50 border border-gray-300 px-3 py-1.5 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleQuickQuestion(e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
              <button 
                onClick={() => setLeadFormActive(true)}
                className="btn-obsidian p-2 rounded-full"
                title="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Floating Bubble Icon */}
        <button
          onClick={toggleWhatsAppBot}
          className="relative bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center group focus:outline-none ring-4 ring-white/80"
          aria-label="Open Smart WhatsApp Bot"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A059] text-[#090D14] text-[9px] font-extrabold rounded-full flex items-center justify-center shadow">
            1
          </span>
          <div className="absolute right-full mr-3 bg-[#0F172A] text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg hidden sm:group-hover:block transition-all border border-[#C5A059]/40">
            Chat with Dr. Zoya Assistant
          </div>
        </button>
      </div>

      {/* 2. MOBILE BOTTOM STICKY BAR (Ultra-Convenient Mobile UX) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-4 py-2 flex items-center justify-between shadow-2xl">
        <a 
          href={`tel:${clinicData.profile.contact.phone.replace(/[^0-9+]/g, '')}`}
          className="flex flex-col items-center justify-center text-gray-700 hover:text-[#85611E] text-[10px] font-medium py-1 px-2"
        >
          <Phone className="w-4 h-4 text-[#85611E] mb-0.5" />
          <span>Call Clinic</span>
        </a>

        <button 
          onClick={toggleWhatsAppBot}
          className="btn-ghost flex flex-col items-center justify-center text-gray-700 hover:text-emerald-600 text-[10px] font-medium py-1 px-2"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => openBookingModal()}
          className="btn-gold px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-md"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book ₹500/₹1k</span>
        </button>
      </div>
    </>
  );
};
