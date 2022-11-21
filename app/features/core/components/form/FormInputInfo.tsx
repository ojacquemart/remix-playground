import { Trans } from 'react-i18next';

import { I18nProps } from '~/features/core/components/shared/props';

interface FormInputInfoProps extends I18nProps {
}

export const FormInputInfo = ({i18nKey}: FormInputInfoProps) => {
  return (
    <div className="ml-2 mt-1 text-gray-500">
      <Trans i18nKey={i18nKey}/>
    </div>
  );
};
