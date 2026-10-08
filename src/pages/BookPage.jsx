import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  ChevronRight, 
  MessageCircle,
  Phone,
  User,
  Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitBookingLead } from '../services/api';

export const BookPage = () => {
  const { clinicData, addAppointment, showToast } = useClinic();

  const [selectedTreatment, setSelectedTreatment] = useState(clinicData.treatments[0] || null);
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [feeTier, setFeeTier] = useState(500);
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(tomorrow.toISOString().split('T')[0]);

  const [patientForm, setPatientForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const slots = ['10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'];

  const handleConfirm = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!patientForm.fullName.trim() || !patientForm.phone.trim()) {
      setSubmitError("Please provide your full name and phone number.");
      return;
    }
    const cleanPhone = patientForm.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setSubmitError("Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).");
      return;
    }
    if (patientForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientForm.email.trim())) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (new Date(selectedDate) < new Date(new Date().toDateString())) {
      setSubmitError("Please select an appointment date from today or in the future.");
      return;
    }
    if (isProcessing) return;

    setIsProcessing(true);
    setSubmitError('');

    const payload = {
      name: patientForm.fullName.trim(),
      patientName: patientForm.fullName.trim(),
      phone: patientForm.phone.trim(),
      email: patientForm.email?.trim() || '',
      treatment: selectedTreatment?.title || 'Aesthetic Assessment',
      treatmentName: selectedTreatment?.title || 'Aesthetic Assessment',
      category: selectedTreatment?.category || 'General',
      appointmentDate: selectedDate,
      timeSlot: selectedSlot,
      feeAmount: feeTier,
      leadSource: 'Full Page Booking Portal',
      notes: patientForm.notes ? `${patientForm.notes} | Consultation Fee (Pay at Clinic): ₹${feeTier}` : `Consultation Fee (Pay at Clinic): ₹${feeTier}`,
      message: `Appointment request submitted via Book Page for ${selectedTreatment?.title || 'Assessment'} on ${selectedDate} (${selectedSlot}). Selected Tier: ₹${feeTier} (Pay at Clinic).`,
    };

    try {
      const res = await submitBookingLead(payload);
      const serverId = res?.appointmentId || `APT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const record = addAppointment({
        id: serverId,
        patientName: patientForm.fullName.trim(),
        phone: patientForm.phone.trim(),
        email: patientForm.email?.trim() || 'N/A',
        treatment: selectedTreatment?.title || 'Aesthetic Assessment',
        category: selectedTreatment?.category || 'General',
        date: selectedDate,
        timeSlot: selectedSlot,
        feeAmount: feeTier,
        paymentStatus: 'Pay at Clinic (Due on Arrival)',
        leadSource: 'Full Page Booking Portal',
        notes: payload.notes,
        status: 'Request Submitted'
      });

      setConfirmedBooking(record);

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}

      showToast(`Appointment request submitted! Reference: ${record.id}`);
    } catch (err) {
      console.error('[BookPage Submission Error]', err);
      setSubmitError(err.message || 'Unable to submit appointment to clinic server. Please try again or reach out on WhatsApp.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getWhatsAppConfirmationUrl = () => {
    if (!confirmedBooking) return '#';
    const text = encodeURIComponent(
      `Hi Dr. Zoya Clinic! I submitted an appointment request on your website.\n\nBooking Reference: ${confirmedBooking.id}\nPatient: ${confirmedBooking.patientName}\nPhone: ${confirmedBooking.phone}\nTreatment: ${confirmedBooking.treatment}\nDate: ${confirmedBooking.date} (${confirmedBooking.timeSlot})\nConsultation Tier: ₹${confirmedBooking.feeAmount} (Pay at Clinic)\n\nPlease confirm my slot!`
    );
    return `https://wa.me/${clinicData.profile.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FAF8F5]">
      <div className="clinic-container max-w-4xl space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#FAF6EE] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-Paid Priority Scheduling</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F172A]">
            Reserve Your Private Consultation
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto">
            Book directly with Dr. Zoya. All consultation fees (₹500 / ₹1,000) are 100% deductible from any clinical procedure.
          </p>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#C5A059]/40 shadow-xl text-center space-y-6 max-w-lg mx-auto modal-enter">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-50">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#C5A059] uppercase tracking-widest">Request Submitted</span>
              <h3 className="font-serif text-2xl font-bold text-[#0F172A] mt-1">
                We're Excited to Meet You, {confirmedBooking.patientName}!
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Your appointment reference ID is <strong>{confirmedBooking.id}</strong>. Our reception team will call to confirm your dedicated slot.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gray-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Treatment:</span>
                <span className="font-semibold text-[#0F172A]">{confirmedBooking.treatment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Slot Reserved:</span>
                <span className="font-semibold text-emerald-700">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fee Status:</span>
                <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">₹{confirmedBooking.feeAmount} (Payable at Clinic)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 text-[11px]">
                <span className="text-gray-500">Address:</span>
                <span className="text-gray-700 text-right">{clinicData.profile.contact.address}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppConfirmationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to Clinic WhatsApp</span>
              </a>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full bg-[#0F172A] text-white py-3 px-4 rounded-xl text-xs font-semibold"
              >
                Book Another
              </button>
            </div>
          </div>
        ) : (
          /* Main Multi-Step Form */
          <form onSubmit={handleConfirm} className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E2D9] shadow-subtle space-y-8 text-left">
            
            {/* 1. Select Treatment */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                1. Select Desired Procedure
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {clinicData.treatments.map((t) => {
                  const isSelected = selectedTreatment?.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        setSelectedTreatment(t);
                        if (t.advanceFee) setFeeTier(t.advanceFee);
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#C5A059] bg-[#FAF6EE] shadow-sm ring-1 ring-[#C5A059]' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-[10px] text-[#C5A059] font-bold uppercase">{t.category}</div>
                      <div className="font-semibold text-xs text-[#0F172A] mt-0.5">{t.title}</div>
                      <div className="text-[11px] text-gray-500 mt-2 flex justify-between">
                        <span>{t.duration}</span>
                        <span className="font-bold text-gray-700">{t.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Date & Slot */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                2. Select Date & Slot
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <input
                    type="date"
                    min={tomorrow.toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
                <div className="sm:col-span-2 grid grid-cols-3 gap-2">
                  {slots.map(s => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                        selectedSlot === s 
                          ? 'border-[#C5A059] bg-[#FAF6EE] text-[#0F172A] ring-1 ring-[#C5A059]' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Patient Contact */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                3. Patient Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="patient-fullname" className="sr-only">Full Name</label>
                  <input
                    id="patient-fullname"
                    type="text"
                    required
                    autoComplete="name"
                    aria-label="Full Name"
                    placeholder="Your Full Name *"
                    value={patientForm.fullName}
                    onChange={e => setPatientForm({ ...patientForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
                <div>
                  <label htmlFor="patient-phone" className="sr-only">Phone Number</label>
                  <input
                    id="patient-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    aria-label="Phone Number"
                    placeholder="Phone / WhatsApp Number *"
                    value={patientForm.phone}
                    onChange={e => setPatientForm({ ...patientForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="patient-email" className="sr-only">Email Address</label>
                  <input
                    id="patient-email"
                    type="email"
                    autoComplete="email"
                    aria-label="Email Address"
                    placeholder="Email Address (Optional)"
                    value={patientForm.email}
                    onChange={e => setPatientForm({ ...patientForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              </div>
            </div>

            {/* 4. Consultation Fee Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                4. Select Consultation Tier (Pay at Clinic on Arrival)
              </label>

              {/* Error banner if submission failed */}
              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start space-x-2">
                  <span className="font-bold">Error:</span>
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setFeeTier(500)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    feeTier === 500
                      ? 'border-[#C5A059] bg-[#FAF6EE] ring-1 ring-[#C5A059]'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#0F172A]">Standard Clinical Assessment</span>
                    <span className="font-serif text-lg font-bold text-[#0F172A]">₹500</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    45-min detailed clinical skin & smile assessment. 100% deductible against treatment cost.
                  </p>
                </div>

                <div
                  onClick={() => setFeeTier(1000)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    feeTier === 1000
                      ? 'border-[#C5A059] bg-[#FAF6EE] ring-1 ring-[#C5A059]'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#0F172A]">Priority VIP Assessment & 3D Scan</span>
                    <span className="font-serif text-lg font-bold text-[#0F172A]">₹1,000</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Includes 3D intraoral scan, AI facial analysis, and priority queue guarantee.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy & Submit */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Fee Deductible Against Procedure • Pay at Clinic</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full sm:w-auto btn-gold px-8 py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-lg cursor-pointer disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Submit Appointment Request (Pay at Clinic)</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
