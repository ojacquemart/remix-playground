import { useField } from 'remix-validated-form';

import { FormErrorMessage } from '~/features/core/components/form/FormErrorMessage';
import { FormInputInfo } from '~/features/core/components/form/FormInputInfo';

interface FormInputProps {
  name: string;
  info?: string;
  label: string;
  type: 'text' | 'password';
}

export const FormInput = ({name, info, label, type}: FormInputProps) => {
  const {getInputProps, error} = useField(name);

  return (
    <div className="mb-2">
      <label htmlFor={name} className="text-2xl uppercase">{label}</label>
      <input type={type ?? 'string'}
             className="w-full p-2
          text-xl text-zinc-800 font-medium
          bg-gray-100
          rounded-lg border border-gray-200
          placeholder-gray-500
          focus-visible:outline-gray-400 focus:border-gray-400 focus:bg-white"
             {...getInputProps({id: name})}
      />
      {info && <FormInputInfo label={info}/>}
      {error && <FormErrorMessage i18nError={error}/>}
    </div>
  );
};
