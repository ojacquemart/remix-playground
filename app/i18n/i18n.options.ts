import en from '~/i18n/messages/en';
import fr from '~/i18n/messages/fr';

const resources = {
  en: {
    common: {
      ...en
    }
  },
  fr: {
    common: {
      ...fr
    }
  }
};

export default {
  supportedLngs: ['en', 'fr'],
  fallbackLng: 'en',
  defaultNS: 'common',
  resources,
  // Disabling suspense is recommended
  react: {useSuspense: false},
  ns: ['common'],
};
