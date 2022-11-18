import { withZod } from '@remix-validated-form/with-zod';

import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {message: 'auth.login.validator.email'})
    .email('auth.invalidEmail'),
  password: z
    .string()
    .min(1, {message: 'auth.login.validator.password'}),
});

export const createLoginValidator = () => withZod(loginSchema);

