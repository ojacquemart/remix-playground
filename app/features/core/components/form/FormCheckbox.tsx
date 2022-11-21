import type { ChangeEventHandler } from 'react';

interface FormCheckboxProps {
  label: string;
  name?: string;
  onChange: ChangeEventHandler<HTMLElement> | undefined;
}

export const FormCheckbox = ({label, name, onChange}: FormCheckboxProps) => {
  return (
    <label className="flex items-center cursor-pointer" htmlFor={name}>
      <input type="checkbox" name={name}
             onChange={onChange}
             className="w-4 h-4 text-emerald-500 bg-gray-100 rounded border-gray-300 focus:ring-emerald-500 focus:ring-2"/>
      <span className="ml-2">{label}</span>
    </label>
  );
};
