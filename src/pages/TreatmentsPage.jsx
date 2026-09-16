import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Sparkles, 
  Search, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  MessageCircle, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const TreatmentsPage = () => {
  const { clinicData, openBookingModal } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Skin Care',
    'Dental Care',
    'Hair Care'
  ];

  const filteredTreatments = clinicData.treatments.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <section className="clinic-container text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#FAF6EE] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bespoke Clinical Menu</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F172A]">
          Advanced Aesthetic & Smile Procedures
        </h1>

        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          Every protocol at Dr. Zoya Clinic is personalized. We employ US-FDA certified medical lasers, German injectable formulations, and 3D digital smile design for natural elegance.
        </p>
      </section>

      {/* Filter & Search Bar */}
      <section className="clinic-container">
        <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] text-[#C5A059] shadow-xs'
                    : 'bg-[#FAF8F5] text-gray-600 hover:bg-[#F0EBE1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search treatments (e.g. laser, smile, acne)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A059] bg-[#FAF8F5]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

        </div>
      </section>

      {/* Treatments Grid */}
      <section className="clinic-container">
        {filteredTreatments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
            <p className="text-gray-500 text-sm">No treatments found matching your filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-bold text-[#C5A059] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="bg-white rounded-2xl border border-[#E8E2D9] shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Treatment Image */}
                {treatment.image && (
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <img
                      src={treatment.image}
                      alt={treatment.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-wider uppercase text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                      {treatment.category}
                    </span>
                  </div>
                )}

                {/* Card Header & Category */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#C5A059] bg-[#FAF6EE] px-2.5 py-1 rounded-full border border-[#C5A059]/30">
                      {treatment.subCategory || treatment.category}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{treatment.duration}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0F172A] group-hover:text-[#C5A059] transition-colors leading-snug">
                      {treatment.title}
                    </h3>
                    <div className="text-xs font-semibold text-emerald-700 mt-1">
                      {treatment.price}
                    </div>
                  </div>

                  <p className="text-xs text-[#576579] leading-relaxed">
                    {treatment.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Clinical Highlights:
                    </span>
                    {treatment.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE4DC] flex items-center justify-between gap-2">
                  <div className="text-[11px] text-gray-500">
                    Advance: <strong className="text-gray-800">₹{treatment.advanceFee || 500}</strong>
                  </div>
                  
                  <button
                    onClick={() => openBookingModal(treatment)}
                    className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Slot</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Consultation Notice */}
      <section className="clinic-container">
        <div className="bg-[#FAF6EE] p-6 rounded-2xl border border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F172A]">Unsure which treatment suits your skin or smile?</h4>
              <p className="text-xs text-gray-600">Dr. Zoya conducts a full diagnostic assessment during your consultation to curate a customized package.</p>
            </div>
          </div>
          <button
            onClick={() => openBookingModal()}
            className="btn-obsidian px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap"
          >
            Book Assessment (₹500)
          </button>
        </div>
      </section>

    </div>
  );
};
