import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './en';
import bgTranslation from './bg';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      // Add your translations for different languages
      en: enTranslation,
      bg: bgTranslation,
    },
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Use English if a translation is not available for the selected language
    interpolation: {
      escapeValue: false, // React already escapes strings
    },
  });

export default i18n;
