import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { useState } from 'react';

import { ValidatedForm } from 'remix-validated-form';

import { SessionLoaderData } from '~/features/auth/authenticator-enhanced';
import { registerAuthenticator, registerSessionStorage } from '~/features/auth/register-authenticator';
import { registerValidator } from '~/features/auth/register-validator';

import { AuthOtherAction } from '~/features/auth/components/AuthOtherAction';
import { AuthTitle } from '~/features/auth/components/AuthTitle';

import { CguNotice } from '~/features/auth/components/CguNotice';
import { FormCheckbox } from '~/features/core/components/form/FormCheckbox';
import { FormErrorMessage } from '~/features/core/components/form/FormErrorMessage';
import { FormInput } from '~/features/core/components/form/FormInput';
import { SubmitButton } from '~/features/core/components/form/SubmitButton';

export const action: ActionFunction = async ({request}) => {
  return registerAuthenticator.authenticate('form', request, {
    successRedirect: '/register/username',
    failureRedirect: '/register',
  });
};

export const loader: LoaderFunction = async ({request}) => {
  await registerAuthenticator.redirectToHomeIfLoggedIn(request, {successRedirect: '/register/username'});

  const {error, session} = await registerAuthenticator.loadErrorSession(request);

  return json<SessionLoaderData>({error}, {
    headers: {
      'Set-Cookie': await registerSessionStorage.commitSession(session),
    },
  });
};

export default function Register() {
  const {error} = useLoaderData<SessionLoaderData>();

  const [showPasswords, setShowPasswords] = useState(false);

  return (
    <>
      <AuthTitle i18nKey="auth.register.title"/>

      <ValidatedForm validator={registerValidator} method="post" className="w-full">
        <FormInput name="email" type="text"
                   i18nKey="auth.fields.email"/>

        <FormInput name="password" type={showPasswords ? 'text' : 'password'}
                   i18nInfo="auth.register.passwordPolicy"
                   i18nKey="auth.fields.password"/>
        <FormInput name="passwordConfirm" type={showPasswords ? 'text' : 'password'}
                   i18nKey="auth.fields.passwordConfirm"/>


        <FormCheckbox i18nKey="auth.register.showPasswords"
                      onChange={() => setShowPasswords(!showPasswords)}/>

        <CguNotice/>
        {error ? <FormErrorMessage i18nKey={error.message}/> : null}
        <SubmitButton
          className="mt-3"
          i18nKey="auth.continue"
          i18nKeySubmitting="auth.continueSubmitting"/>
      </ValidatedForm>

      <AuthOtherAction
        i18nQuestion="auth.register.alreadyAccount"
        i18nAction="auth.register.loginInstead"
        route="/login"
      />
    </>
  );
}
