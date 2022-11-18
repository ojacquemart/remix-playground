import type { ActionFunction , LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { ValidatedForm } from 'remix-validated-form';

import { loginAuthenticator } from '~/features/auth/login-authenticator';
import { registerAuthenticator, registerSessionStorage } from '~/features/auth/register-authenticator';
import { createRegisterValidator } from '~/features/auth/register-validator';

import { AuthOtherAction } from '~/features/auth/components/AuthOtherAction';
import { AuthTitle } from '~/features/auth/components/AuthTitle';

import { CguNotice } from '~/features/auth/components/CguNotice';
import { FormCheckbox } from '~/features/core/components/form/FormCheckbox';

import { FormInput } from '~/features/core/components/form/FormInput';
import { SubmitButton } from '~/features/core/components/form/SubmitButton';
import type { SessionLoaderData } from '~/features/auth/session';
import { loadSessionError } from '~/features/auth/session';
import { useLoaderData } from '@remix-run/react';
import { FormErrorMessage } from '~/features/core/components/form/FormErrorMessage';

const validator = createRegisterValidator();

export const action: ActionFunction = async ({request}) => {
  return registerAuthenticator.authenticate('form', request, {
    successRedirect: '/register/username',
    failureRedirect: '/register',
  });
};


export const loader: LoaderFunction = async ({request}) => {
  await loginAuthenticator.isAuthenticated(request, {successRedirect: '/'});
  await registerAuthenticator.isAuthenticated(request, {successRedirect: '/register/username'});

  const {error, session} = await loadSessionError(request, registerAuthenticator, registerSessionStorage);

  return json<SessionLoaderData>({error}, {
    headers: {
      'Set-Cookie': await registerSessionStorage.commitSession(session),
    },
  });
};

export default function Register() {
  const {error} = useLoaderData<SessionLoaderData>();
  const {t} = useTranslation();

  const [showPasswords, setShowPasswords] = useState(false);

  return (
    <>
      <AuthTitle label={t('auth.register.title')}/>

      <ValidatedForm validator={validator} method="post" className="w-full">
        <FormInput name="email" type="text"
                   label={t('auth.fields.email')}/>

        <FormInput name="password" type={showPasswords ? 'text' : 'password'}
                   info={t('auth.register.passwordPolicy')}
                   label={t('auth.fields.password')}/>
        <FormInput name="passwordConfirm" type={showPasswords ? 'text' : 'password'}
                   label={t('auth.fields.passwordConfirm')}/>


        <FormCheckbox label={t('auth.register.showPasswords')}
                      onChange={() => setShowPasswords(!showPasswords)}/>

        <CguNotice/>
        {error ? <FormErrorMessage i18nError={error.message}/> : null}
        <SubmitButton
          className="mt-3"
          label={t('auth.continue')}
          labelSubmitting={t('auth.continueSubmitting')}/>
      </ValidatedForm>

      <AuthOtherAction
        questionLabel={t('auth.register.alreadyAccount')}
        actionLabel={t('auth.register.loginInstead')}
        route="/login"
      />
    </>
  );
}
