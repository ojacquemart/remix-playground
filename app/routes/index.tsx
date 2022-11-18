import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import { useTranslation } from 'react-i18next';

import { loginAuthenticator } from '~/features/auth/login-authenticator';
import { LogoutForm } from '~/features/auth/components/LogoutForm';

import { Hr } from '~/features/core/components/shared/Hr';
import { LangSelector } from '~/features/core/components/shared/LangSelector';
import { Resources } from '~/features/core/components/shared/Resources';

export const action: ActionFunction = async ({request}) => {
  await loginAuthenticator.logout(request, {redirectTo: '/login'});
};

export const loader: LoaderFunction = async ({request}) => {
  await loginAuthenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  return json(null);
};

export default function Index() {
  const {t, i18n} = useTranslation();

  return (
    <div className="flex flex-col justify-start items-center mt-8 h-screen">
      <h1 className="text-3xl font-bold">{t('title')} 💿</h1>

      <div className="w-3/4 sm:w-1/3 text-center">
        <Hr/>
        <LogoutForm label={t('auth.logout.title')}/>
        <Hr/>

        <Resources/>
      </div>

      <LangSelector currentLang={i18n.resolvedLanguage}></LangSelector>
    </div>
  );
}
