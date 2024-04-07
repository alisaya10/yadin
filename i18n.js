import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { siteConfig } from './variables/config'


const options = {
    // locales: ['en-US', 'fr', 'fa'],
    // defaultLocale: 'en-US',
    order: ['localStorage', 'cookie'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['cookie', 'localStorage'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: 'myDomain',
    defaultLanguage: 'fa',

    // optional htmlTag with lang attribute, the default is:
    // htmlTag: document.documentElement,

    // only detect languages that are in the whitelist
    checkWhitelist: true,
    // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
    cookieOptions: { path: '/' }
}



i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        whitelist: siteConfig.languages,
        fallbacks: 'fa',
        locale: 'fa',
        defaultLanguage: 'fa',
        // locales: ['en-US', 'fr', 'fa'],
        // defaultLocale: 'en-US',
        fallbackLng: {
            default: ['fa'] //(siteConfig.defaultLng ? siteConfig.defaultLng : 'fa')]
        },
        detection: options,
        // defaultLng: siteConfig.defaultLng ? siteConfig.defaultLng : 'fa',
        defaultLocale: 'fa', //(siteConfig.defaultLng ? siteConfig.defaultLng : 'fa'),
        // resources,
        // lng: siteConfig.defaultLng ? siteConfig.defaultLng : 'fa',
        backend: {
            loadPath: '/locales/{{lng}}.json',
        },
        ns: ['translations'],
        defaultNS: 'translations',
        debug: false,
        react: {
            wait: false,
            useSuspense: false
        }
    });

// i18n.defaultLocale = "en";
// i18n.locale = "en";
// i18n.locales.no = ["nb", "en"];
// i18n.locales.no = "nb";
// i18n.locales.no = "fa";

export default i18n;