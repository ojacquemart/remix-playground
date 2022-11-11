import { Link } from '@remix-run/react';

import { useState } from 'react';

const DEFAULT_LANGS: Lang[] = [
  {key: 'en', name: 'English'},
  {key: 'fr', name: 'Français'},
];

interface Lang {
  key: string;
  name: string;
}

interface LangSelectorProps {
  currentLang: string;
}

export const LangSelector = ({currentLang}: LangSelectorProps) => {

  const [langs] = useState(DEFAULT_LANGS);

  return (
    <div className="pt-4 pb-2 text-center">
      {langs.map((lang) => (
        <Link
          key={lang.key}
          className={currentLang === lang.key ? 'font-bold underline underline-offset-4' : 'undefined'}
          style={{marginRight: 5}}
          to={`?lng=${lang.key}`}
        >
          {lang.name}
        </Link>
      ))}
    </div>
  );
};
