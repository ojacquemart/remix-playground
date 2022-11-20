import { AuthorizationError } from 'remix-auth';

import { FormStrategy } from 'remix-auth-form';

import type { NewUser } from '~/features/auth/new-user';
import { createRegisterValidator } from '~/features/auth/register-validator';

const validator = createRegisterValidator();

export const createRegisterFormStrategy = () => new FormStrategy<NewUser>(async ({form}) => {
  const data = await validator.validate(form);
  if (data.error) {
    throw new AuthorizationError('auth.login.validator.invalidData');
  }

  const email = form.get('email');
  const password = form.get('password');

  return {email, password} as NewUser;
});

export const createRegisterV2FormStrategy = () => new FormStrategy<NewUser>(async ({form}) => {
  const email = form.get('email');
  const password = form.get('password');
  const username = form.get('username');

  return {email, password, username} as NewUser;
});
