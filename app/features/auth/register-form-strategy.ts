import { FormStrategy } from 'remix-auth-form';

import type { NewUser } from '~/features/auth/new-user';

export const createRegisterFormStrategy = () => new FormStrategy<NewUser>(async ({form}) => {
  const email = form.get('email');
  const password = form.get('password');

  return {email, password} as NewUser;
});

