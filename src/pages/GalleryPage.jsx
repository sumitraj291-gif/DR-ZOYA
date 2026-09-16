import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck,
  Filter
} from 'lucide-react';

export const GalleryPage = () => {
  const { clinicData, openBookingModal } = useClinic();
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = ['All', 'Skin', 'Smile', 'Injectables', 'Hair'];

  const filteredTransformations = clinicData.transformations.filter(t => {
    if (activeFilter === 'All') return true;
    return t.category === activeFilter;
  });

  return (
    <div className="py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <section className="clinic-container text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#FAF6EE] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real Clinical Outcomes</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F172A]">
          Documented Patient Transformations
        </h1>

        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          Every case represented below was personally diagnosed and treated by Dr. Zoya. We respect patient privacy while illustrating predictable clinical excellence.
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
              {f === 'All' ? 'All Transformations' : f}
            </button>
          ))}
        </div>
      </section>

      {/* Transformations Grid */}
      <section className="clinic-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTransformations.map(t => (
            <div
              key={t.id}
              className="bg-white rounded-3xl border border-[#E8E2D9] shadow-subtle hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Visual Before & After comparison if images exist */}
                {t.beforeImage && t.afterImage ? (
                  <div className="p-4 sm:p-6 pb-0">
                    <div className="grid grid-cols-2 gap-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#EAE4DC]">
                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-200">
                        <img 
                          src={t.beforeImage} 
                          alt={`${t.concern} - Before`} 
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          Before
                        </span>
                      </div>
                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 border border-[#C5A059]/40">
                        <img 
                          src={t.afterImage} 
                          alt={`${t.concern} - After`} 
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-[#C5A059] text-black text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                          After
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#C5A059]/30">
                      {t.category} Transformation
                    </span>
                    <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>Timeline: {t.turnaround}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-gray-400">{t.patientLabel}</span>
                    <h3 className="font-serif text-2xl font-bold text-[#0F172A] mt-0.5">
                      {t.concern}
                    </h3>
                  </div>

                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE4DC] space-y-2 text-xs">
                    <div>
                      <strong className="text-gray-500 block text-[10px] uppercase">Clinical Protocol:</strong>
                      <span className="font-medium text-[#0F172A]">{t.treatmentUsed}</span>
                    </div>
                    <div>
                      <strong className="text-gray-500 block text-[10px] uppercase">Observed Outcome:</strong>
                      <span className="text-emerald-800 font-medium">{t.resultDescription}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-[#FAF8F5] border-t border-[#EAE4DC] flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Clinical Case</span>
                </span>
                <button
                  onClick={() => openBookingModal()}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Similar Case</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="clinic-container text-center pt-6">
        <div className="bg-[#0A111C] text-white p-8 rounded-3xl border border-[#C5A059]/30 max-w-2xl mx-auto space-y-3">
          <h3 className="font-serif text-2xl font-bold">Ready for Your Custom Transformation?</h3>
          <p className="text-xs text-gray-300">
            Consult Dr. Zoya in person or via high-definition video consultation.
          </p>
          <button
            onClick={() => openBookingModal()}
            className="btn-gold px-7 py-3 rounded-full text-xs font-bold mt-2"
          >
            Book Assessment (₹500 / ₹1,000)
          </button>
        </div>
      </section>

    </div>
  );
};
