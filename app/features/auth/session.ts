import type { Session } from '@remix-run/node';
import { createCookieSessionStorage } from '@remix-run/node';
import type { CookieOptions, SessionStorage } from '@remix-run/server-runtime';

import type { Authenticator } from 'remix-auth';

export type NewCookieOptions = (CookieOptions & {
  name?: string;
})

export const createCookieSession = (options: NewCookieOptions) => createCookieSessionStorage({
  cookie: {
    name: options.name,
    httpOnly: options.httpOnly ?? true,
    path: options.path ?? '/',
    sameSite: options.sameSite ?? 'lax',
    maxAge: options.maxAge,
    // TODO: this should be an env variable
    secrets: ['s3cret'],
    secure: process.env.NODE_ENV === 'production',
  },
});

export interface SessionLoaderData {
  error: ErrorMessage | null;
}

export interface ErrorMessage {
  message: string;
}

export interface SessionLoadResponse {
  error: ErrorMessage | null;
  session: Session;
}

export const getSession = async (request: Request, sessionStorage: SessionStorage): Promise<Session> => {
  return sessionStorage.getSession(
    request.headers.get('Cookie'),
  );
};

export const loadSessionError = async (request: Request, authenticator: Authenticator, sessionStorage: SessionStorage): Promise<SessionLoadResponse> => {
  const session = await getSession(request, sessionStorage);
  const error = session.get(authenticator.sessionErrorKey);

  return {error, session};
};
