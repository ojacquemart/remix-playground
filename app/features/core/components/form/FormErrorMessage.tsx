import { useTranslation } from 'react-i18next';

import { I18nProps } from '~/features/core/components/shared/props';

interface FormErrorMessageProps extends I18nProps {
}

export const FormErrorMessage = ({i18nKey}: FormErrorMessageProps) => {
  const {t} = useTranslation();

  return (
    <p className="text-lg text-red-400 mt-1">{t(i18nKey)}</p>
  );
};
