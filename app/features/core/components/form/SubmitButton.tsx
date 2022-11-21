import { useIsSubmitting } from 'remix-validated-form';

import { useTranslation } from 'react-i18next';

import { I18nProps } from '~/features/core/components/shared/props';

interface SubmitButtonProps extends I18nProps {
  className?: string;
  i18nKey: string;
  i18nKeySubmitting: string;
}

export const SubmitButton = ({i18nKey, i18nKeySubmitting, className}: SubmitButtonProps) => {
  const {t} = useTranslation();
  const isSubmitting = useIsSubmitting();

  return (
    <button
      type="submit"
      className={`${className} block w-full text-white bg-emerald-500 active:outline active:outline-1 focus-visible:outline-emerald-400 text-2xl font-bold p-4 rounded-lg`}
      disabled={isSubmitting}
    >
      {t(isSubmitting ? i18nKeySubmitting : i18nKey)}
    </button>
  );
};
