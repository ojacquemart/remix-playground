import { I18nProps } from '~/features/core/components/shared/props';

import { FormInput } from '~/features/core/components/form/FormInput';

interface InputPasswordProps extends I18nProps {
  name: string;
}

export const FormInputPassword = ({name, i18nKey}: InputPasswordProps) => {
  return (
    <FormInput name={name} i18nKey={i18nKey} type="password"/>
  );
};
