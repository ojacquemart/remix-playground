import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';

import { renderToString } from 'react-dom/server';

import { I18nextProvider, initReactI18next } from 'react-i18next';
import { createInstance } from 'i18next';

import i18nServer from '~/i18n/i18n.server';
import i18nOptions from '~/i18n/i18n.options';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const instance = createInstance();

  const lng = await i18nServer.getLocale(request);

  await instance
    .use(initReactI18next)
    .init({
      ...i18nOptions,
      lng,
    });

  const markup = renderToString(
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url}/>
    </I18nextProvider>
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
