import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { useTranslation } from 'react-i18next';

import { ValidatedForm } from 'remix-validated-form';

import { auth, sessionStorage } from '~/auth.server';

import { AuthOtherAction } from '~/features/auth/components/AuthOtherAction';
import { AuthTitle } from '~/features/auth/components/AuthTitle';

import { withLoginValidator } from '~/features/auth/login-validator';

import { FormErrorMessage } from '~/features/core/components/form/FormErrorMessage';
import { FormInput } from '~/features/core/components/form/FormInput';
import { FormInputPassword } from '~/features/core/components/form/FormInputPassword';
import { SubmitButton } from '~/features/core/components/form/SubmitButton';

const validator = withLoginValidator();

type LoaderData = {
  error: { message: string } | null;
};

export const loader: LoaderFunction = async ({request}) => {
  await auth.isAuthenticated(request, {successRedirect: '/'});
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie'),
  );
  const error = session.get(auth.sessionErrorKey) as LoaderData['error'];

  return json<LoaderData>({error}, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
};

export const action: ActionFunction = async ({request}) => {
  return auth.authenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  });
};

export default function Login() {
  const {error} = useLoaderData<LoaderData>();
  const {t} = useTranslation();

  return (
    <>
      <AuthTitle label={t('auth.login.title')}/>

      <ValidatedForm validator={validator} method="post" className="w-full">
        <FormInput name="email" type="text" label={t('auth.fields.email')}/>
        <FormInputPassword name="password" label={t('auth.fields.password')}/>

        {error ? <FormErrorMessage i18nError={error.message}/> : null}

        <SubmitButton
          className="mt-5"
          label={t('auth.continue')}
          labelSubmitting={t('auth.continueSubmitting')}/>
      </ValidatedForm>

      <AuthOtherAction
        questionLabel={t('auth.login.noAccount')}
        actionLabel={t('auth.login.registerInstead')}
        route="/register"/>
    </>
  );
}
