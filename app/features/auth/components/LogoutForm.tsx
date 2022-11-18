import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

interface LogoutFormProps {
  label: string;
}

export const LogoutForm = ({label}: LogoutFormProps) => {
  const {t} = useTranslation();

  return (
    <Form method="post">
      <button className="text-emerald-500 text-xl">{t(label)}</button>
      <input type="hidden" name="logout" value="logout"/>
    </Form>
  );
};
