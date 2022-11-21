import { createCookieSessionStorage } from '@remix-run/node';
import type { CookieOptions } from '@remix-run/server-runtime';

export type NewCookieOptions = (CookieOptions & {
  name?: string;
});

export const createCookieSession = (options: NewCookieOptions) => createCookieSessionStorage({
  cookie: {
    name: options.name,
    httpOnly: options.httpOnly ?? true,
    path: options.path ?? '/',
    sameSite: options.sameSite ?? 'lax',
    maxAge: options.maxAge,
    secrets: [process.env.COOKIE_SESSION_SECRET as string],
    secure: process.env.NODE_ENV === 'production',
  },
});
