import { redirect } from '@remix-run/node';

import type { Validator } from 'remix-validated-form';
import { validationError } from 'remix-validated-form';

interface AuthActionParams {
  request: Request;
  validator: Validator<any>;
}

export const withAuthAction = async ({request, validator}: AuthActionParams): Promise<Response> => {
  const data = await validator.validate(
    await request.formData(),
  );

  if (data.error) {
    return validationError(data.error);
  }

  return redirect('/');
};
