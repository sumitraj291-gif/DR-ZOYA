import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Smile,
  HeartPulse
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

// 3 Core Clinical Services matching the user's 3 uploaded hero images
const HERO_SERVICES = [
  {
    id: 'dental',
    step: '01',
    category: 'Pediatric & Cosmetic Dentistry',
    title: 'Painless Digital Smile Architecture & Gentle Family Care',
    description: 'Transforming smiles with painless laser dentistry, digital 3D smile design, pediatric care, and seamless ceramic restorations in a calm sanctuary.',
    image: '/images/hero/hero_dental.png',
    alt: 'Smiling child receiving gentle, friendly dental care at DNA Dental Clinic',
    doctor: 'Dr. Varsha Jha',
    doctorRole: 'Lead Dental Surgeon (BDS)',
    doctorImg: '/images/dr_varsha.png',
    themeColor: '#047857', // Emerald-700 for accessible WCAG contrast
    accentBg: 'from-emerald-500/10 via-amber-500/5 to-transparent',
    glowColor: 'rgba(4, 120, 87, 0.18)',
    stat: { value: '99.8%', label: 'Painless Patient Rating' },
    badges: [
      'Gentle Pediatric Dentistry',
      'Zero-Pain Laser RCT',
      'Digital Smile Aesthetics'
    ],
    ctaText: 'Book Dental Consultation',
    serviceKey: 'dental'
  },
  {
    id: 'skin',
    step: '02',
    category: 'Medical Aesthetics & Dermatology',
    title: 'Advanced Dermal Rejuvenation & Radiant Glass Skin',
    description: 'Science-backed medical facials, US-FDA laser toning, chemical peels, and customized dermal serums crafted to renew your natural skin vitality.',
    image: '/images/hero/hero_skin.png',
    alt: 'Patient receiving dermatologist-formulated facial serum and aesthetic skin treatment',
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Cosmetologist & Aesthetic Physician',
    doctorImg: '/images/dr_zoya.png',
    themeColor: '#C5A059', // Luxury Gold
    accentBg: 'from-[#C5A059]/15 via-amber-500/5 to-transparent',
    glowColor: 'rgba(197, 160, 89, 0.22)',
    stat: { value: '100%', label: 'Customized Formulations' },
    badges: [
      'HydraFacial & Laser Clarity',
      'Acne & Pigmentation Reset',
      'Zero Downtime Protocols'
    ],
    ctaText: 'Book Skin Consultation',
    serviceKey: 'skin'
  },
  {
    id: 'hair',
    step: '03',
    category: 'Trichology & Scalp Restoration',
    title: 'Clinical Scalp PRP Therapy & Follicle Regrowth',
    description: 'Targeted scalp micro-infusion, Growth Factor Concentrate (GFC), and clinical hair fall arrest protocols to awaken dormant follicles naturally.',
    image: '/images/hero/hero_hair.png',
    alt: 'Clinical trichology scalp examination by hair restoration specialist',
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Certified Hair & Scalp Specialist',
    doctorImg: '/images/dr_zoya.png',
    themeColor: '#0369A1', // Sky-700 for accessible WCAG contrast
    accentBg: 'from-sky-500/10 via-amber-500/5 to-transparent',
    glowColor: 'rgba(3, 105, 161, 0.18)',
    stat: { value: '+45%', label: 'Average Density Gain' },
    badges: [
      'Clinical PRP & GFC Therapy',
      'Dormant Root Activation',
      'Visible Density in 90 Days'
    ],
    ctaText: 'Book Scalp Analysis',
    serviceKey: 'hair'
  }
];

export const Hero3DAestheticExperience = () => {
  const { openBookingModal } = useClinic();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [touchStart, setTouchStart] = useState(0);

  const SLIDE_DURATION = 4000; // 4 seconds per service
  const UPDATE_INTERVAL = 40; // Update progress bar every 40ms

  // Auto-rotation timer with progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % HERO_SERVICES.length);
          return 0;
        }
        return prev + (UPDATE_INTERVAL / SLIDE_DURATION) * 100;
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPlaying, activeIndex]);

  const handleSelectService = (index) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SERVICES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SERVICES.length) % HERO_SERVICES.length);
    setProgress(0);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const activeService = HERO_SERVICES[activeIndex];

  return (
    <div 
      className="relative w-full rounded-3xl bg-gradient-to-br from-white via-[#FCFAF7] to-[#F7F2EA] border border-[#EAE4DC] shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden transition-all duration-500"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background glow matching active service */}
      <div 
        className="absolute inset-0 opacity-40 transition-colors duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 70% 45%, ${activeService.glowColor} 0%, transparent 70%)`
        }}
      />
      
      {/* Subtle luxury pattern lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Top Header Bar: Status & Play/Pause Controls */}
      <div className="relative z-10 px-4 sm:px-8 py-3.5 border-b border-[#EAE4DC]/60 flex items-center justify-between gap-3 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeService.themeColor }} />
          <span className="w-2 h-2 rounded-full -ml-3" style={{ backgroundColor: activeService.themeColor }} />
          <span className="text-xs font-bold tracking-wide text-[#0F172A]">
            Core Clinical Specialties
          </span>
          <span className="text-xs font-medium text-[#475569] hidden sm:inline">
            (Appearing Sequentially)
          </span>
        </div>

        {/* Play / Pause Rotation Control */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? "Pause rotation" : "Resume auto-play"}
          className="btn-icon w-8 h-8"
          aria-label={isPlaying ? "Pause rotation" : "Resume auto-play"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>
      </div>

      {/* Main Content Area: 2-Column Showcase */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center p-6 sm:p-10 gap-8 lg:gap-12 min-h-[420px]">
        
        {/* LEFT COLUMN: Specialty Tabs Directly Above Content & Clear Focus (6 cols) */}
        <div className="lg:col-span-6 space-y-4 text-left order-2 lg:order-1">
          {/* Specialty Selector Tabs: Direct Triggers Grouped with Content */}
          <div className="flex items-center gap-2 flex-wrap">
            {HERO_SERVICES.map((srv, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={srv.id}
                  onClick={() => handleSelectService(idx)}
                  className={`btn-pill relative overflow-hidden transition-all duration-300 ${
                    isActive ? 'btn-pill-active' : 'btn-pill-inactive'
                  }`}
                >
                  {/* Live progress indicator filling up on the active pill */}
                  {isActive && isPlaying && (
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-[#C5A059]/40 transition-all ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  <span className="relative z-10 opacity-70">{srv.step}</span>
                  <span className="relative z-10">
                    {srv.id === 'dental' && '🦷 Dental'}
                    {srv.id === 'skin' && '✨ Skin'}
                    {srv.id === 'hair' && '🌿 Hair'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#EAE4DC] shadow-xs">
            <span 
              className={`text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${activeService.id === 'skin' ? 'text-[#090D14]' : 'text-white'}`}
              style={{ backgroundColor: activeService.themeColor }}
            >
              {activeService.step}
            </span>
            <span className="text-xs font-semibold text-[#0F172A]">
              {activeService.category}
            </span>
          </div>

          {/* Service Title */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0F172A] leading-snug tracking-tight transition-all duration-300">
            {activeService.title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            {activeService.description}
          </p>

          {/* Streamlined Advantage Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {activeService.badges.map((badge, bIdx) => (
              <div 
                key={bIdx}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E2D9] text-xs font-medium text-[#0F172A] shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#85611E]" />
                <span>{badge}</span>
              </div>
            ))}
          </div>

          {/* Clear, Uncluttered CTA & Trust Note */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openBookingModal(activeService.serviceKey)}
              className="btn-gold px-6 py-3 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer group"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{activeService.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-xs text-[#475569] font-medium flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-[#85611E]" />
              <span>Lead: {activeService.doctor} ({activeService.doctorRole})</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: The 3 Cutout Images Appearing One by One (6 cols) */}
        <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2">
          
          {/* Circular Stage / Pedestal with Luxury Glow */}
          <div className="relative w-full max-w-[500px] aspect-[4/3] flex items-center justify-center">
            
            {/* Ambient Multi-Ring Halo Backdrop */}
            <div 
              className="absolute w-[80%] h-[80%] rounded-full transition-all duration-700 blur-2xl opacity-60"
              style={{ backgroundColor: activeService.glowColor }}
            />
            <div className="absolute w-[90%] h-[90%] rounded-full border border-[#C5A059]/20 border-dashed animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[75%] h-[75%] rounded-full bg-gradient-to-b from-white/90 to-[#F5EFE6]/80 shadow-inner border border-white/80" />

            {/* The 3 Images Stacked - Active one is smoothly transitioned in */}
            {HERO_SERVICES.map((srv, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={srv.id}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                    isActive 
                      ? 'opacity-100 scale-100 translate-y-0 z-20 pointer-events-auto' 
                      : 'opacity-0 scale-95 translate-y-4 z-10 pointer-events-none'
                  }`}
                >
                  <img
                    src={srv.image}
                    alt={srv.alt}
                    className="max-w-full max-h-[340px] w-auto h-auto object-contain drop-shadow-[0_20px_30px_rgba(15,23,42,0.18)] select-none hover:scale-[1.02] transition-transform duration-500"
                    loading="eager"
                  />
                </div>
              );
            })}

            {/* Floating Trust Card Top-Right */}
            <div className="absolute -top-2 right-2 sm:right-6 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E2D9CE] shadow-lg flex items-center space-x-2.5 animate-[bounce_4s_ease-in-out_infinite]">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${activeService.id === 'skin' ? 'text-[#090D14]' : 'text-white'}`}
                style={{ backgroundColor: activeService.themeColor }}
              >
                {activeService.stat.value}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#0F172A] leading-tight">
                  Clinical Benchmark
                </div>
                <div className="text-xs text-[#475569]">
                  {activeService.stat.label}
                </div>
              </div>
            </div>

            {/* Floating Trust Card Bottom-Left */}
            <div className="absolute -bottom-2 left-2 sm:left-4 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E2D9CE] shadow-lg flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-[#85611E]" />
              <div className="text-left">
                <div className="text-xs font-bold text-[#0F172A] leading-tight">
                  US-FDA Approved Tech
                </div>
                <div className="text-xs text-[#475569]">
                  Sterile & Pain-Free Setup
                </div>
              </div>
            </div>

            {/* Left / Right Arrow Controls */}
            <button
              onClick={handlePrev}
              aria-label="Previous treatment"
              className="btn-icon absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next treatment"
              className="btn-icon absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>

      {/* Bottom Service Cards / Carousel Dots */}
      <div className="relative z-10 px-4 sm:px-8 py-3.5 bg-[#FAF7F2] border-t border-[#EAE4DC] grid grid-cols-3 gap-2 sm:gap-4">
        {HERO_SERVICES.map((srv, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={srv.id}
              onClick={() => handleSelectService(idx)}
              className={`btn-ghost p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-300 flex items-center space-x-2.5 sm:space-x-3 cursor-pointer border ${
                isActive 
                  ? 'bg-white border-[#C5A059] shadow-sm' 
                  : 'bg-white/50 border-transparent hover:bg-white/80 hover:border-[#E2D9CE]'
              }`}
            >
              {/* Mini thumbnail preview of user's image */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DC] overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                <img 
                  src={srv.image} 
                  alt={srv.category} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title & Step */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1.5">
                  <span 
                    className={`text-xs font-bold px-1.5 py-0.2 rounded-full uppercase ${srv.id === 'skin' ? 'text-[#090D14]' : 'text-white'}`}
                    style={{ backgroundColor: srv.themeColor }}
                  >
                    {srv.step}
                  </span>
                  <span className={`text-xs font-bold truncate ${isActive ? 'text-[#0F172A]' : 'text-[#475569]'}`}>
                    {srv.id === 'dental' && 'Dental Care'}
                    {srv.id === 'skin' && 'Skin Glow'}
                    {srv.id === 'hair' && 'Hair Restoration'}
                  </span>
                </div>
                <div className="text-xs text-[#475569] truncate hidden sm:block">
                  {srv.category}
                </div>
              </div>

              {/* Active pulse */}
              {isActive && (
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: srv.themeColor }} />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default Hero3DAestheticExperience;
