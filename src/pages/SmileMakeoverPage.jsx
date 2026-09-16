import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Clock, 
  ShieldCheck,
  Zap,
  Camera
} from 'lucide-react';

export const SmileMakeoverPage = () => {
  const { openBookingModal, navigateTo } = useClinic();

  const dsdSteps = [
    {
      step: "01",
      title: "3D High-Speed Digital Scan",
      desc: "We capture a micron-precise 3D digital model of your teeth in under 3 minutes using the iTero Element intraoral scanner. Completely zero messy putty impressions."
    },
    {
      step: "02",
      title: "Facial Proportion & Smile Architecture",
      desc: "Dr. Zoya maps your lip dynamics, dental midline, buccal corridors, and incisal edges to engineer a smile that matches your unique facial geometry."
    },
    {
      step: "03",
      title: "3D Trial Mockup (Preview First)",
      desc: "Before any bonding or irreversible change, we place a provisional mock smile directly over your teeth so you can look in the mirror and approve your new look."
    },
    {
      step: "04",
      title: "Precision Bonding & Transformation",
      desc: "Using handcrafted ultra-thin ceramic veneers or digital Invisalign® aligners, your permanent Hollywood smile is realized with lifelong durability."
    }
  ];

  return (
    <div className="py-10 sm:py-16 space-y-16">
      
      {/* 1. HERO */}
      <section className="clinic-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center space-x-2 bg-[#FAF6EE] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Smile Design Studio</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#0F172A] leading-tight">
              Architecting Smiles That Elevate Your Entire Persona
            </h1>

            <p className="text-xs sm:text-sm text-[#576579] leading-relaxed max-w-xl">
              A bespoke smile makeover is not about artificial white chicklets. It is an art form engineered with mathematical symmetry, natural tooth translucency, and gentle minimally invasive technology.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openBookingModal()}
                className="btn-gold px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 3D Smile Consultation (₹1,000)</span>
              </button>
              
              <button
                onClick={() => navigateTo('ai-analyzer')}
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-white border border-[#C5A059]/50 text-[#0F172A] hover:bg-[#F5EFE6] transition-all flex items-center space-x-2"
              >
                <Camera className="w-4 h-4 text-[#C5A059]" />
                <span>AI Smile Harmony Check</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E8E2D9] text-xs">
              <div>
                <span className="font-serif font-bold text-lg text-[#0F172A] block">100%</span>
                <span className="text-gray-500 text-[11px]">3D Pre-Visualized</span>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#0F172A] block">E-Max</span>
                <span className="text-gray-500 text-[11px]">Ceramic Veneers</span>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#0F172A] block">Certified</span>
                <span className="text-gray-500 text-[11px]">Invisalign Provider</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/dental_smile_makeover.jpg"
                alt="Digital Smile Design Consultation with Dr. Zoya"
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-sm p-3 rounded-xl text-white text-xs border border-white/20 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#C5A059]">3D Predictive Smile Simulation</div>
                  <div className="text-[10px] text-gray-300">See your final smile before starting</div>
                </div>
                <Zap className="w-4 h-4 text-[#C5A059]" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. DSD PROTOCOL PROCESS */}
      <section className="bg-[#FAF8F5] py-14 border-y border-[#EAE4DC]">
        <div className="clinic-container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              The 4-Step Protocol
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#0F172A]">
              How We Engineer Your Signature Smile
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Predictable, painless, and completely tailored to your facial proportions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dsdSteps.map((s, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-subtle space-y-3 relative">
                <span className="font-serif text-3xl font-bold text-[#C5A059]/40 block">
                  {s.step}
                </span>
                <h3 className="font-serif text-base font-bold text-[#0F172A]">
                  {s.title}
                </h3>
                <p className="text-xs text-[#576579] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Smile Transformation Case */}
      <section className="clinic-container">
        <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 sm:p-10 shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059] bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#C5A059]/30">
              Documented Clinical Case
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Real Smile Transformation at DNA Clinic
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Full incisal edge restoration and porcelain aesthetic smile reconstruction. Performed with digital mock-ups and zero nerve trauma.
            </p>
            <div className="space-y-2 text-xs text-gray-700 pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Lead Dental Surgeon: <strong>Dr. Varsha Jha (BDS)</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Supervised by: <strong>Dr. Zoya Rana (Director)</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Timeline: <strong>2 Clinical Sittings</strong></span>
              </div>
            </div>
            <button
              onClick={() => openBookingModal()}
              className="btn-gold px-6 py-2.5 rounded-full text-xs font-semibold mt-2"
            >
              Book Smile Consultation
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE4DC]">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-200">
                <img
                  src="/images/ba_smile_before.png"
                  alt="Smile Before Treatment"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                  Before
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 border border-[#C5A059]/40">
                <img
                  src="/images/ba_smile_after.png"
                  alt="Smile After Treatment"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#C5A059] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase shadow-sm">
                  After
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPARISON: VENEERS VS INVISALIGN */}
      <section className="clinic-container max-w-4xl">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Treatment Comparison
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#0F172A]">
            Porcelain Veneers vs. Invisalign® Clear Aligners
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E2D9] shadow-subtle overflow-hidden">
          <div className="grid grid-cols-3 bg-[#0F172A] text-white text-xs font-bold p-4">
            <div>Feature</div>
            <div className="text-[#C5A059]">Handcrafted Veneers</div>
            <div>Invisalign® Aligners</div>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            <div className="grid grid-cols-3 p-4 hover:bg-gray-50 items-center">
              <span className="font-semibold text-gray-700">Primary Goal</span>
              <span className="text-gray-900">Instant shape, color & symmetry correction</span>
              <span className="text-gray-600">Discreetly straightens natural teeth & bite</span>
            </div>
            <div className="grid grid-cols-3 p-4 hover:bg-gray-50 items-center">
              <span className="font-semibold text-gray-700">Treatment Timeline</span>
              <span className="text-[#C5A059] font-bold">2 to 3 Visits (7 - 10 Days)</span>
              <span className="text-gray-600">6 to 12 Months</span>
            </div>
            <div className="grid grid-cols-3 p-4 hover:bg-gray-50 items-center">
              <span className="font-semibold text-gray-700">Stain Resistance</span>
              <span className="text-emerald-700 font-semibold">100% Non-Porous Ceramic (Never Stains)</span>
              <span className="text-gray-600">Aligners cleaned daily</span>
            </div>
            <div className="grid grid-cols-3 p-4 hover:bg-gray-50 items-center">
              <span className="font-semibold text-gray-700">Longevity</span>
              <span className="text-gray-900">15 to 20+ Years</span>
              <span className="text-gray-600">Permanent with nightly retainers</span>
            </div>
            <div className="grid grid-cols-3 p-4 hover:bg-gray-50 items-center">
              <span className="font-semibold text-gray-700">EMI & Financing</span>
              <span className="text-gray-900">0% Interest 6 - 12 Month Plans</span>
              <span className="text-gray-900">Flexible Monthly EMI Available</span>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => openBookingModal()}
            className="btn-gold px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg"
          >
            Schedule 3D Digital Smile Consultation
          </button>
        </div>
      </section>

    </div>
  );
};
