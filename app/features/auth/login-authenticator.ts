import { createLoginFormStrategy } from '~/features/auth/login-form-strategy';
import { createCookieSession } from '~/features/auth/session';
import { AuthenticatorEnhanced } from '~/features/auth/authenticator-enhanced';

export const loginSessionStorage = createCookieSession({
  name: 'remix',
  path: '/',
});

export const loginAuthenticator = new AuthenticatorEnhanced<string>(loginSessionStorage);
loginAuthenticator.use(createLoginFormStrategy());
