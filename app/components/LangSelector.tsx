import { Link } from '@remix-run/react';

import { useState } from 'react';

const DEFAULT_LANGS: Lang[] = [
  {key: 'en', label: 'English',},
  {key: 'fr', label: 'Français',}
];

type Lang = {
  key: string;
  label: string;
}

type LangSelectorProps = {
  currentLang: string;
}

export default function LangSelector({currentLang }: LangSelectorProps) {

  const [langs] = useState(DEFAULT_LANGS);

  return (
    <div className="my-4">
      {langs.map((lang) => (
        <Link
          key={lang.key}
          className={currentLang === lang.key ? 'font-ios-bold': 'undefined'}
          style={{marginRight: 5}}
          to={`/?lng=${lang.key}`}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
