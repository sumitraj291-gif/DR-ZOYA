import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', isDefault: true },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇦🇪', rtl: true },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', rtl: true },
  { code: 'fa', name: 'Persian', native: 'فارسی', flag: '🇮🇷', rtl: true },
  { code: 'zh-CN', name: 'Chinese', native: '简体中文', flag: '🇨🇳' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷' }
];

export const LanguageSelector = ({ variant = 'header' }) => {
  const { showToast } = useClinic();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    return localStorage.getItem('dr_zoya_preferred_language') || 'en';
  });

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle setting the cookie and triggering Google Translate combo
  const triggerTranslation = (langCode) => {
    // 1. Set cookie for Google Translate
    const domain = window.location.hostname;
    const cookieValue = `/en/${langCode}`;
    
    if (langCode === 'en') {
      // Clear cookie for English
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
    } else {
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain};`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain};`;
    }

    localStorage.setItem('dr_zoya_preferred_language', langCode);
    setSelectedLang(langCode);

    // 2. Handle RTL layout for Arabic, Urdu, Persian
    const isRtl = ['ar', 'ur', 'fa'].includes(langCode);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    // 3. Trigger Google Translate combo element
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    } else {
      // If widget element hasn't loaded into DOM yet, reload with cookie
      window.location.reload();
    }
  };

  const handleLanguageChange = (lang) => {
    setIsOpen(false);
    triggerTranslation(lang.code);
    showToast(`Website language set to ${lang.native} (${lang.name})`);
  };

  const currentLangObj = languages.find(l => l.code === selectedLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border ${
          variant === 'header'
            ? 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/40 hover:bg-[#C5A059]/20 hover:text-white'
            : 'bg-white text-gray-800 border-gray-300 hover:border-[#C5A059] shadow-xs'
        }`}
        title="Change Website Language"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
        <span className="text-sm leading-none">{currentLangObj.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLangObj.native}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Language Selection Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-[#0A111C] text-white rounded-2xl shadow-2xl border border-[#C5A059]/40 overflow-hidden z-50 modal-enter">
          
          <div className="p-3 border-b border-gray-800 bg-[#0F172A]/80 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
              Choose Language / भाषा चुनें
            </span>
            <span className="text-[10px] text-gray-400">Global Patients</span>
          </div>

          <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5 divide-y divide-gray-800/40">
            {languages.map((l) => {
              const isSelected = selectedLang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => handleLanguageChange(l)}
                  className={`w-full px-3 py-2 rounded-xl text-left text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#C5A059]/20 text-[#C5A059] font-bold'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base">{l.flag}</span>
                    <div>
                      <div className="font-semibold text-white">{l.native}</div>
                      <div className="text-[10px] text-gray-400">{l.name} {l.isDefault ? '(Default)' : ''}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#C5A059]" />}
                </button>
              );
            })}
          </div>

          <div className="p-2.5 bg-black/50 border-t border-gray-800 text-[10px] text-gray-400 text-center">
            Instant translation for international & Indian patients.
          </div>

        </div>
      )}
    </div>
  );
};
