import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { ValidatedForm } from 'remix-validated-form';

import type { SessionLoaderData } from '~/features/auth/authenticator-enhanced';
import { loginAuthenticator, loginSessionStorage } from '~/features/auth/login-authenticator';
import { loginValidator } from '~/features/auth/login-validator';

import { AuthOtherAction } from '~/features/auth/components/AuthOtherAction';
import { AuthTitle } from '~/features/auth/components/AuthTitle';

import { FormErrorMessage } from '~/features/core/components/form/FormErrorMessage';
import { FormInput } from '~/features/core/components/form/FormInput';
import { FormInputPassword } from '~/features/core/components/form/FormInputPassword';
import { SubmitButton } from '~/features/core/components/form/SubmitButton';

export const loader: LoaderFunction = async ({request}) => {
  await loginAuthenticator.isAuthenticated(request, {successRedirect: '/'});

  const {error, session} = await loginAuthenticator.loadErrorSession(request);

  return json<SessionLoaderData>({error}, {
    headers: {
      'Set-Cookie': await loginSessionStorage.commitSession(session),
    },
  });
};

export const action: ActionFunction = async ({request}) => {
  return loginAuthenticator.safeAuthenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  });
};

export default function Login() {
  const {error} = useLoaderData<SessionLoaderData>();

  return (
    <>
      <AuthTitle i18nKey="auth.login.title"/>

      <ValidatedForm validator={loginValidator} method="post" className="w-full">
        <FormInput name="email" type="text" i18nKey="auth.fields.email"/>
        <FormInputPassword name="password" i18nKey="auth.fields.password"/>

        {error ? <FormErrorMessage i18nKey={error.message}/> : null}

        <SubmitButton
          className="mt-5"
          i18nKey="auth.continue"
          i18nKeySubmitting="auth.continueSubmitting"/>
      </ValidatedForm>

      <AuthOtherAction
        i18nQuestion="auth.login.noAccount"
        i18nAction="auth.login.registerInstead"
        route="/register"/>
    </>
  );
}
