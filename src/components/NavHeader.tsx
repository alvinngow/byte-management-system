import { useQuery } from '@apollo/client';
import {
  AcademicCapIcon,
  Bars3Icon,
  BellIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CogIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ComponentType, useMemo, useState } from 'react';

import { UserRole } from '../../gen/graphql/operations';
import * as Me from '../graphql/frontend/queries/MeQuery';
import IconButton from './IconButton';
import ByteLogo from './icons/ByteLogo';
import NavLink from './NavLink';
import ProfileMenu from './Profile/ProfileMenu';
import Tab from './Tab';

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
  label: string;
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
}
const NavLinks: Links[] = [
  {
    href: '/discover-courses',
    label: 'Discover Courses',
    icon: GlobeAltIcon,
  },
  {
    href: '/my-sessions',
    label: 'My Sessions',
    icon: CalendarDaysIcon,
  },
  { href: '/manage/users', label: 'Manage Users', icon: UserGroupIcon },
  {
    href: '/manage/course',
    label: 'Manage Courses',
    icon: AcademicCapIcon,
  },
];
interface Props extends React.PropsWithChildren {}

const NavHeader: React.FC<Props> = function (props) {
  const { data: meData } = useQuery<Me.Data>(Me.Query);
  const router = useRouter();

  const routeName = useMemo(() => {
    for (const Link of NavLinks) {
      if (Link.href === router.route) {
        return Link.label;
      }
    }
  }, [router]);

  const [linkSelected, setLinkSelected] = useState(routeName!);

  const RoleBasedNav = useMemo(() => {
    if (meData?.me?.role !== UserRole.User) {
      return NavLinks;
    } else {
      return NavLinks.slice(0, 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meData]);

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
      <header
        className={classNames(
          'absolute sticky top-0 z-20 flex border border-white border-b-gray-300 bg-white py-4 xsm:items-end xsm:px-3 md:px-6',
          {
            'justify-between': meData?.me?.role === UserRole.User,
            'justify-between md:justify-end':
              meData?.me?.role !== UserRole.User,
          }
        )}
      >
        <div className="flex">
          <NavLink
            className={classNames('items-start ', {
              'md:hidden': meData?.me?.role !== UserRole.User,
            })}
            href="/discover-courses"
          >
            <ByteLogo className="mb-1 pr-5" width="84px sm:45px" />
          </NavLink>
          {meData?.me?.role === UserRole.User && (
            <div className={'ml-6 xsm:hidden md:flex'}>
              {RoleBasedNav.map((link, i) => (
                <Tab
                  key={'tab' + i}
                  selectedID={linkSelected}
                  tabID={link.label}
                  text={link.label}
                  href={link.href}
                ></Tab>
              ))}
            </div>
          )}
        </div>
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
            className={classNames('', {
              'md:hidden': meData?.me?.role !== UserRole.User,
            })}
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
            <ul className="w-full">
              {RoleBasedNav.map((link, i) => (
                <li
                  key={'link' + i}
                  className={classNames(
                    {
                      'bg-brand-hover text-brand-main':
                        linkSelected === link.label,
                      'text-secondary': linkSelected !== link.label,
                    },
                    'subtitle1 group mb-0.5 flex w-full cursor-pointer items-center rounded-lg p-3 hover:bg-brand-hover hover:text-brand-main sm:py-3 sm:px-4'
                  )}
                  onClick={() => setLinkSelected(link.label)}
                >
                  <NavLink href={link.href} className="w-full">
                    <Tab
                      selectedID={linkSelected}
                      tabID={link.label}
                      text={link.label}
                      href={link.href}
                      onClick={() => setLinkSelected(link.label)}
                      Icon={link.icon}
                      className="w-full"
                      nofill
                      textClass="pl-5 font-bold uppercase"
                    ></Tab>
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
