import { Link } from '@remix-run/react';

import { useTranslation } from 'react-i18next';

import { Hr } from '~/features/core/components/shared/Hr';

interface AlreadyActionProps {
  i18nQuestion: string;
  i18nAction: string;
  route: string;
}

export const AuthOtherAction = ({i18nQuestion, i18nAction, route}: AlreadyActionProps) => {
  const {t} = useTranslation();

  return (
    <>
      <Hr></Hr>
      <div className="flex flex-col sm:flex-row align-left text-xl">
        <span>{t(i18nQuestion)}</span>
        <Link className="ml-0 sm:ml-2 text-emerald-500" to={route}>
          {t(i18nAction)}
        </Link>
      </div>
    </>
  );
};
