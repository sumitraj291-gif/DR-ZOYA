import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useClinic } from '../context/ClinicContext';
import { LanguageSelector } from './LanguageSelector';
import {
  Phone,
  Calendar,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

export const Navbar = () => {
  const { t } = useTranslation();
  const { clinicData, activePage, navigateTo, openBookingModal } = useClinic();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t('nav.home', 'Home') },
    { id: 'treatments', label: t('nav.treatments', 'Treatments') },
    { id: 'smile-makeover', label: t('nav.smileMakeover', 'Smile Makeover') },
    { id: 'about', label: t('nav.about', 'About') },
    { id: 'ai-analyzer', label: t('nav.aiAnalyzer', 'AI Analyzer'), badge: 'AI' },
    { id: 'gallery', label: t('nav.gallery', 'Gallery') },
    { id: 'contact', label: t('nav.contact', 'Contact') },
  ];

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-[#E2E8F0]'
          : 'bg-[#FAF8F5]/95 backdrop-blur-sm py-3 border-b border-[#EAE4DC]'
        }`}>
        <div className="clinic-container flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 sm:space-x-3 text-left group focus:outline-none shrink-0 cursor-pointer"
            aria-label="Dr. Zoya DNA Clinic Home"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#C5A059]/40 p-1 flex items-center justify-center shadow-xs overflow-hidden group-hover:border-[#C5A059] transition-all shrink-0">
              <img src="/images/dna_logo.webp" alt="DNA Clinic Logo" width="44" height="44" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="font-serif text-sm sm:text-xl font-bold tracking-wider text-[#0F172A] leading-none flex items-center space-x-1.5">
                <span className="whitespace-nowrap">DR. ZOYA</span>
                <span className="text-[8px] sm:text-[9px] text-[#85611E] font-sans font-bold bg-[#FAF6EE] border border-[#C5A059]/40 px-1.5 py-0.5 rounded-full uppercase tracking-wider leading-none shrink-0">
                  DNA CLINIC
                </span>
              </div>
              <div className="text-[8px] sm:text-[10px] tracking-widest uppercase text-[#576579] font-medium mt-1 truncate">
                Skin • Hair • Dental Care
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-2 2xl:space-x-3 justify-center flex-1 px-1 xl:px-4">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2 xl:px-3.5 py-1 xl:py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all relative whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#0F172A] font-semibold bg-[#EFE9DF]'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F4EFEB]'
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-[#C5A059] text-[#090D14] text-[8px] xl:text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C5A059] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Button & Language */}
          <div className="hidden sm:flex items-center space-x-2 xl:space-x-3.5 flex-shrink-0">
            <LanguageSelector variant="header" />
            <button
              onClick={() => openBookingModal()}
              className="btn-gold px-3.5 sm:px-4 xl:px-6 py-2 sm:py-2.5 rounded-full text-xs xl:text-sm font-bold flex items-center space-x-1.5 whitespace-nowrap shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden shrink-0 ml-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-[#0F172A] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[68px] bg-black/50 backdrop-blur-sm z-40 transition-opacity">
          <div className="bg-white w-full max-w-sm ml-auto h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-[#E2E8F0]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-4">
                <div className="font-serif text-lg font-bold text-[#0F172A]">Clinic Navigation</div>
                <div className="flex items-center space-x-2">
                  <LanguageSelector variant="drawer" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-ghost p-1 text-gray-500 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`btn-ghost flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${activePage === link.id
                        ? 'bg-[#F5EFE6] text-[#0F172A] font-semibold border-l-4 border-[#C5A059]'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="bg-[#C5A059] text-[#090D14] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full btn-gold py-3 text-xs font-bold flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment (₹500 / ₹1,000)</span>
              </button>

              <div className="flex items-center justify-center space-x-4 pt-2 text-xs text-gray-500">
                <a
                  href={`tel:${clinicData.profile.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#C5A059]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Call Reception</span>
                </a>
                <span>•</span>
                <a
                  href={`https://wa.me/${clinicData.profile.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
