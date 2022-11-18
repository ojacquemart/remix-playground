import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { loginAuthenticator } from '~/features/auth/login-authenticator';

import { LogoutForm } from '~/features/auth/components/LogoutForm';
import { registerAuthenticator } from '~/features/auth/register-authenticator';

import { Hr } from '~/features/core/components/shared/Hr';

export const action: ActionFunction = async ({request}) => {
  return registerAuthenticator.logout(request, {redirectTo: '/'});
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
