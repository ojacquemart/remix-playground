import { SessionStorage } from '@remix-run/server-runtime';
import { Session } from '@remix-run/node';

import { AuthenticateOptions, Authenticator } from 'remix-auth';

import { createCookieSession } from '~/features/auth/session';

import type { NewUser } from '~/features/auth/new-user';

import { AuthenticatorEnhanced } from '~/features/auth/authenticator-enhanced';
import { loginAuthenticator } from '~/features/auth/login-authenticator';
import { createRegisterFormStrategy } from '~/features/auth/register-form-strategy';
import { Validator } from 'remix-validated-form';
import { registerValidator } from '~/features/auth/register-validator';

export const registerSessionStorage = createCookieSession({
  name: 'remix.register',
  path: '/register',
  // register cookie will expire after 15 minutes
  maxAge: 60 * 15,
});

class RegisterAuthenticator<User = NewUser> extends AuthenticatorEnhanced<User> {
  constructor(sessionStorage: SessionStorage,
              validator: Validator<any>,
              private loginAuthenticator: Authenticator) {
    super(sessionStorage, validator);
  }

  async redirectToHomeIfLoggedIn(
    request: Request | Session,
    options:
      | { successRedirect: string; failureRedirect?: never }
      | { successRedirect?: never; failureRedirect: string },
  ): Promise<User | null> {
    await this.loginAuthenticator.isAuthenticated(request, {successRedirect: '/'});

    // @ts-ignore
    return this.isAuthenticated(request, {...options});
  }

  async login(request: Request, formData: FormData) {
    const registerSession = await this.getSession(request);

    const sessionStorage = this.getSessionStorage();
    const oldSessionId = await sessionStorage.destroySession(registerSession);

    const options: AuthenticateOptions = {
      name: 'form',
      sessionKey: this.loginAuthenticator.sessionKey,
      sessionErrorKey: this.loginAuthenticator.sessionErrorKey,
      sessionStrategyKey: this.loginAuthenticator.sessionStrategyKey,
      successRedirect: '/',
      context: {formData, oldSessionId},
    };

    return await loginAuthenticator.authenticate('form', request, options);
  }
}

export const registerAuthenticator = new RegisterAuthenticator<NewUser>(
  registerSessionStorage,
  registerValidator,
  loginAuthenticator,
);
registerAuthenticator.use(createRegisterFormStrategy());
