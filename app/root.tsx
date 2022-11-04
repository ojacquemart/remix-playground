import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, } from '@remix-run/react';

import { useChangeLanguage } from 'remix-i18next';

import { i18nCookie } from '~/i18n/cookie';
import i18nServer from '~/i18n/i18n.server';

type LoaderData = { locale: string };

export const loader: LoaderFunction = async ({request}) => {
  const locale = await i18nServer.getLocale(request);
  const t = await i18nServer.getFixedT(request, 'common');
  const title = t('headTitle');

  return json({locale, title}, {
    headers: {'Set-Cookie': await i18nCookie.serialize(locale)}
  });
}

export let handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: ['common'],
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Remix 💿🚀',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  const {locale} = useLoaderData<LoaderData>();

  useChangeLanguage(locale);

  return (
    <html lang={locale}>
    <head>
      <Meta/>
      <Links/>
    </head>
    <body>
      <Outlet/>
      <ScrollRestoration/>
      <Scripts/>
      <LiveReload/>
    </body>
    </html>
  );
}
