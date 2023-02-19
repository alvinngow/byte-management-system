import { useQuery } from '@apollo/client';
import {
  AcademicCapIcon,
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CogIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

import * as Me from '../graphql/frontend/queries/MeQuery';
import IconButton from './IconButton';
import ByteLogo from './icons/ByteLogo';
import NavLink from './NavLink';
import ProfileMenu from './Profile/ProfileMenu';
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
  name: 'Users' | 'Courses';
  icon: React.ElementType;
}
interface Props extends React.PropsWithChildren {}

const NavHeader: React.FC<Props> = function (props) {
  const { data: meData } = useQuery<Me.Data>(Me.Query);

  const NavLinks: Links[] = [
    { href: '/manage/users', name: 'Users', icon: UsersIcon },
    { href: '/manage/course', name: 'Courses', icon: AcademicCapIcon },
  ];

  const [linkSelected, setLinkSelected] = useState<'Users' | 'Courses'>(
    'Users'
  );

  const firstName = meData?.me?.firstName;
  const lastName = meData?.me?.lastName;
  const avatarUrl = meData?.me?.avatar;
  const [isOpen, setIsOpen] = React.useState(false);

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
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen(false);
    setModal(false);
  };
  return (
    <>
      <header className="absolute sticky top-0 z-20 flex border border-white border-b-gray-300 py-4 xsm:items-end xsm:justify-between xsm:px-3 md:justify-end md:px-6">
        <NavLink className="md:hidden" href="/">
          <ByteLogo className="pr-5" width="84px sm:45px" />
        </NavLink>
        <div className="py-auto flex items-center gap-3">
          <IconButton HeroIcon={(props) => <CogIcon />} />
          <IconButton HeroIcon={(props) => <BellIcon />} />
          <button
            className="relative flex items-center gap-2.5 rounded-xl p-1 hover:bg-brand-hover"
            onClick={() => setIsOpen(true)}
          >
            <span
              className={classNames(
                'flex h-10 w-10 items-center justify-center rounded-full',
                randomBgClass
              )}
            >
              {avatarUrl ? (
                <Image
                  className="grow object-cover"
                  src={avatarUrl}
                  alt="profile placeholder"
                  width={24}
                  height={24}
                />
              ) : (
                <span className="avatarLetter grow self-center text-center text-white">
                  {firstName?.[0]}
                  {lastName?.[0]}
                </span>
              )}
            </span>
            <p className="xsm:flex xsm:hidden md:block">
              {firstName} {lastName}
            </p>
            <div className="xsm:flex xsm:hidden md:block">
              {isOpen ? (
                <ChevronUpIcon
                  style={{ color: '#6B7280' }}
                  className="h-6 w-6 pt-1"
                />
              ) : (
                <ChevronDownIcon
                  style={{ color: '#6B7280' }}
                  className="h-6 w-6 pt-1"
                />
              )}
            </div>
            {isOpen && (
              <ProfileMenu
                className="absolute top-14 items-start xsm:right-0 xsm:w-max md:left-0 md:w-full"
                data={meData}
                focused={false}
              />
            )}
          </button>
          <IconButton
            className="md:hidden"
            HeroIcon={(props) => (
              <Bars3Icon onClick={() => handleClick()} className="md:hidden" />
            )}
          />

          {isOpen && (
            <div
              className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen"
              onClick={handleBackdropClick}
            />
          )}
        </div>
      </header>
      {modal && (
        <div className="fixed z-10 block h-screen min-w-full bg-gray-700/50 md:hidden">
          <div className="z-20 rounded-b-lg bg-white p-4">
            <div className="relative">
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
                    'subtitle1 group mb-0.5 flex w-full cursor-pointer items-center rounded-lg py-3 px-3 hover:bg-brand-hover hover:text-brand-main sm:py-3 sm:px-4'
                  )}
                  onClick={() => setLinkSelected(link.name)}
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
                  <NavLink className="subtitle1 group pl-4" href={link.href}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {modal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen"
          onClick={handleBackdropClick}
        />
      )}
    </>
  );
};

export default NavHeader;
