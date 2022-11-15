import { Outlet } from '@remix-run/react';

import { useTranslation } from 'react-i18next';

import { LangSelector } from '~/features/core/components/shared/LangSelector';

export default function AuthRoot() {
  const {t, i18n} = useTranslation();

  return (
    <div className="flex flex-col justify-start items-center py-8 px-4 sm:px-0">
      <h1 className="mb-4 sm:mb-2 text-center text-4xl uppercase">{t('title')}</h1>
      <div className="p-4 sm:p-8 w-auto sm:w-128
          bg-white text-black
          border-0 sm:border-2 border-solid border-zinc-400 rounded">
        <Outlet/>
      </div>
      <LangSelector currentLang={i18n.resolvedLanguage}></LangSelector>
    </div>
  );
}
