import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';

import { useTranslation } from 'react-i18next';

import { auth } from '~/auth.server';

import { LangSelector } from '~/features/core/components/shared/LangSelector';

export const action: ActionFunction = async ({request}) => {
  await auth.logout(request, {redirectTo: '/login'});
};

export const loader: LoaderFunction = async ({request}) => {
  await auth.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  return json(null);
};

export default function Index() {
  const {t, i18n} = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-screen"
         style={{fontFamily: 'system-ui, sans-serif', lineHeight: '1.4'}}>
      <h1 className="text-3xl font-bold">{t('title')} 💿</h1>

      <Form method="post">
        <button>Log Out</button>
      </Form>

      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            {t('tutorials.blog')}
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            {t('tutorials.jokes')}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            {t('docs')}
          </a>
        </li>
      </ul>

      <LangSelector currentLang={i18n.resolvedLanguage}></LangSelector>
    </div>
  );
}
