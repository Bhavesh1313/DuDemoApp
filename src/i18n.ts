import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import ar from './locales/ar/translation.json';
import en from './locales/en/translation.json';
import { LANGUAGE_CODES, LANGUAGE_STORAGE_KEY } from './utils/constants';
import SecureStorage from './utils/SensitiveStorage';

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {
            en: {
                translation: en,
            },
            ar: {
                translation: ar,
            },
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
        initImmediate: false,
    });

const fetchStoredLanguage = async () => {
    console.log("here")
    try {
        const storedLanguage = await SecureStorage.getItem(LANGUAGE_STORAGE_KEY);
        const isRTL = storedLanguage === LANGUAGE_CODES.ARABIC;
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
            I18nManager.forceRTL(isRTL);
            I18nManager.allowRTL(isRTL);
        }
    } catch (error) {
        console.log('Failed to load language:', error);
    }
};

fetchStoredLanguage();

export default i18n;
