import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { FormData, json, redirect } from '@remix-run/node';

import type { AuthenticateOptions } from 'remix-auth';

import { useLoaderData } from '@remix-run/react';

import { loginAuthenticator } from '~/features/auth/login-authenticator';
import type { NewUser } from '~/features/auth/new-user';
import { registerAuthenticator } from '~/features/auth/register-authenticator';

import { LogoutForm } from '~/features/auth/components/LogoutForm';

import { Hr } from '~/features/core/components/shared/Hr';

export const action: ActionFunction = async ({request}) => {
  const user = await registerAuthenticator.isAuthenticated(request);

  if (user == null) {
    return redirect('/register');
  }

  return loginUserFromRegisterData(user, request);
};

const loginUserFromRegisterData = async (user: NewUser, request: Request) => {
  const formData = new FormData();
  formData.set('email', user?.email);
  formData.set('password', user?.password);

  const options: AuthenticateOptions = {
    name: 'form',
    sessionKey: loginAuthenticator.sessionKey,
    sessionErrorKey: loginAuthenticator.sessionErrorKey,
    sessionStrategyKey: loginAuthenticator.sessionStrategyKey,
    successRedirect: '/',
    context: {formData},
  };

  return loginAuthenticator.authenticate('form', request, options);
};

export const loader: LoaderFunction = async ({request}) => {
  await loginAuthenticator.isAuthenticated(request, {successRedirect: '/'});
  const user = await registerAuthenticator.isAuthenticated(request, {failureRedirect: '/register'});

  return json(user);
};

export default function Greetings() {
  const data = useLoaderData();

  return (
    <>
      <h3 className="text-5xl text-center mb-4">🎉🎉🎉</h3>
      <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 4)}</pre>

      <Hr/>

      <LogoutForm label="auth.register.greetings.home"></LogoutForm>
    </>
  );
}
