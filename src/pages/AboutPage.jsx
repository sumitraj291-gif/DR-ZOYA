import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  GraduationCap, 
  Heart, 
  Globe2,
  Building2,
  Clock
} from 'lucide-react';

export const AboutPage = () => {
  const { clinicData, openBookingModal } = useClinic();

  const credentials = [
    {
      degree: "MBBS & MD in Dermatology",
      institution: "Top Medical University, New Delhi",
      detail: "Graduated with honors; specialized in advanced dermal pathology, pigmentary disorders, and scar biology."
    },
    {
      degree: "Fellowship in Aesthetic Medicine (FAM)",
      institution: "Institute of Aesthetic Medicine, Frankfurt / Munich, Germany",
      detail: "Advanced hands-on masterclasses in micro-cannula facial contouring, bio-remodeling, and thread architecture."
    },
    {
      degree: "Certified Digital Smile Architect",
      institution: "DSD International Academy, London",
      detail: "Intensive training under global smile innovators in computer-engineered veneers and clear aligner biomechanics."
    }
  ];

  const clinicValues = [
    {
      title: "Ethical Subtlety",
      desc: "We strictly advise against the 'plastic, over-filled' aesthetic. We enhance your natural anatomical balance so nobody can tell you had work done."
    },
    {
      title: "Science, Not Trends",
      desc: "We only introduce modalities that are US-FDA cleared with extensive peer-reviewed clinical trials demonstrating long-term safety and efficacy."
    },
    {
      title: "Absolute Confidentiality",
      desc: "Our private entrance, direct VIP valet, and discrete consultation suites ensure complete discretion for high-profile and privacy-conscious patients."
    }
  ];

  return (
    <div className="py-10 sm:py-16 space-y-16">
      
      {/* 1. HERO BIO */}
      <section className="clinic-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative max-w-md mx-auto">
              <img
                src="/images/dr_zoya_portrait.jpg"
                alt="Dr. Zoya Qureshi"
                className="w-full h-[480px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="font-serif text-2xl font-bold text-[#C5A059]">{clinicData.profile.doctorName}</div>
                <div className="text-xs text-gray-200">{clinicData.profile.doctorRole}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center space-x-2 bg-[#FAF6EE] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Meet The Founder & Chief Physician</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F172A] leading-tight">
              Where Medical Precision Meets Artistic Facial Harmony
            </h1>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Dr. Zoya founded this boutique clinic with a singular vision: to liberate aesthetic medicine from commercialized, cookie-cutter treatments. She believes that your face is not a canvas for temporary internet trends, but a biological masterpiece requiring deep anatomical understanding.
            </p>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              With over 12 years of specialized clinical experience and 15,000+ satisfied transformations across India and abroad, Dr. Zoya personally evaluates every patient to formulate a comprehensive, multidimensional treatment strategy.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => openBookingModal()}
                className="btn-gold px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book In-Clinic Consultation (₹500 / ₹1,000)</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ACADEMIC CREDENTIALS & FELLOWSHIPS */}
      <section className="bg-[#FAF8F5] py-14 border-y border-[#EAE4DC]">
        <div className="clinic-container max-w-4xl">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Qualifications & Credentials
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#0F172A]">
              Rigorous Medical Foundation
            </h2>
          </div>

          <div className="space-y-4">
            {credentials.map((c, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-subtle flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center flex-shrink-0 mt-1 border border-[#C5A059]/30">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="font-serif text-base font-bold text-[#0F172A]">{c.degree}</h3>
                  <div className="text-xs font-medium text-[#C5A059]">{c.institution}</div>
                  <p className="text-xs text-[#576579] leading-relaxed pt-0.5">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ETHICAL CLINICAL VALUES */}
      <section className="clinic-container">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            The Clinic Promise
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#0F172A]">
            Our Foundational Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clinicValues.map((val, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-subtle space-y-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center border border-[#C5A059]/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0F172A]">{val.title}</h3>
              <p className="text-xs text-[#576579] leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
