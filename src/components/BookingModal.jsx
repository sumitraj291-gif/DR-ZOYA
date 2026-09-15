import React, { useState, useEffect } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  X, 
  Check, 
  Calendar, 
  Clock, 
  CreditCard, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingModal = () => {
  const { 
    clinicData, 
    bookingModalOpen, 
    closeBookingModal, 
    preselectedTreatment, 
    addAppointment,
    showToast 
  } = useClinic();

  const [step, setStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [feeOption, setFeeOption] = useState(500); // 500 or 1000
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Time slot options
  const slots = [
    { id: '11:00 AM', period: 'Morning' },
    { id: '12:15 PM', period: 'Morning' },
    { id: '02:30 PM', period: 'Afternoon' },
    { id: '04:00 PM', period: 'Afternoon' },
    { id: '05:30 PM', period: 'Evening' },
    { id: '07:00 PM', period: 'Evening' },
  ];

  // Set default minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    if (bookingModalOpen) {
      if (preselectedTreatment) {
        setSelectedTreatment(preselectedTreatment);
        if (preselectedTreatment.advanceFee) {
          setFeeOption(preselectedTreatment.advanceFee);
        }
      } else if (!selectedTreatment && clinicData.treatments.length > 0) {
        setSelectedTreatment(clinicData.treatments[0]);
      }
      if (!selectedDate) {
        setSelectedDate(minDateStr);
      }
      if (!selectedSlot) {
        setSelectedSlot('12:15 PM');
      }
      setStep(1);
      setBookingSuccess(null);
      setIsProcessingPayment(false);
    }
  }, [bookingModalOpen, preselectedTreatment, clinicData.treatments]);

  if (!bookingModalOpen) return null;

  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    if (step === 1 && !selectedTreatment) {
      alert('Please select a treatment.');
      return;
    }
    if (step === 2 && (!selectedDate || !selectedSlot)) {
      alert('Please select both a date and preferred time slot.');
      return;
    }
    if (step === 3) {
      if (!formData.fullName.trim() || !formData.phone.trim()) {
        alert('Please enter your full name and phone number.');
        return;
      }
      if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);

    // Simulate payment gateway verification (Razorpay / Stripe webhook hook for team)
    setTimeout(() => {
      const createdRecord = addAppointment({
        patientName: formData.fullName,
        phone: formData.phone,
        email: formData.email || 'N/A',
        treatment: selectedTreatment?.title || 'General Aesthetic Consultation',
        category: selectedTreatment?.category || 'General',
        date: selectedDate,
        timeSlot: selectedSlot,
        feeAmount: feeOption,
        paymentStatus: 'Paid (Advance Verified)',
        leadSource: 'Website Pre-Paid Booking',
        notes: formData.notes ? `${formData.notes} | Consultation Fee: ₹${feeOption}` : `Consultation Fee: ₹${feeOption}`,
      });

      setIsProcessingPayment(false);
      setBookingSuccess(createdRecord);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }

      showToast(`Appointment confirmed! Booking ID: ${createdRecord.id}`);
    }, 1400);
  };

  const getWhatsAppConfirmationUrl = () => {
    if (!bookingSuccess) return '#';
    const text = encodeURIComponent(
      `Hello Dr. Zoya's Clinic, I have completed my pre-paid appointment booking on your website.\n\nBooking ID: ${bookingSuccess.id}\nPatient: ${bookingSuccess.patientName}\nPhone: ${bookingSuccess.phone}\nTreatment: ${bookingSuccess.treatment}\nDate: ${bookingSuccess.date} (${bookingSuccess.timeSlot})\nAdvance Fee Paid: ₹${bookingSuccess.feeAmount}\n\nPlease confirm my slot!`
    );
    return `https://wa.me/${clinicData.profile.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#C5A059]/30 overflow-hidden modal-enter my-auto">
        
        {/* Header */}
        <div className="bg-[#0A111C] text-white p-5 sm:p-6 border-b border-[#C5A059]/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white">
                Book Consultation
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Dr. Zoya Aesthetic & Smile Studio • Phase 2 Pre-Paid Priority
              </p>
            </div>
          </div>
          <button 
            onClick={closeBookingModal}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Indicator (when not completed) */}
        {!bookingSuccess && (
          <div className="bg-[#F8F6F2] px-6 py-3 border-b border-[#EAE4DC] flex items-center justify-between text-xs text-[#64748B]">
            <div className={`flex items-center space-x-1.5 ${step >= 1 ? 'text-[#0F172A] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#C5A059] text-white' : 'bg-gray-200'}`}>1</span>
              <span>Treatment</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <div className={`flex items-center space-x-1.5 ${step >= 2 ? 'text-[#0F172A] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#C5A059] text-white' : 'bg-gray-200'}`}>2</span>
              <span>Date & Slot</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <div className={`flex items-center space-x-1.5 ${step >= 3 ? 'text-[#0F172A] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#C5A059] text-white' : 'bg-gray-200'}`}>3</span>
              <span>Details</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <div className={`flex items-center space-x-1.5 ${step >= 4 ? 'text-[#0F172A] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 4 ? 'bg-[#C5A059] text-white' : 'bg-gray-200'}`}>4</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto">
          
          {/* STEP 1: Select Treatment */}
          {step === 1 && !bookingSuccess && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-semibold text-[#0F172A]">Choose Clinical Procedure or Consultation</h4>
                <p className="text-xs text-[#64748B]">Select the treatment you wish to discuss with Dr. Zoya</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {clinicData.treatments.map((t) => {
                  const isSelected = selectedTreatment?.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        setSelectedTreatment(t);
                        if (t.advanceFee) setFeeOption(t.advanceFee);
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#C5A059] bg-[#FAF6EE] shadow-sm ring-1 ring-[#C5A059]' 
                          : 'border-[#E2E8F0] hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[11px] font-semibold text-[#C5A059] uppercase tracking-wider">
                          {t.category}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#C5A059]" />}
                      </div>
                      <div className="font-medium text-sm text-[#0F172A] mt-1">{t.title}</div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                        <span>Duration: {t.duration}</span>
                        <span className="font-semibold text-gray-700">{t.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!selectedTreatment}
                  className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 disabled:opacity-50"
                >
                  <span>Continue to Slot Selection</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Slot Picker */}
          {step === 2 && !bookingSuccess && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-semibold text-[#0F172A]">Select Consultation Date & Time</h4>
                <p className="text-xs text-[#64748B]">
                  Selected: <strong className="text-[#0F172A]">{selectedTreatment?.title}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Preferred Consultation Date</label>
                <div className="relative">
                  <input
                    type="date"
                    min={minDateStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-[#FAFAFA]"
                  />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Available Time Slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {slots.map((s) => {
                    const isSelected = selectedSlot === s.id;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setSelectedSlot(s.id)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isSelected 
                            ? 'border-[#C5A059] bg-[#FAF6EE] text-[#0F172A] font-bold shadow-sm ring-1 ring-[#C5A059]' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
                        }`}
                      >
                        <div className="text-xs font-semibold">{s.id}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{s.period} Slot</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE4DC] flex items-center space-x-2 text-xs text-gray-600">
                <Clock className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>Appointments are reserved exclusively for 45 minutes per patient to ensure comprehensive clinical examination.</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-black font-medium"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!selectedDate || !selectedSlot}
                  className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 disabled:opacity-50"
                >
                  <span>Patient Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Details Form */}
          {step === 3 && !bookingSuccess && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <h4 className="text-base font-semibold text-[#0F172A]">Patient Details</h4>
                <p className="text-xs text-[#64748B]">Provide accurate contact info for booking confirmation & reminders.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute right-4 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone / WhatsApp *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute right-4 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute right-4 top-3" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Specific Aesthetic or Dental Concerns (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Seeking consultation for acne scar reduction and smile alignment..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div className="flex justify-between items-center pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-black font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2"
                >
                  <span>Proceed to Advance Booking</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Pre-Paid Advance Consultation Fee Selection */}
          {step === 4 && !bookingSuccess && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-semibold text-[#0F172A]">Phase 2 Pre-Paid Booking & EMI</h4>
                <p className="text-xs text-[#64748B]">
                  As per clinic protocol, an advance consultation fee confirms your dedicated VIP slot with Dr. Zoya.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EAE4DC] text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Patient:</span>
                  <span className="font-semibold text-[#0F172A]">{formData.fullName} ({formData.phone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Procedure:</span>
                  <span className="font-semibold text-[#0F172A]">{selectedTreatment?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date & Time:</span>
                  <span className="font-semibold text-[#0F172A]">{selectedDate} at {selectedSlot}</span>
                </div>
              </div>

              {/* Fee Options (500 vs 1000) */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-gray-700">Select Advance Consultation Fee Tier</label>
                
                <div 
                  onClick={() => setFeeOption(500)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                    feeOption === 500 
                      ? 'border-[#C5A059] bg-[#FAF6EE] shadow-sm ring-1 ring-[#C5A059]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-[#0F172A]">Standard Clinical Assessment</span>
                      <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">In-Clinic</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Comprehensive 45-min skin & smile examination by Dr. Zoya. 100% adjustable against treatment cost.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg font-bold text-[#0F172A]">₹500</span>
                    {feeOption === 500 && <div className="text-[10px] text-[#C5A059] font-semibold mt-1">Selected</div>}
                  </div>
                </div>

                <div 
                  onClick={() => setFeeOption(1000)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                    feeOption === 1000 
                      ? 'border-[#C5A059] bg-[#FAF6EE] shadow-sm ring-1 ring-[#C5A059]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-[#0F172A]">Priority VIP Consultation & 3D Digital Scan</span>
                      <span className="bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-bold px-2 py-0.5 rounded border border-[#C5A059]/30">VIP Priority</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Includes comprehensive 3D AI Facial/Intraoral analysis, immediate slot guarantee, and video follow-up option.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg font-bold text-[#0F172A]">₹1,000</span>
                    {feeOption === 1000 && <div className="text-[10px] text-[#C5A059] font-semibold mt-1">Selected</div>}
                  </div>
                </div>
              </div>

              {/* EMI & Policy Notes */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center space-x-1 font-semibold text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Fee Adjustment Policy</span>
                </div>
                <p className="text-emerald-700">
                  The advance consultation fee (₹{feeOption}) is fully deducted from your procedure bill. 0% EMI plans available on clinic packages.
                </p>
              </div>

              <div className="flex justify-between items-center pt-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={isProcessingPayment}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-black font-medium"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={isProcessingPayment}
                  className="btn-gold px-7 py-3 rounded-xl text-sm font-semibold flex items-center space-x-2 disabled:opacity-75 shadow-lg"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Payment...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Pay ₹{feeOption} & Confirm Slot</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS SCREEN */}
          {bookingSuccess && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-50">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">Booking Confirmed</span>
                <h3 className="font-serif text-2xl font-bold text-[#0F172A] mt-1">
                  We look forward to welcoming you, {bookingSuccess.patientName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
                  Your advance consultation payment of <strong>₹{bookingSuccess.feeAmount}</strong> was verified and logged into our clinic CRM.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-[#0F172A]">{bookingSuccess.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Consultation For:</span>
                  <span className="font-medium text-[#0F172A]">{bookingSuccess.treatment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Reserved Slot:</span>
                  <span className="font-semibold text-emerald-700">{bookingSuccess.date} • {bookingSuccess.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Status:</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {bookingSuccess.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 text-[11px] text-gray-500">
                  <span>Clinic Address:</span>
                  <span className="text-right text-gray-700 max-w-[210px]">{clinicData.profile.contact.address}</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={getWhatsAppConfirmationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation to Clinic WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
