import { useQuery } from '@apollo/client';
import {
  BellIcon,
  ChevronDownIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import ByteLogo from '../components/icons/ByteLogo';
import * as MeQuery from '../graphql/frontend/queries/MeQuery';
import NavLink from './NavLink';
const NavHeader: React.FC = function () {
  const [activeNavHeaderButton, setActiveNavHeaderButton] = React.useState<
    'home' | 'courses'
  >('home');
  const { data } = useQuery<MeQuery.Data>(MeQuery.Query);
  const firstName = data?.me?.firstName;
  const lastName = data?.me?.lastName;
  return (
    <header className="flex items-center justify-between border border-solid border-gray-300 px-0 py-4 md:px-28">
      <div className="mr-4 flex">
        <div className="py-2.5 px-5">
          <ByteLogo width="84px sm:45px" />
        </div>
        <div className="flex">
          <button
            onClick={() => setActiveNavHeaderButton('home')}
            className={classNames(
              activeNavHeaderButton === 'home'
                ? 'bg-gray-100 text-sky-600'
                : 'text-gray-600',
              'items-center rounded-lg py-2 px-2 text-sm italic text-gray-600 sm:px-4'
            )}
          >
            <NavLink href="/home">
              <p className="text-xs sm:text-sm">DISCOVER COURSES</p>
            </NavLink>
          </button>
          <button
            onClick={() => setActiveNavHeaderButton('courses')}
            className={classNames(
              activeNavHeaderButton === 'courses'
                ? 'bg-gray-100 text-sky-600'
                : 'text-gray-600',
              'items-center rounded-lg py-2 px-2 text-sm italic text-gray-600 sm:px-4'
            )}
          >
            <NavLink href="/courses">
              <p className="text-xs sm:text-sm">MY COURSES</p>
            </NavLink>
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="py-3 pr-3">
          <CogIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
        </div>
        <div className="py-3 pr-3">
          <BellIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-300">
          <Image
            className="h-6"
            src="/profile.png"
            alt="profile placeholder"
            width={24}
            height={24}
          />
        </span>
        <p className="hidden items-center pl-3 sm:flex">
          {firstName} {lastName}
        </p>
        <div className="hidden items-center pl-3 sm:flex">
          <ChevronDownIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
};

export default NavHeader;
