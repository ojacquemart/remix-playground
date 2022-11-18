import type { ActionFunction, LoaderFunction} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

import { useTranslation } from 'react-i18next';

import { ValidatedForm } from 'remix-validated-form';

import { AuthTitle } from '~/features/auth/components/AuthTitle';
import { LogoutForm } from '~/features/auth/components/LogoutForm';

import { loginAuthenticator } from '~/features/auth/login-authenticator';
import { registerAuthenticator, registerSessionStorage } from '~/features/auth/register-authenticator';
import { createUsernameValidator } from '~/features/auth/register-validator';

import { FormInput } from '~/features/core/components/form/FormInput';
import { SubmitButton } from '~/features/core/components/form/SubmitButton';

import { Hr } from '~/features/core/components/shared/Hr';

const validator = createUsernameValidator();

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  if (formData.get('logout')) {
    return registerAuthenticator.logout(request, {redirectTo: '/register'});
  }

  const user = await registerAuthenticator.isAuthenticated(request);
  if (user === null) {
    return redirect('/register');
  }

  if (!formData.get('username')) {
    return redirect('/username');
  }

  // update username in the current register session
  user.username = formData.get('username') as string;

  const session = await registerSessionStorage.getSession(request.headers.get('cookie'));
  session.set(registerAuthenticator.sessionKey, user);

  return redirect('/register/greetings', {
    headers: {'Set-Cookie': await registerSessionStorage.commitSession(session)},
  });
};

export const loader: LoaderFunction = async ({request}) => {
  await loginAuthenticator.isAuthenticated(request, {successRedirect: '/'});
  const user = await registerAuthenticator.isAuthenticated(request, {failureRedirect: '/register'});

  if (user.username) {
    return redirect('/register/greetings');
  }

  return json(null);
};

export default function Username() {
  const {t} = useTranslation();

  return (
    <>
      <AuthTitle label={t('auth.register.username.title')}/>

      <ValidatedForm validator={validator} method="post" className="w-full">
        <FormInput name="username" type="text"
                   label={t('auth.fields.username')}/>

        <SubmitButton
          className="mt-3"
          label={t('auth.continue')}
          labelSubmitting={t('auth.continueSubmitting')}/>
      </ValidatedForm>

      <Hr></Hr>

      <LogoutForm label="auth.register.cancel"/>
    </>
  );
}
