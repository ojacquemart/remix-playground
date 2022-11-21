import { withZod } from '@remix-validated-form/with-zod';

import { z } from 'zod';

const registerSchema = z.object({
  email: z
    .string()
    .min(1, {message: 'auth.register.validator.email'})
    .email('auth.invalidEmail'),
  password: z
    .string()
    .min(8, {message: 'auth.register.validator.password'}),
  passwordConfirm: z.string(),
})
  .refine(
    ({password, passwordConfirm}) =>
      password === passwordConfirm,
    {
      path: ['passwordConfirm'],
      message: 'auth.register.validator.passwordConfirm',
    },
  );

export const registerValidator = withZod(registerSchema);

const usernameSchema = z.object({
  username: z
    .string()
    .min(1, {message: 'auth.register.username.required'}),
});

export const createUsernameValidator = () => withZod(usernameSchema);
