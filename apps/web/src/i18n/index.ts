import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language resources
import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';

// Language resources
const resources = {
  en: {
    translation: en,
  },
  'zh-CN': {
    translation: zhCN,
  },
  'zh-TW': {
    translation: zhTW,
  },
};

// Get browser language
const getBrowserLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  const savedLang = localStorage.getItem('i18nextLng');
  
  // Use saved language if exists
  if (savedLang && ['en', 'zh-CN', 'zh-TW'].includes(savedLang)) {
    return savedLang;
  }
  
  // Auto-detect browser language
  if (browserLang.startsWith('zh')) {
    if (browserLang === 'zh-TW' || browserLang === 'zh-HK' || browserLang === 'zh-MO') {
      return 'zh-TW';
    }
    return 'zh-CN';
  }
  
  return 'en';
};

// i18n configuration
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getBrowserLanguage(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh-CN', 'zh-TW'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;