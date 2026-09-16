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
  HeartHandshake,
  UserCheck,
  Stethoscope,
  Microscope,
  Check
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-currentColor`} viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const HomePage = () => {
  const { clinicData, navigateTo, openBookingModal } = useClinic();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Core Service Pillars from Live DNA Clinic
  const specialties = [
    {
      title: "Advanced Skin Care",
      tagline: "Clear, glowing skin with personalized dermatology solutions.",
      procedures: ["Medical HydraFacial", "Pigmentation & Melasma", "Acne & Scar Remodeling", "Anti-Aging Baby Botox"],
      image: "/images/advanced_facials.png",
      route: "treatments"
    },
    {
      title: "Complete Dental Care",
      tagline: "Bright, healthy smiles with expert dental care & precision treatments.",
      procedures: ["Painless Root Canal", "Invisible Braces & Aligners", "Smile Designing & Veneers", "Laser Teeth Whitening"],
      image: "/images/general_dentistry.png",
      route: "smile-makeover"
    },
    {
      title: "Hair Rejuvenation",
      tagline: "Healthy scalp and stronger hair with advanced clinical treatments.",
      procedures: ["Clinical PRP Therapy", "Growth Factor Concentrate (GFC)", "Hair Fall Arrest Protocol", "Hair Transplant Consult"],
      image: "/images/hair_rejuvenation.png",
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
              <div className="inline-flex items-center space-x-2 bg-white/95 border border-[#C5A059]/50 px-3.5 py-1.5 rounded-full shadow-xs">
                <img src="/images/dna_logo.png" alt="DNA Clinic" className="w-4 h-4 object-contain" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  DNA CLINICS • DEHRADUN & MUZAFFARNAGAR
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

                {/* Primary Doctor Portrait (Dr. Zoya Rana from live site) */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="/images/dr_zoya_rana.png"
                    alt="Dr. Zoya Rana - Director DNA Clinic"
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
                          {clinicData.profile.doctorTitle}
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
                  <span className="text-[11px] font-semibold tracking-wide">Dehradun & Muzaffarnagar</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SPECIALTY PILLARS (Real Live DNA Clinic Services) */}
      <section className="clinic-container">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Our Clinical Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F172A]">
            Your Destination for Advanced & Complete Care
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Certified specialists, modern clinical infrastructure, and ethical practices under one trusted roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {specialties.map((spec, i) => (
            <div 
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img 
                  src={spec.image} 
                  alt={spec.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="font-serif font-bold text-base tracking-wide">{spec.title}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-[#576579] leading-relaxed mb-4">
                    {spec.tagline}
                  </p>
                  <ul className="space-y-2 text-xs text-[#1E293B]">
                    {spec.procedures.map((p, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => navigateTo(spec.route)}
                    className="text-xs font-bold text-[#0F172A] hover:text-[#C5A059] flex items-center space-x-1 transition-colors"
                  >
                    <span>Explore Treatments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => openBookingModal()}
                    className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE DNA CLINIC (From Live dnaclinicindia.com) */}
      <section className="bg-[#FAF8F5] py-16 border-y border-[#EAE4DC]">
        <div className="clinic-container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              The DNA Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F172A]">
              "Precision, Care, Confidence and Integrity"
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Why thousands of patients in Dehradun & Muzaffarnagar trust DNA Clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicData.whyChooseUs?.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-subtle space-y-2.5 text-left hover:border-[#C5A059] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center font-bold text-xs border border-[#C5A059]/30">
                  {idx + 1}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0F172A]">{item.title}</h3>
                <p className="text-xs text-[#576579] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEET THE EXPERTS (Real 3 Doctors from DNA Clinic) */}
      <section className="clinic-container">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Best Specialists
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F172A]">
            Meet the Experts
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Our panel of certified doctors dedicated to your skin, hair, and smile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clinicData.profile.team?.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white rounded-3xl border border-[#E8E2D9] shadow-subtle overflow-hidden flex flex-col justify-between hover:shadow-card transition-all"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={doc.image} 
                  alt={doc.name}
                  className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-[#090D14]/85 backdrop-blur-sm px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-[#C5A059]/40">
                  {doc.role}
                </div>
              </div>

              <div className="p-6 text-left space-y-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F172A]">{doc.name}</h3>
                  <div className="text-xs text-[#C5A059] font-medium mt-0.5">{doc.qualification}</div>
                </div>

                <p className="text-xs text-[#576579] leading-relaxed">
                  Specialty: <strong>{doc.specialty}</strong>
                </p>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">Dehradun / Muzaffarnagar</span>
                  <button
                    onClick={() => openBookingModal()}
                    className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    Consult Doctor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SEE THE DIFFERENCE: BEFORE & AFTER SHOWCASE */}
      <section className="bg-[#FAF6EE] py-16 border-y border-[#EAE4DC]">
        <div className="clinic-container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Real Transformations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F172A]">
              See the Difference in Your Smile & Skin
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Actual before and after clinical cases performed by Dr. Zoya Rana and team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Smile Transformation */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-subtle space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#C5A059]/30">
                  Smile Transformation
                </span>
                <span className="text-xs text-gray-500">2 Clinical Visits</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                See the Difference in Your Smile
              </h3>
              <p className="text-xs text-gray-600">
                Our advanced dental treatments restore damaged or missing teeth, enhance aesthetics, and improve overall oral health.
              </p>

              {/* Real Before/After Images side-by-side */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl overflow-hidden border border-gray-200 relative aspect-[4/3]">
                  <img src="/images/ba_smile_before.png" alt="Smile Before" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">Before</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-[#C5A059] relative aspect-[4/3]">
                  <img src="/images/ba_smile_after.png" alt="Smile After" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-[#C5A059] text-white text-[10px] font-bold px-2 py-0.5 rounded">After</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-700">Ceramic Veneers & Whitening</span>
                <button
                  onClick={() => openBookingModal()}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Get Your Smile
                </button>
              </div>
            </div>

            {/* Skin Transformation */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-subtle space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#C5A059]/30">
                  Skin Transformation
                </span>
                <span className="text-xs text-gray-500">6 Weeks Protocol</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                See the Difference in Your Skin
              </h3>
              <p className="text-xs text-gray-600">
                Advanced dermatology treatments designed to reduce acne, pigmentation, and signs of ageing while restoring healthy, glowing skin.
              </p>

              {/* Real Before/After Images side-by-side */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl overflow-hidden border border-gray-200 relative aspect-[4/3]">
                  <img src="/images/ba_skin_before.png" alt="Skin Before" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">Before</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-[#C5A059] relative aspect-[4/3]">
                  <img src="/images/ba_skin_after.png" alt="Skin After" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-[#C5A059] text-white text-[10px] font-bold px-2 py-0.5 rounded">After</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-700">Acne & Pore Revision</span>
                <button
                  onClick={() => openBookingModal()}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Get Your Glow
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI SCANNER PROMOTIONAL BANNER (Phase 2 Feature) */}
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
                  *Non-diagnostic preliminary guidance only.
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

      {/* 7. INSTAGRAM SHOWCASE REEL (@dnaclinicindia) */}
      <section className="clinic-container">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-2 text-[#C5A059] font-bold text-xs uppercase tracking-wider">
            <InstagramIcon className="w-4 h-4" />
            <span>Follow Our Live Work</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F172A]">
            Instagram : @dnaclinicindia
          </h2>
          <p className="text-xs text-gray-500">
            Real patient results, clinical demonstrations, and skincare insights.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {clinicData.instagramFeed?.map((post) => (
            <a
              key={post.id}
              href={clinicData.profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-gray-200 block"
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <InstagramIcon className="w-6 h-6 text-white" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center pt-6">
          <a
            href={clinicData.profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#FAF8F5] hover:bg-[#F1ECE5] border border-[#C5A059] text-[#0F172A] px-5 py-2.5 rounded-full text-xs font-bold transition-all"
          >
            <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
            <span>View @dnaclinicindia on Instagram</span>
          </a>
        </div>
      </section>

      {/* 8. REAL GOOGLE REVIEWS FROM PATIENTS */}
      <section className="bg-[#FAF6EE] py-16 border-y border-[#EAE4DC]">
        <div className="clinic-container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center space-x-1 text-[#C5A059]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
              ))}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F172A]">
              Hear From Our Happy Clients
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Real verified Google reviews from patients treated by Dr. Zoya Rana and Dr. Varsha Jha.
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

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
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

      {/* 10. BOTTOM BOOKING CTA BANNER */}
      <section className="clinic-container pb-6">
        <div className="bg-[#0A111C] rounded-3xl p-8 sm:p-12 text-center text-white border border-[#C5A059]/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Start Your Transformation
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
              Reserve Your Private Consultation with Dr. Zoya & Team
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Step into our Dehradun or Muzaffarnagar clinic. The advance consultation fee is 100% deductible against treatments.
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
