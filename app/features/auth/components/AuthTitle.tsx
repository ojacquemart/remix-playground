import { useTranslation } from 'react-i18next';

import { I18nProps } from '~/features/core/components/shared/props';

interface AuthTitleProps extends I18nProps {
}

export const AuthTitle = ({i18nKey}: AuthTitleProps) => {
  const {t} = useTranslation();

  return (
    <h2 className="mb-4 text-3xl">{t(i18nKey)}</h2>
  );
};
