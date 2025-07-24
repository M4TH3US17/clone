// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json';
import ptTranslation from './pt.json';
import esTranslation from './es.json';

i18n
    .use(initReactI18next)
    .init({
        lng: 'pt', // Idioma padrão
        fallbackLng: 'pt',
        interpolation: { escapeValue: false, },
        resources: {
            en: { translation: enTranslation },
            pt: { translation: ptTranslation },
            es: { translation: esTranslation },
        },
    });

export default i18n;