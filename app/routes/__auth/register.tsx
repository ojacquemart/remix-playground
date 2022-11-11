import type { ActionFunction } from '@remix-run/node';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { ValidatedForm } from 'remix-validated-form';

import { AuthOtherAction } from '~/features/auth/components/AuthOtherAction';
import { AuthTitle } from '~/features/auth/components/AuthTitle';
import { CguNotice } from '~/features/auth/components/CguNotice';

import { withRegisterValidator } from '~/features/auth/register-validator';
import { withAuthAction } from '~/features/auth/with-auth-action';
import { FormCheckbox } from '~/features/core/components/form/FormCheckbox';

import { FormInput } from '~/features/core/components/form/FormInput';
import { SubmitButton } from '~/features/core/components/form/SubmitButton';

const validator = withRegisterValidator();

export const action: ActionFunction = async ({request}) => {
  return withAuthAction({request, validator});
};

export default function Register() {
  const {t} = useTranslation();

  const [showPasswords, setShowPasswords] = useState(false);

  return (
    <>
      <AuthTitle label={t('auth.register.title')}/>

      <ValidatedForm validator={validator} method="post" className="w-full">
        <FormInput name="email" type="text"
                   label={t('auth.fields.email')}/>

        <FormInput name="password" type={showPasswords ? 'text' : 'password'}
                   info={t('auth.register.passwordPolicy')}
                   label={t('auth.fields.password')}/>
        <FormInput name="passwordConfirm" type={showPasswords ? 'text' : 'password'}
                   label={t('auth.fields.passwordConfirm')}/>


        <FormCheckbox label={t('auth.register.showPasswords')}
                      onChange={() => setShowPasswords(!showPasswords)}/>

        <CguNotice/>
        <SubmitButton
          className="mt-3"
          label={t('auth.continue')}
          labelSubmitting={t('auth.continueSubmitting')}/>
      </ValidatedForm>

      <AuthOtherAction
        questionLabel={t('auth.register.alreadyAccount')}
        actionLabel={t('auth.register.loginInstead')}
        route="/login"
      />
    </>
  );
}
