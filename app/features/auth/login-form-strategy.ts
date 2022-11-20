import type { SessionStorage } from '@remix-run/server-runtime';
import type { TypedResponse } from '@remix-run/node';

import type { AuthenticateOptions } from 'remix-auth';
import { AuthorizationError } from 'remix-auth';

import { FormStrategy } from 'remix-auth-form';

import { createLoginValidator } from '~/features/auth/login-validator';

const validator = createLoginValidator();

export class LoginFormStrategy<User> extends FormStrategy<User> {
  protected async success(user: User, request: Request, sessionStorage: SessionStorage, options: AuthenticateOptions): Promise<User> {
    try {
      return await super.success(user, request, sessionStorage, options);
    } catch (response) {
      if (response instanceof Response) {
        throw this.redirectDestroyingPossibleOldSession(response, options);
      }

      throw new Response(null, {
        status: 401,
      });
    }
  }

  // create a new response while append the old session id
  // it's typically used when we will destroy the register session
  // while creating the new session for the logged-in user
  private redirectDestroyingPossibleOldSession(response: Response, options: AuthenticateOptions) {
    const headers = new Headers(response.headers);

    const oldSessionId = options.context?.oldSessionId;
    if (oldSessionId) {
      headers.append('Set-Cookie', oldSessionId as string);
    }

    return new Response(null, {
      status: response.status,
      headers,
    }) as TypedResponse<never>;
  }
}

export const createLoginFormStrategy = () => new LoginFormStrategy(async ({form}) => {
  const data = await validator.validate(form);
  if (data.error) {
    throw new AuthorizationError('auth.login.validator.invalidData');
  }

  const password = form.get('password');
  if (password !== 'test') {
    throw new AuthorizationError('auth.login.invalidCredentials');
  }

  return form.get('email') as string;
});
