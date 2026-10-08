import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import ar from './locales/ar.json';
import ru from './locales/ru.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ar: { translation: ar },
  ru: { translation: ru },
  es: { translation: es },
  // Fallbacks for remaining supported languages preserve English base
  fr: { translation: en },
  de: { translation: en },
  bn: { translation: hi }, // Bengali inherits Hindi/English clinical fallback
  ur: { translation: ar }, // Urdu inherits Arabic/English clinical fallback
  fa: { translation: ar }, // Persian inherits Arabic/English clinical fallback
  'zh-CN': { translation: en },
  pt: { translation: es },
};

const savedLanguage = typeof window !== 'undefined'
  ? localStorage.getItem('dr_zoya_preferred_language') || 'en'
  : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

// Handle RTL text direction cleanly on html element
if (typeof document !== 'undefined') {
  const isRtl = ['ar', 'ur', 'fa'].includes(savedLanguage);
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.documentElement.lang = savedLanguage;
}

export default i18n;
