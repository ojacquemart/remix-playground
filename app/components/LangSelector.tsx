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
    <div>
      {langs.map((lang) => (
        <Link
          key={lang.key}
          style={{marginRight: 5, fontWeight: currentLang === lang.key ? 'bold' : 'normal'}}
          to={`/?lng=${lang.key}`}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
