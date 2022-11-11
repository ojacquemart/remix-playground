import { Trans } from 'react-i18next';

interface FormInputInfoProps {
  label: string;
}

export const FormInputInfo = ({label}: FormInputInfoProps) => {
  return (
    <div className="ml-2 mt-1 text-gray-500">
      <Trans i18nKey={label}/>
    </div>
  );
};
