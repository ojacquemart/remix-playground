import { useField } from 'remix-validated-form';

import { useTranslation } from 'react-i18next';

import { I18nProps } from '~/features/core/components/shared/props';

import { FormErrorMessage } from '~/features/core/components/form/FormErrorMessage';
import { FormInputInfo } from '~/features/core/components/form/FormInputInfo';

interface FormInputProps extends I18nProps {
  name: string;
  i18nInfo?: string;
  type: 'text' | 'password';
}

export const FormInput = ({name, i18nInfo, i18nKey, type}: FormInputProps) => {
  const {t} = useTranslation();
  const {getInputProps, error} = useField(name);

  return (
    <div className="mb-2">
      <label htmlFor={name} className="text-xl uppercase">{t(i18nKey)}</label>
      <input type={type ?? 'string'}
             className="w-full p-2 text-xl text-zinc-800 font-medium bg-gray-100 rounded-lg border border-gray-200 placeholder-gray-500 focus-visible:outline-gray-400 focus:border-gray-400 focus:bg-white"
             {...getInputProps({id: name})}
      />
      {i18nInfo && <FormInputInfo i18nKey={i18nInfo}/>}
      {error && <FormErrorMessage i18nKey={error}/>}
    </div>
  );
};
