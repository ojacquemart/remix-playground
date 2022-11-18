import { Authenticator } from 'remix-auth';

import { createLoginFormStrategy } from '~/features/auth/login-form-strategy';
import { createCookieSession } from '~/features/auth/session';

export const loginSessionStorage = createCookieSession({
  name: '__remix',
  path: '/',
});

export const loginAuthenticator = new Authenticator<string>(loginSessionStorage);
loginAuthenticator.use(createLoginFormStrategy());
