import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  Heart,
  SlidersHorizontal,
  ChevronRight,
  MessageCircle,
  Share2
} from 'lucide-react';

export const Footer = () => {
  const { clinicData, navigateTo, openBookingModal } = useClinic();

  return (
    <footer className="bg-[#090D14] text-[#CBD5E1] pt-16 pb-24 sm:pb-12 border-t border-[#C5A059]/20">
      <div className="clinic-container">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand & Doctor Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#C5A059] p-1 flex items-center justify-center overflow-hidden">
                <img src="/images/dna_logo.png" alt="DNA Clinic Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wide text-white block">
                  DNA CLINIC INDIA
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#C5A059] font-medium block">
                  Dr. Zoya Aesthetic & Smile Studio
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed pr-4">
              {clinicData.profile.doctorBio}
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#94A3B8] pt-2">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span className="text-gray-300 font-medium">{clinicData.profile.doctorTitle}</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-3">
              <a 
                href={clinicData.profile.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#C5A059] hover:border-[#C5A059] transition-all" 
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#C5A059] hover:border-[#C5A059] transition-all" aria-label="Facebook">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#C5A059] hover:border-[#C5A059] transition-all" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
              <a 
                href={`https://wa.me/${clinicData.profile.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366]/10 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#C5A059]">
              Clinic Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('treatments')} className="hover:text-white transition-colors">
                  Treatments & Procedures
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('smile-makeover')} className="hover:text-white transition-colors">
                  Smile Makeover & Aligners
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About Dr. Zoya
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('ai-analyzer')} className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>AI Smile & Skin Scanner</span>
                  <span className="bg-[#C5A059] text-white text-[9px] px-1 rounded font-bold">NEW</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('gallery')} className="hover:text-white transition-colors">
                  Before & After Results
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Location & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Treatments Highlights */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#C5A059]">
              Specialties
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => navigateTo('treatments')} className="hover:text-white transition-colors">
                  HydraFacial Elite MD®
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('treatments')} className="hover:text-white transition-colors">
                  PicoSure® Melasma Laser
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('smile-makeover')} className="hover:text-white transition-colors">
                  Invisalign® Clear Aligners
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('smile-makeover')} className="hover:text-white transition-colors">
                  Ultra-Thin Ceramic Veneers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('treatments')} className="hover:text-white transition-colors">
                  Baby Botox & Dermal Fillers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('treatments')} className="hover:text-white transition-colors">
                  GFC Hair Regrowth Protocol
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#C5A059]">
              Clinic Concierge
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{clinicData.profile.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span className="text-white font-medium">{clinicData.profile.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>{clinicData.profile.contact.email}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>{clinicData.profile.contact.timings}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('admin')}
                className="w-full bg-white/5 hover:bg-white/10 border border-gray-700 text-[#C5A059] py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Open Clinic CMS / CRM</span>
              </button>
            </div>
          </div>

        </div>

        {/* Medical & Legal Disclaimer (Mandated in Phase 2 PDF) */}
        <div className="pt-8 pb-4 text-[11px] text-gray-500 border-b border-gray-800 space-y-2">
          <p className="leading-relaxed">
            <strong className="text-gray-400">Medical & Diagnostic Disclaimer:</strong> The information, AI Smile & Skin analyzer simulations, and before-and-after results presented on this platform are for informational, preliminary guidance, and educational purposes only. They do not constitute formal medical or dental diagnosis or replace a personalized clinical examination by Dr. Zoya. Individual outcomes may vary based on skin type, anatomical structure, and biological response.
          </p>
        </div>

        {/* Copyright & Live Status */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>
            © {new Date().getFullYear()} Dr. Zoya Aesthetic & Smile Studio. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>Clinic Online & Accepting Appointments</span>
            </span>
            <span>•</span>
            <button onClick={() => navigateTo('admin')} className="text-gray-400 hover:text-white underline">
              Admin CMS
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
