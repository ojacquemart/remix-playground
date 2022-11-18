import { useTranslation } from 'react-i18next';

export const Resources = () => {
  const {t} = useTranslation();

  return (
    <ul className="list-disc text-left">
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
  );
};
