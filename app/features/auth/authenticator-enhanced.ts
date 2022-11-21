import { Session, TypedResponse } from '@remix-run/node';
import { SessionStorage } from '@remix-run/server-runtime';

import { AuthenticateOptions, Authenticator } from 'remix-auth';

import { validationError, ValidationErrorResponseData, Validator } from 'remix-validated-form';

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

  constructor(sessionStorage: SessionStorage, private validator: Validator<any>) {
    super(sessionStorage);
  }

  async safeAuthenticate(strategy: string, request: Request,
                         options?: Pick<AuthenticateOptions, 'successRedirect' | 'failureRedirect' | 'throwOnError' | 'context'>): Promise<User | TypedResponse<ValidationErrorResponseData>> {
    const formData = await request.formData();
    const data = await this.validator.validate(formData);

    if (data.error) {
      return validationError(data.error);
    }

    return await super.authenticate(strategy, request, {
      ...options,
      context: {formData},
    });
  }

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
