import type { ChangeEventHandler } from 'react';

import { useTranslation } from 'react-i18next';

import { I18nProps } from '~/features/core/components/shared/props';

interface FormCheckboxProps extends I18nProps {
  name?: string;
  onChange: ChangeEventHandler<HTMLElement> | undefined;
}

export const FormCheckbox = ({i18nKey, name, onChange}: FormCheckboxProps) => {
  const {t} = useTranslation();

  return (
    <label className="flex items-center cursor-pointer" htmlFor={name}>
      <input type="checkbox" name={name}
             onChange={onChange}
             className="w-4 h-4 text-emerald-500 bg-gray-100 rounded border-gray-300 focus:ring-emerald-500 focus:ring-2"/>
      <span className="ml-2">{t(i18nKey)}</span>
    </label>
  );
};
