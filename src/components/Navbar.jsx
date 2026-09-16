import React, { useState, useEffect } from 'react';
import { useClinic } from '../context/ClinicContext';
import { LanguageSelector } from './LanguageSelector';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  MessageCircle,
  SlidersHorizontal
} from 'lucide-react';

export const Navbar = () => {
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
    { id: 'home', label: 'Home' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'smile-makeover', label: 'Smile Makeover' },
    { id: 'about', label: 'About Dr. Zoya' },
    { id: 'ai-analyzer', label: 'AI Analyzer', badge: 'AI' },
    { id: 'gallery', label: 'Results' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#090D14] text-[#D8E2ED] text-xs py-2 px-4 border-b border-[#C5A059]/20">
        <div className="clinic-container flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-6 text-xs text-[#94A3B8]">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">{clinicData.profile.contact.timings}</span>
              <span className="sm:hidden">Mon-Sat: 10am - 8pm</span>
            </div>
            <div className="hidden md:flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="truncate max-w-xs">Dehradun & Muzaffarnagar Clinics</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 ml-auto text-xs">
            <LanguageSelector variant="header" />
            <span className="text-[#334155] hidden sm:inline">|</span>
            <a 
              href={`tel:${clinicData.profile.contact.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden sm:flex items-center space-x-1 text-[#E2E8F0] hover:text-[#C5A059] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-semibold">{clinicData.profile.contact.phone}</span>
            </a>
            <span className="text-[#334155]">|</span>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center space-x-1 text-[#C5A059] hover:text-white transition-colors bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30"
              title="Access Clinic CMS & CRM Dashboard"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="font-medium">CMS & CRM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-[#E2E8F0]' 
          : 'bg-[#FAF8F5]/90 backdrop-blur-sm py-4 border-b border-[#EAE4DC]'
      }`}>
        <div className="clinic-container flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-3 text-left group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#C5A059]/50 p-1 flex items-center justify-center shadow-xs overflow-hidden group-hover:border-[#C5A059] transition-all">
              <img src="/images/dna_logo.png" alt="DNA Clinic Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#0F172A] leading-none flex items-center space-x-1.5">
                <span>DR. ZOYA</span>
                <span className="text-[10px] text-[#C5A059] font-sans font-bold bg-[#C5A059]/15 px-1.5 py-0.5 rounded">DNA CLINIC</span>
              </div>
              <div className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[#64748B] font-medium mt-1">
                Skin • Hair • Dental Care
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-full transition-all relative ${
                    isActive 
                      ? 'text-[#0F172A] font-semibold bg-[#EFE9DF]' 
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F4EFEB]'
                  }`}
                >
                  <span className="flex items-center space-x-1.5">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-gradient-to-r from-[#C5A059] to-[#9A7736] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
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

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => openBookingModal()}
              className="btn-gold px-5 py-2.5 rounded-full text-sm flex items-center space-x-2 cursor-pointer transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => openBookingModal()}
              className="sm:hidden btn-gold px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0F172A] hover:bg-[#EFE9DF] rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] bg-black/50 backdrop-blur-sm z-40 transition-opacity">
          <div className="bg-white w-full max-w-sm ml-auto h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-[#E2E8F0]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-4">
                <div className="font-serif text-lg font-bold text-[#0F172A]">Clinic Navigation</div>
                <div className="flex items-center space-x-2">
                  <LanguageSelector variant="drawer" />
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-gray-500 hover:text-black"
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
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                      activePage === link.id
                        ? 'bg-[#F5EFE6] text-[#0F172A] font-semibold border-l-4 border-[#C5A059]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="bg-[#C5A059] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}

                <button
                  onClick={() => handleNavClick('admin')}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium bg-[#0F172A] text-[#C5A059] mt-2"
                >
                  <span className="flex items-center space-x-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Clinic CMS & CRM Portal</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full btn-gold py-3 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 shadow-lg"
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
