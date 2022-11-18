import { Authenticator } from 'remix-auth';

import { createCookieSession } from '~/features/auth/session';
import type { NewUser } from '~/features/auth/new-user';
import { createRegisterFormStrategy } from '~/features/auth/register-form-strategy';

export const registerSessionStorage = createCookieSession({
  name: '__remix_new',
  path: '/register',
});

export const registerAuthenticator = new Authenticator<NewUser>(registerSessionStorage);
registerAuthenticator.use(createRegisterFormStrategy());
