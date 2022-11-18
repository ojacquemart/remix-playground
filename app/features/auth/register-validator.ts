import { withZod } from '@remix-validated-form/with-zod';

import { z } from 'zod';

import { loginSchema } from '~/features/auth/login-validator';

const registerSchema = loginSchema.extend(
  {
    passwordConfirm: z
      .string(),
  })
  .refine(
    ({password, passwordConfirm}) =>
      password === passwordConfirm,
    {
      path: ['passwordConfirm'],
      message: 'auth.register.validator.passwordConfirm',
    },
  );

export const createRegisterValidator = () => withZod(registerSchema);

const usernameSchema = z.object({
  username: z
    .string()
    .min(1, {message: 'auth.register.username.required'})});

export const createUsernameValidator = () => withZod(usernameSchema);
