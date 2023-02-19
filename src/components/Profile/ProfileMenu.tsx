import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

import * as MeQuery from '../../graphql/frontend/queries/MeQuery';
import NavLink from '../NavLink';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data?: MeQuery.Data;
  focused: boolean;
}

const ProfileMenu: React.FC<Props> = function (props) {
  const { data, focused, className } = props;

  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!focused) {
      return;
    }

    elementRef.current?.scrollIntoView({
      block: 'nearest',
    });
  }, [focused]);

  return (
    <div
      ref={elementRef}
      className={classNames(
        'z-50 flex w-full flex-col items-start gap-y-px overflow-hidden rounded-b-lg bg-white p-2.5 shadow-lg',
        {
          'bg-brand-hover': focused,
        },
        className
      )}
    >
      <div className="subtitle1">{`${data?.me?.firstName} ${data?.me?.lastName}`}</div>
      <div className="body1 text-secondary mb-3">{`${data?.me?.email}`}</div>
      <NavLink className="w-full items-start" href="/settings">
        <div
          className={classNames(
            'text-md flex w-full cursor-pointer rounded bg-white px-2 py-2 hover:bg-brand-hover'
          )}
        >
          Edit Profile
        </div>
      </NavLink>
      <NavLink className="w-full" href="/logout">
        <div
          className={classNames(
            'text-md flex w-full cursor-pointer rounded bg-white px-2 py-2 hover:bg-brand-hover'
          )}
        >
          Logout
        </div>
      </NavLink>
    </div>
  );
};

export default ProfileMenu;
