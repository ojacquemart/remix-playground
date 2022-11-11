import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { LangSelector } from '~/features/core/components/shared/LangSelector';

export default function Index() {
  const {t, i18n} = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-screen" style={{fontFamily: 'system-ui, sans-serif', lineHeight: '1.4'}}>
      <h1 className="text-3xl font-bold">{t('title')} 💿</h1>

      <LangSelector currentLang={i18n.resolvedLanguage}></LangSelector>

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
    </div>
  );
}
