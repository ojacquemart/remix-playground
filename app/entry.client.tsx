import { RemixBrowser } from '@remix-run/react'

import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import i18nOptions from '~/i18n/i18n.options';

const initI18n = () => {
  return i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...i18nOptions,
      detection: {
        order: ['htmlTag'],
        caches: [],
      },
    })
    .then(() => initApp());
}

const initApp = () => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrateApp);
  } else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    window.setTimeout(hydrateApp, 1);
  }
}

const hydrateApp = () => {
  return startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <I18nextProvider i18n={i18next}>
          <RemixBrowser/>
        </I18nextProvider>
      </StrictMode>
    );
  });
}

if (!i18next.isInitialized) {
  initI18n()
    .catch((error) => {
      console.error('Error app initialization', error);
    });
}
