import { FormInput } from '~/features/core/components/form/FormInput';

interface InputPasswordProps {
  name: string;
  label: string;
}

export const FormInputPassword = ({name, label}: InputPasswordProps) => {
  return (
    <FormInput name={name} label={label} type="password"/>
  );
};
