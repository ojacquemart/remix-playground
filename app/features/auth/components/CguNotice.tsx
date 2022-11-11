import { Link } from '@remix-run/react';

import { Trans } from 'react-i18next';

export const CguNotice = () => {
  return (
    <p className="mt-4">
      <Trans i18nKey="auth.register.cguNotice">
        A<Link to="/terms" target="_blank" style={{'borderBottom': '1px dashed black'}}>B</Link>
      </Trans>
    </p>
  );
};
