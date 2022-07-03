import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cfg from './config.json';
import { updateDisplayName } from './displayName';

export const DFLT_NS = 'translation';

const locales = cfg.locales as string[];
const extraNamespaces = cfg.extraNamespaces as string[];
const defaultNS = DFLT_NS || cfg.defaultNS as string;

const INIT_LANG = process.env.I18N_INIT_LANG || 'en';

function isDefaultNS(ns: string) {
  return ns === defaultNS;
}

export const fetchLocale = async (locale: string, ns: string = defaultNS) => {
  const localePath = isDefaultNS(ns) ? `${locale}` : `${locale}/${ns}`;
  const res = await fetch(`./_locales/${localePath}/messages.json`);
  const data: Record<
  string,
  { message: string, description: string }
  > = await res.json();

  return Object.keys(data).reduce((res, key) => {
    return {
      ...res,
      [key.replace(/__/g, ' ')]: data[key].message,
    };
  }, {});
};

export async function addResourceBundle(locale: string) {
  await Promise.allSettled(
    [defaultNS].concat(extraNamespaces).map(async (ns) => {
      if (!i18n.hasResourceBundle(locale, ns)) {
        const bundle = await fetchLocale(locale, isDefaultNS(ns) ? undefined : ns);

        i18n.addResourceBundle(locale, ns, bundle);
        return bundle;
      }
    }),
  );
}

i18n.on('languageChanged', function(lng: string) {
  addResourceBundle(lng);
  updateDisplayName(lng);
});

// init
(async () => {
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: ['en', 'dev'],
      defaultNS,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });

  await Promise.all(locales.map(lng => addResourceBundle(lng)));

  if (INIT_LANG !== 'en') {
    await addResourceBundle(INIT_LANG);
    await i18n.changeLanguage(INIT_LANG);
  }
  updateDisplayName(INIT_LANG);
})();

export default i18n;
