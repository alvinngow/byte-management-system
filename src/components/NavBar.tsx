import { useQuery } from '@apollo/client';
import { AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { handleClientScriptLoad } from 'next/script';
import React, { useEffect, useState } from 'react';

import * as Me from '../graphql/frontend/queries/MeQuery';
import ByteLogo from './icons/ByteLogo';
import NavLink from './NavLink';
import Select from './Select';

interface Links {
  href: string;
  name: 'Users' | 'Courses';
  icon: React.ElementType;
}

interface Props extends React.PropsWithChildren {}

const NavBar: React.FC<Props> = function (props) {
  const { children } = props;
  const { data: meData } = useQuery<Me.Data>(Me.Query);

  const NavLinks: Links[] = [
    { href: '/manage/volunteer', name: 'Users', icon: UsersIcon },
    { href: '/manage/course', name: 'Courses', icon: AcademicCapIcon },
  ];

  const [linkSelected, setLinkSelected] = useState<'Users' | 'Courses'>(
    'Users'
  );
  const handleClick = (value: 'Users' | 'Courses') => {
    setLinkSelected(value);
  };

  return (
    <>
      <>
        <nav className="sidenav border border-r-gray-300 px-3 xsm:hidden md:flex md:items-start">
          <NavLink className="mt-2 mb-10" href="/">
            <ByteLogo className="pr-5" width="84px sm:45px" />
          </NavLink>
          <div className="relative mb-2 w-full">
            <Select
              items={[
                { label: 'Volunteer', value: 'user' },
                { label: 'Committee Member', value: 'committee_member' },
                { label: 'Admin', value: 'system_administrator' },
              ]}
              label={'View As'}
              value={meData?.me?.role ?? 'None'}
              className="mb-3 w-full"
              onChange={function (value: string): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
          <ul className="w-full">
            {NavLinks.map((link, i) => (
              <li
                key={'link' + i}
                className={classNames(
                  {
                    'bg-brand-hover text-brand-main':
                      linkSelected === link.name,
                    'text-secondary': linkSelected !== link.name,
                  },
                  'group mb-0.5 flex w-full cursor-pointer items-center rounded-lg py-0.5 px-0.5 hover:bg-brand-hover hover:text-brand-main sm:py-3 sm:px-4'
                )}
                onClick={() => handleClick(link.name)}
              >
                <link.icon
                  className={classNames(
                    {
                      'text-brand-main': linkSelected === link.name,
                      'text-secondary': linkSelected !== link.name,
                    },
                    'h-6 w-6 group-hover:text-brand-main'
                  )}
                />
                <NavLink className="group pl-4 font-semibold" href={link.href}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </>
      <div className="md:ml-64">{children}</div>
    </>
  );
};

export default NavBar;
