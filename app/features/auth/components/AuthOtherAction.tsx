import { Link } from '@remix-run/react';

import { Hr } from '~/features/core/components/shared/Hr';

interface AlreadyActionProps {
  questionLabel: string;
  actionLabel: string;
  route: string;
}

export const AuthOtherAction = ({questionLabel, actionLabel, route}: AlreadyActionProps) => {
  return (
    <>
      <Hr></Hr>
      <div className="flex flex-col sm:flex-row align-left text-xl">
        <span>{questionLabel}</span>
        <Link className="ml-0 sm:ml-2 text-emerald-500" to={route}>
          {actionLabel}
        </Link>
      </div>
    </>
  );
};
