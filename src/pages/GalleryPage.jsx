import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck,
  Filter,
  Maximize2,
  X,
  Camera,
  Layers,
  MapPin
} from 'lucide-react';

export const GalleryPage = () => {
  const { clinicData, openBookingModal } = useClinic();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const filterOptions = ['All', 'Smile', 'Skin', 'Hair', 'Clinic & Tech', 'Instagram'];

  // Use clinicData.gallery or fallback to transformations
  const galleryItems = clinicData.gallery || [
    ...(clinicData.transformations || []).map(t => ({
      ...t,
      title: t.concern,
      type: 'before_after',
      timeline: t.turnaround,
      description: t.resultDescription,
      clinician: 'Dr. Zoya Rana & Specialist Team'
    }))
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <section className="clinic-container text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#FAF6EE] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official Clinical Gallery</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F172A]">
          Clinical Cases, Technology & Transformations
        </h1>

        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          Explore documented before-and-after smile & skin outcomes, our advanced Dehradun and Muzaffarnagar clinic suites, and real patient cases from DNA Clinics India.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="clinic-container flex justify-center">
        <div className="bg-white p-1.5 rounded-2xl border border-[#E8E2D9] shadow-subtle flex flex-wrap gap-1">
          {filterOptions.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-[#0F172A] text-[#C5A059] shadow-xs'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              {f === 'All' ? 'All Showcase (' + galleryItems.length + ')' : f}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Media Grid */}
      <section className="clinic-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#E8E2D9] shadow-subtle hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* 1. Before / After Comparison */}
                {item.type === 'before_after' || (item.beforeImage && item.afterImage) ? (
                  <div className="p-4 bg-[#FAF8F5] border-b border-[#EAE4DC] relative">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-200">
                        <img 
                          src={item.beforeImage} 
                          alt={`${item.title} - Before`} 
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          Before
                        </span>
                      </div>
                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 border border-[#C5A059]/50">
                        <img 
                          src={item.afterImage} 
                          alt={`${item.title} - After`} 
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-[#C5A059] text-black text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                          After
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="absolute bottom-6 right-6 bg-black/70 hover:bg-black text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 text-[10px]"
                      title="Enlarge Case View"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  /* 2. Single High-Res Clinic / Technology Image */
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 border-b border-gray-100 cursor-pointer" onClick={() => setActiveModalItem(item)}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-full border border-white/20">
                      {item.category}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveModalItem(item); }}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Card Content Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#FAF6EE] px-2.5 py-0.5 rounded-full border border-[#C5A059]/30">
                      {item.category}
                    </span>
                    {item.timeline && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{item.timeline}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#0F172A] leading-snug group-hover:text-[#C5A059] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {item.clinician && (
                    <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{item.clinician}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE4DC] flex items-center justify-between">
                <button
                  onClick={() => setActiveModalItem(item)}
                  className="text-xs font-semibold text-gray-600 hover:text-black flex items-center space-x-1"
                >
                  <Maximize2 className="w-3 h-3 text-[#C5A059]" />
                  <span>Inspect</span>
                </button>

                <button
                  onClick={() => openBookingModal()}
                  className="btn-gold px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Consultation</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-6 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059] bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#C5A059]/30">
                {activeModalItem.category} Case
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
                {activeModalItem.title}
              </h2>
            </div>

            {/* Media Presentation */}
            {activeModalItem.type === 'before_after' || (activeModalItem.beforeImage && activeModalItem.afterImage) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE4DC]">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-black/5 border border-gray-200">
                  <img
                    src={activeModalItem.beforeImage}
                    alt="Before Treatment"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-md uppercase">
                    Before
                  </span>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-black/5 border border-[#C5A059]/60">
                  <img
                    src={activeModalItem.afterImage}
                    alt="After Treatment"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#C5A059] text-black text-xs font-extrabold px-3 py-1 rounded-md uppercase shadow">
                    After
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden max-h-[480px] bg-black/5 border border-gray-200">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full max-h-[480px] object-cover mx-auto"
                />
              </div>
            )}

            <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE4DC] text-xs sm:text-sm text-gray-700 leading-relaxed">
              <p>{activeModalItem.description}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200/80 text-xs">
                <div>
                  <strong className="text-gray-500 block uppercase text-[10px]">Supervising Clinician:</strong>
                  <span className="font-semibold text-gray-900">{activeModalItem.clinician || "Dr. Zoya Rana"}</span>
                </div>
                {activeModalItem.timeline && (
                  <div>
                    <strong className="text-gray-500 block uppercase text-[10px]">Timeline / Phase:</strong>
                    <span className="font-semibold text-gray-900">{activeModalItem.timeline}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-gray-500 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified DNA Clinic Clinical Documentation</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveModalItem(null);
                    openBookingModal();
                  }}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation for this Result</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CTA Footer */}
      <section className="clinic-container text-center pt-6">
        <div className="bg-[#0A111C] text-white p-8 sm:p-12 rounded-3xl border border-[#C5A059]/30 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 text-[#C5A059] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Schedule Your Evaluation</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold">
            Experience the DNA Standard in Person
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Visit our state-of-the-art facilities in Dehradun or Muzaffarnagar for a complete dental, skin, or hair assessment.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openBookingModal()}
              className="btn-gold px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-xl"
            >
              Book Consultation (₹500 / ₹1,000)
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
