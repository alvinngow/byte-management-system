import { useQuery } from '@apollo/client';
import {
  AcademicCapIcon,
  Bars3Icon,
  BellIcon,
  CogIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

import * as Me from '../graphql/frontend/queries/MeQuery';
import ByteLogo from './ByteLogo';
import NavLink from './NavLink';
import Select from './Select';

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

interface Links {
  href: string;
  name: 'Users' | 'Classes';
  icon: React.ElementType;
}
interface Props extends React.PropsWithChildren {}

const NavHeader: React.FC<Props> = function (props) {
  const { data: meData } = useQuery<Me.Data>(Me.Query);

  const NavLinks: Links[] = [
    { href: '/manage/volunteer', name: 'Users', icon: UsersIcon },
    { href: '/manage/class', name: 'Classes', icon: AcademicCapIcon },
  ];

  const [linkSelected, setLinkSelected] = useState<'Users' | 'Classes'>(
    'Users'
  );

  const firstName = meData?.me?.firstName;
  const lastName = meData?.me?.lastName;
  const avatarUrl = meData?.me?.avatar;

  const randomBgClass = useMemo(() => {
    return BACKGROUND_COLORS[
      Math.floor(Math.random() * BACKGROUND_COLORS.length)
    ];
  }, []);

  const [modal, setModal] = useState(false);

  const handleClick = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const [viewportSize, setViewport] = useState('desktop');

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setViewport('desktop');
    } else {
      setViewport('mobile');
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setViewport('desktop');
      } else {
        setViewport('mobile');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header
        className={classNames(
          {
            'justify-between': viewportSize === 'mobile',
            'justify-end': viewportSize === 'desktop',
          },
          'absolute sticky top-0 z-20 flex items-center border border-solid border-gray-300 bg-white py-2 pr-6'
        )}
      >
        {viewportSize === 'mobile' && (
          <div className="pl-2">
            <ByteLogo />
          </div>
        )}
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
          {viewportSize === 'mobile' && (
            <Bars3Icon
              onClick={() => handleClick()}
              style={{ color: '#6B7280' }}
              className="m-3 h-6 w-6"
            />
          )}
        </div>
      </header>
      {modal && (
        <div className="fixed z-10 block h-screen min-w-full bg-gray-700/50">
          <div className="z-20 rounded-b-lg bg-white px-4">
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
                      'text-sky-600 bg-gray-100': linkSelected === link.name,
                      'text-gray-500': linkSelected !== link.name,
                    },
                    'hover:text-sky-600 group mb-0.5 flex w-full items-center rounded-lg py-3 px-3 hover:bg-gray-100 sm:py-3 sm:px-4'
                  )}
                  onClick={() => setLinkSelected(link.name)}
                >
                  <link.icon
                    className={classNames(
                      {
                        'text-sky-600': linkSelected === link.name,
                        'text-gray-500': linkSelected !== link.name,
                      },
                      'group-hover:text-sky-600 h-6 w-6'
                    )}
                  />
                  <NavLink
                    className="group pl-4 font-semibold"
                    href={link.href}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NavHeader;
