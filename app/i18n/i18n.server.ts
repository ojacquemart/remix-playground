import { RemixI18Next } from 'remix-i18next';

import { i18nCookie } from '~/i18n/cookie';
import i18nOptions from '~/i18n/i18n.options';

export const i18nServer = new RemixI18Next({
  detection: {
    cookie: i18nCookie,
    supportedLanguages: i18nOptions.supportedLngs,
    fallbackLanguage: i18nOptions.fallbackLng,
  },
  i18next: {
    ...i18nOptions,
  },
});

export default i18nServer;
