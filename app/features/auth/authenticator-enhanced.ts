import { Session } from '@remix-run/node';
import { SessionStorage } from '@remix-run/server-runtime';

import { Authenticator } from 'remix-auth';

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

export class AuthenticatorEnhanced<User> extends Authenticator<User> {
  async loadErrorSession(request: Request): Promise<SessionLoadResponse> {
    const session = await this.getSession(request);
    const error = session.get(this.sessionErrorKey);

    return {error, session};
  }

  async getSession(request: Request): Promise<Session> {
    const sessionStorage = this.getSessionStorage();

    return sessionStorage.getSession(request.headers.get('Cookie'));
  }

  getSessionStorage(): SessionStorage {
    return (this as any).sessionStorage as SessionStorage;
  }
}
