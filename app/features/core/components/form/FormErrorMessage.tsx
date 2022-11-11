import { useTranslation } from 'react-i18next';

interface FormErrorMessageProps {
  i18nError: string;
}

export const FormErrorMessage = ({i18nError}: FormErrorMessageProps) => {
  const {t} = useTranslation();

  return (
    <p className="text-lg text-red-400 mt-1">{t(i18nError)}</p>
  );
};
