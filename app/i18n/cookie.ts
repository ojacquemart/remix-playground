import { createCookie } from '@remix-run/node';

export const i18nCookie = createCookie('lang', {
  sameSite: 'lax',
  path: '/',
});
