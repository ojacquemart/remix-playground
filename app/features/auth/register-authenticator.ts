import { Authenticator } from 'remix-auth';

import { createCookieSession } from '~/features/auth/session';
import type { NewUser } from '~/features/auth/new-user';
import { createRegisterFormStrategy } from '~/features/auth/register-form-strategy';

export const registerSessionStorage = createCookieSession({
  name: '__remix_new',
  path: '/register',
  // register cookie will expire after 15 minutes
  maxAge: 60 * 15,
});

export const registerAuthenticator = new Authenticator<NewUser>(registerSessionStorage);
registerAuthenticator.use(createRegisterFormStrategy());
