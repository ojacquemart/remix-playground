import { AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';

import { withLoginValidator } from '~/features/auth/login-validator';

const validator = withLoginValidator();

export const withLoginFormStrategy = () => new FormStrategy(async ({form}) => {
  const data = await validator.validate(form);
  if (data.error) {
    throw new AuthorizationError('auth.login.validator.invalidData');
  }

  const password = form.get('password');
  if (password !== 'test') {
    throw new AuthorizationError('auth.login.invalidCredentials');
  }

  return form.get('email') as string;
})
