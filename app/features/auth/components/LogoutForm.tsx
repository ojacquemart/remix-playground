import { Form } from '@remix-run/react';

import { useTranslation } from 'react-i18next';

import { I18nProps } from '~/features/core/components/shared/props';

interface LogoutFormProps extends I18nProps {
}

export const LogoutForm = ({i18nKey}: LogoutFormProps) => {
  const {t} = useTranslation();

  return (
    <Form method="post">
      <button className="text-emerald-500 text-xl">{t(i18nKey)}</button>
      <input type="hidden" name="logout" value="logout"/>
    </Form>
  );
};
