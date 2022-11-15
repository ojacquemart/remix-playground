import { createCookieSessionStorage } from '@remix-run/node';

import { Authenticator } from 'remix-auth';

import { withLoginFormStrategy } from '~/features/auth/login-form-strategy';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__remix',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cret'], // This should be an env variable
    secure: process.env.NODE_ENV === 'production',
  },
});

export const auth = new Authenticator<string>(sessionStorage);

auth.use(
  withLoginFormStrategy(),
);
