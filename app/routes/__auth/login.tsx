import { ActionFunction } from '@remix-run/node';
import { useTranslation } from 'react-i18next';

import { ValidatedForm } from 'remix-validated-form';

import { AuthOtherAction } from '~/features/auth/components/AuthOtherAction';
import { AuthTitle } from '~/features/auth/components/AuthTitle';

import { withLoginValidator } from '~/features/auth/login-validator';
import { withAuthAction } from '~/features/auth/with-auth-action';

import { FormInput } from '~/features/core/components/form/FormInput';
import { FormInputPassword } from '~/features/core/components/form/FormInputPassword';
import { SubmitButton } from '~/features/core/components/form/SubmitButton';

const validator = withLoginValidator();

export const action: ActionFunction = async ({request}) => {
  return withAuthAction({request, validator});
};

export default function Login() {
  const {t} = useTranslation();

  return (
    <>
      <AuthTitle label={t('auth.login.title')}/>

      <ValidatedForm validator={validator} method="post" className="w-full">
        <FormInput name="email" type="text" label={t('auth.fields.email')}/>
        <FormInputPassword name="password" label={t('auth.fields.password')}/>

        <SubmitButton
          className="mt-5"
          label={t('auth.continue')}
          labelSubmitting={t('auth.continueSubmitting')}/>
      </ValidatedForm>

      <AuthOtherAction
        questionLabel={t('auth.login.noAccount')}
        actionLabel={t('auth.login.registerInstead')}
        route="/register"/>
    </>
  );
}
