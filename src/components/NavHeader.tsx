import { useQuery } from '@apollo/client';
import { BellIcon, CogIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import * as Me from '../graphql/frontend/queries/MeQuery';

const BACKGROUND_COLORS = [
  'bg-pink-600',
  'bg-sky-600',
  'bg-lime-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-violet-500',
  'bg-red-500',
  'bg-indigo-500',
];

const NavHeader: React.FC = function () {
  const { data: meData } = useQuery<Me.Data>(Me.Query);

  const firstName = meData?.me?.firstName;
  const lastName = meData?.me?.lastName;
  const avatarUrl = meData?.me?.avatar;

  const randomBgClass = React.useMemo(() => {
    return BACKGROUND_COLORS[
      Math.floor(Math.random() * BACKGROUND_COLORS.length)
    ];
  }, []);

  return (
    <header className="flex items-center justify-end border border-solid border-gray-300 py-2 pr-6">
      <div className="flex">
        <div className="py-3 pr-3">
          <CogIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
        </div>
        <div className="py-3 pr-3">
          <BellIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
        </div>
        <span
          className={classNames(
            'flex h-10 w-10 items-stretch justify-items-stretch overflow-hidden rounded-full',
            randomBgClass
          )}
        >
          {avatarUrl != null ? (
            <Image
              className="grow object-cover"
              src={avatarUrl}
              alt="profile placeholder"
              width={24}
              height={24}
            />
          ) : (
            <span className="grow self-center text-center font-black uppercase text-white">
              {firstName?.[0]}
              {lastName?.[0]}
            </span>
          )}
        </span>
      </div>
    </header>
  );
};

export default NavHeader;
