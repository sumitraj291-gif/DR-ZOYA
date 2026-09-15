import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  MapPin, 
  Phone,
  Camera,
  Layers,
  HeartHandshake
} from 'lucide-react';

export const HomePage = () => {
  const { clinicData, navigateTo, openBookingModal } = useClinic();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const specialties = [
    {
      title: "Aesthetic Dermatology",
      tagline: "Luminous, glass-like skin without invasive surgery.",
      icon: Sparkles,
      procedures: ["HydraFacial Elite MD®", "PicoSure® Melasma Laser", "Acne Scar Remodeling", "Medical Peels"],
      image: "/images/treatment_aesthetic.jpg",
      route: "treatments"
    },
    {
      title: "Cosmetic Dentistry & Smile Design",
      tagline: "Digital 3D smile planning with invisible aligners & veneers.",
      icon: Award,
      procedures: ["Invisalign® Aligners", "Handcrafted E-Max Veneers", "Zoom! Laser Whitening", "Gum Contouring"],
      image: "/images/dental_smile_makeover.jpg",
      route: "smile-makeover"
    },
    {
      title: "Anti-Aging & Injectables",
      tagline: "Natural, non-frozen facial contouring & wrinkle softening.",
      icon: ShieldCheck,
      procedures: ["Micro-Dosed Baby Botox", "Juvederm® Lip & Jawline Fillers", "Profhilo® Skin Boosters", "Thread Lift"],
      image: "/images/dr_zoya_portrait.jpg",
      route: "treatments"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-12 pb-12 sm:pb-20 bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6]/60 to-[#FAF8F5] border-b border-[#EAE4DC]">
        <div className="clinic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Luxury Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/90 border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                  {clinicData.hero.badge}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] leading-[1.12] font-semibold tracking-tight">
                {clinicData.hero.titlePrimary}{' '}
                <span className="italic block mt-1 font-normal text-[#C5A059] font-serif">
                  {clinicData.hero.titleHighlight}
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-base text-[#475569] max-w-xl leading-relaxed">
                {clinicData.hero.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openBookingModal()}
                  className="btn-gold px-7 py-3.5 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation (₹500 / ₹1,000)</span>
                </button>

                <button
                  onClick={() => navigateTo('ai-analyzer')}
                  className="px-6 py-3.5 rounded-full text-sm font-semibold bg-white border border-[#C5A059]/50 text-[#0F172A] hover:bg-[#F5EFE6] transition-all flex items-center space-x-2 shadow-xs"
                >
                  <Camera className="w-4 h-4 text-[#C5A059]" />
                  <span>Try AI Smile & Skin Scan</span>
                </button>
              </div>

              {/* Key Trust Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E8E2D9]">
                {clinicData.hero.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A]">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-[#64748B] font-medium leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Imagery with Luxury Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Background decorative glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#C5A059]/20 via-[#DFBE7B]/10 to-transparent rounded-3xl blur-2xl -z-10" />

                {/* Primary Doctor Portrait */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="/images/dr_zoya_portrait.jpg"
                    alt="Dr. Zoya Qureshi"
                    className="w-full h-[420px] sm:h-[480px] object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                  
                  {/* Floating Doctor Credentials Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-[#C5A059]/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-serif font-bold text-[#0F172A] text-sm">
                          {clinicData.profile.doctorName}
                        </div>
                        <div className="text-[10px] text-[#C5A059] font-medium uppercase tracking-wider">
                          Chief Aesthetic & Smile Specialist
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 bg-[#FAF6EE] px-2 py-1 rounded-full border border-[#C5A059]/30">
                        <Star className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
                        <span className="text-xs font-bold text-[#0F172A]">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Trust Badge Tag */}
                <div className="absolute -top-3 -left-3 bg-[#090D14] text-white py-2 px-3.5 rounded-xl shadow-xl border border-[#C5A059]/40 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-[11px] font-semibold tracking-wide">Board Certified • 12+ Yrs</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SPECIALTY PILLARS */}
      <section className="clinic-container">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Centres of Clinical Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F172A]">
            Precision Aesthetics Crafted For You
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            We harmonize medical dermatology, facial artistry, and cosmetic dentistry under one bespoke sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {specialties.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <div 
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={spec.image} 
                    alt={spec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white flex items-center space-x-2">
                    <div className="p-1.5 bg-[#C5A059] rounded-lg text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-serif font-bold text-sm tracking-wide">{spec.title}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-[#576579] leading-relaxed mb-4">
                      {spec.tagline}
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#1E293B]">
                      {spec.procedures.map((p, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => navigateTo(spec.route)}
                      className="text-xs font-bold text-[#0F172A] hover:text-[#C5A059] flex items-center space-x-1 transition-colors"
                    >
                      <span>Explore Procedures</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openBookingModal()}
                      className="text-xs font-semibold text-[#C5A059] hover:underline"
                    >
                      Book Consult
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. MEET DR. ZOYA SPOTLIGHT */}
      <section className="bg-[#0A111C] text-white py-16 sm:py-20 border-y border-[#C5A059]/20 relative overflow-hidden">
        <div className="clinic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Doctor Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl max-w-md mx-auto">
                <img
                  src="/images/dr_zoya_portrait.jpg"
                  alt="Dr. Zoya Qureshi Portrait"
                  className="w-full h-[440px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <div className="font-serif text-xl font-bold text-[#C5A059]">
                    {clinicData.profile.doctorName}
                  </div>
                  <div className="text-xs text-gray-300">
                    {clinicData.profile.doctorTitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Biography & Clinical Philosophy */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                Doctor's Philosophy & Heritage
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">
                "True aesthetic mastery is invisible. It looks like you, at your most rested, radiant self."
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {clinicData.profile.doctorBio}
              </p>

              {/* Accreditations list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {clinicData.profile.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-gray-300">
                    <Award className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openBookingModal()}
                  className="btn-gold px-6 py-3 rounded-full text-xs font-bold flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Consultation with Dr. Zoya</span>
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className="px-5 py-3 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
                >
                  Read Full Physician Profile
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. AI SCANNER PROMOTIONAL BANNER (Phase 2 Feature) */}
      <section className="clinic-container">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#121E2C] via-[#0E1724] to-[#1A2634] text-white p-8 sm:p-12 border border-[#C5A059]/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center space-x-2 bg-[#C5A059]/20 border border-[#C5A059]/50 text-[#C5A059] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                <Camera className="w-3 h-3" />
                <span>Phase 2 Web AR / AI Experience</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Try Our Interactive AI Smile & Skin Analyzer
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                Take a quick selfie or upload a photo to receive preliminary guidance on skin hydration, pigmentation, and smile alignment. Get personalized treatment recommendations in seconds.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('ai-analyzer')}
                  className="btn-gold px-6 py-3 rounded-full text-xs font-bold flex items-center space-x-2 shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                  <span>Start Instant AI Analysis</span>
                </button>
                <span className="text-[11px] text-gray-400">
                  *Non-diagnostic guidance only.
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-56 rounded-2xl border-2 border-[#C5A059]/60 overflow-hidden shadow-xl bg-black/40 p-2 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full border border-dashed border-[#C5A059] flex items-center justify-center text-[#C5A059] animate-pulse">
                  <Camera className="w-8 h-8" />
                </div>
                <div className="text-xs font-medium text-[#C5A059]">Facial AI Mesh Active</div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#C5A059] h-full w-2/3 animate-pulse" />
                </div>
                <span className="text-[10px] text-gray-400">Smile & Dermal Detection</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CLINIC INTERIOR & VIP SANCTUARY */}
      <section className="clinic-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-card">
            <img
              src="/images/clinic_interior.jpg"
              alt="Dr. Zoya Luxury Clinic Reception"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              The Clinic Sanctuary
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F172A]">
              Designed for Absolute Privacy, Calm & Comfort
            </h3>
            <p className="text-xs sm:text-sm text-[#576579] leading-relaxed">
              Located on Golf Course Road, Gurugram, our clinic is crafted with bespoke acoustic privacy, HEPA-filtered sterile air, private VIP consultation lounges, and complimentary valet parking.
            </p>

            <ul className="space-y-2 text-xs text-[#1E293B] pt-2">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Zero waiting time policy with pre-booked slots</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>US-FDA approved Class IV medical lasers and iTero 3D scanners</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Private recovery suites with herbal refreshment service</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('contact')}
                className="btn-obsidian px-5 py-2.5 rounded-full text-xs font-semibold"
              >
                View Directions & Timings
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. PATIENT REVIEWS & SOCIAL PROOF */}
      <section className="bg-[#FAF6EE] py-16 border-y border-[#EAE4DC]">
        <div className="clinic-container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center space-x-1 text-[#C5A059]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
              ))}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F172A]">
              Over 15,000 Verified Transformations
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Real reviews from real patients who experienced Dr. Zoya's gentle clinical touch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicData.testimonials.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-subtle flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-[#C5A059]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">{rev.date}</span>
                  </div>
                  <p className="text-xs text-gray-700 italic leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="font-semibold text-xs text-[#0F172A]">{rev.name}</div>
                  <div className="text-[10px] text-[#C5A059] font-medium">{rev.verifiedProcedure}</div>
                  <div className="text-[9px] text-gray-400">{rev.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="clinic-container max-w-3xl">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#0F172A]">
            Patient FAQs & Clinical Inquiries
          </h2>
        </div>

        <div className="space-y-3">
          {clinicData.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl border border-[#EAE4DC] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-[#0F172A] hover:text-[#C5A059] transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#C5A059]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#576579] leading-relaxed border-t border-gray-50 pt-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. BOTTOM BOOKING CTA BANNER */}
      <section className="clinic-container pb-6">
        <div className="bg-[#0A111C] rounded-3xl p-8 sm:p-12 text-center text-white border border-[#C5A059]/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Start Your Transformation
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
              Reserve Your Private Consultation with Dr. Zoya
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Step into our serene clinic or consult virtually. Advance consultation fee is 100% deductible against treatments.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => openBookingModal()}
                className="btn-gold px-8 py-3.5 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment (₹500 / ₹1,000)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
