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
  Clock,
  MapPin,
  Check
} from 'lucide-react';

export const AboutPage = () => {
  const { clinicData, openBookingModal } = useClinic();

  const clinicValues = [
    {
      title: "Ethical Subtlety",
      desc: "We strictly advise against the 'plastic, over-filled' look. We enhance your natural anatomical balance so nobody can tell you had work done."
    },
    {
      title: "Science, Not Trends",
      desc: "We only introduce modalities that are US-FDA cleared with extensive clinical testing demonstrating safety, comfort, and efficacy."
    },
    {
      title: "Patient Comfort First",
      desc: "From painless dental extractions to soothing medical facials, our Dehradun & Muzaffarnagar centres are designed for zero anxiety."
    }
  ];

  return (
    <div className="py-10 sm:py-16 space-y-16">
      
      {/* 1. HERO BIO */}
      <section className="clinic-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative max-w-md mx-auto bg-gray-100">
              <img
                src="/images/dr_zoya_rana.png"
                alt="Dr. Zoya Rana - Director DNA Clinic"
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
              <span>About DNA Clinic India</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F172A] leading-tight">
              "Precision, Care, Confidence and Integrity — That's the DNA Standard"
            </h1>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              At <strong>DNA Clinics</strong>, we provide expert skin, hair, and complete dental care. With state-of-the-art facilities located in <strong>Dehradun (Uttarakhand) and Muzaffarnagar (Uttar Pradesh)</strong>, DNA Clinics brings together certified specialists, modern infrastructure, and ethical medical practices under one trusted brand.
            </p>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Founded and led by <strong>Dr. Zoya Rana</strong>, our philosophy is anchored on customized treatment plans. We believe that your health and aesthetics deserve undivided clinical attention without commercial rush.
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

      {/* 2. MEET THE FULL SPECIALIST TEAM */}
      <section className="bg-[#FAF8F5] py-14 border-y border-[#EAE4DC]">
        <div className="clinic-container">
          <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Specialist Panel
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#0F172A]">
              Meet Our Expert Doctors
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Experienced, patient-focused clinicians at your service across both clinic locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clinicData.profile.team?.map((doc) => (
              <div key={doc.id} className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-subtle flex flex-col justify-between space-y-4 text-left">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                  <span className="absolute bottom-2 left-2 bg-[#090D14]/80 text-[#C5A059] text-[10px] font-bold px-2 py-0.5 rounded">
                    {doc.role}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#0F172A]">{doc.name}</h3>
                  <div className="text-xs text-[#C5A059] font-medium">{doc.qualification}</div>
                  <p className="text-xs text-[#576579] pt-1">Focused On: <strong>{doc.specialty}</strong></p>
                </div>

                <button
                  onClick={() => openBookingModal()}
                  className="btn-gold w-full py-2 rounded-xl text-xs font-semibold"
                >
                  Book with {doc.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DUAL CLINIC LOCATIONS */}
      <section className="clinic-container">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Our Presence
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#0F172A]">
            Dual State Clinical Facilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-subtle space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center border border-[#C5A059]/30">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F172A]">Dehradun Centre (Uttarakhand)</h3>
            <p className="text-xs text-[#576579] leading-relaxed">
              Our flagship wellness facility in Dehradun features state-of-the-art laser rooms, private dental suites, and specialized scalp treatment pods.
            </p>
            <div className="text-xs text-gray-700 pt-2 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>{clinicData.profile.contact.dehradunAddress}</span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-subtle space-y-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center border border-[#C5A059]/30">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F172A]">Muzaffarnagar Centre (Uttar Pradesh)</h3>
            <p className="text-xs text-[#576579] leading-relaxed">
              Conveniently located in Civil Lines, our Muzaffarnagar clinic provides full-spectrum general dentistry, clear aligners, and clinical dermatology.
            </p>
            <div className="text-xs text-gray-700 pt-2 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>{clinicData.profile.contact.muzaffarnagarAddress}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDATIONAL CLINICAL VALUES */}
      <section className="clinic-container">
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
