import { AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { handleClientScriptLoad } from 'next/script';
import React, { useEffect, useState } from 'react';

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

  const NavLinks: Links[] = [
    { href: '/manage/volunteer', name: 'Users', icon: UsersIcon },
    { href: '/manage/class', name: 'Courses', icon: AcademicCapIcon },
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
        <nav className="sidenav border-r px-2 sm:hidden md:flex">
          <div className="mb-4 inline w-full">
            <ByteLogo />
          </div>

          <Select
            items={[
              { label: 'Committee Member', value: 'Committee Member' },
              { label: 'Admin', value: 'Admin' },
            ]}
            label={'View As'}
            value={'Test'}
            className="w-full"
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          ></Select>
          <ul className="w-full">
            {NavLinks.map((link, i) => (
              <li
                key={'link' + i}
                className={classNames(
                  {
                    'bg-gray-100 text-brand-main': linkSelected === link.name,
                    'text-gray-500': linkSelected !== link.name,
                  },
                  'group mb-0.5 flex w-full items-center rounded-lg py-0.5 px-0.5 hover:bg-gray-100 hover:text-brand-main sm:py-3 sm:px-4'
                )}
                onClick={() => handleClick(link.name)}
              >
                <link.icon
                  className={classNames(
                    {
                      'text-brand-main': linkSelected === link.name,
                      'text-gray-500': linkSelected !== link.name,
                    },
                    'h-6 w-6 group-hover:text-sky-600'
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
      <div className="md:ml-48">{children}</div>
    </>
  );
};

export default NavBar;
