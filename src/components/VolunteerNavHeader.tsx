import { useQuery } from '@apollo/client';
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import ByteLogo from '../components/icons/ByteLogo';
import * as MeQuery from '../graphql/frontend/queries/MeQuery';
import styles from '../styles/component_styles/Button.module.css';
import IconButton from './IconButton';
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

const NavHeader: React.FC = function () {
  const [activeNavHeaderButton, setActiveNavHeaderButton] = React.useState<
    'home' | 'my-sessions'
  >('home');
  const { data } = useQuery<MeQuery.Data>(MeQuery.Query);
  const firstName = data?.me?.firstName;
  const lastName = data?.me?.lastName;
  const avatarUrl = data?.me?.avatar;

  const [isOpen, setIsOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const randomBgClass = React.useMemo(() => {
    return BACKGROUND_COLORS[
      Math.floor(Math.random() * BACKGROUND_COLORS.length)
    ];
  }, []);

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
      <header className="border border-white border-b-gray-300 py-4">
        <div className="flex justify-between xsm:mx-auto xsm:w-[80vw] md:items-center">
          <div className="py-auto flex gap-4">
            <NavLink href="/">
              <ByteLogo className="pr-5" width="84px sm:45px" />
            </NavLink>
            <div className="gap-0.5 xsm:hidden md:flex">
              <button
                onClick={() => setActiveNavHeaderButton('home')}
                className={classNames(
                  activeNavHeaderButton === 'home'
                    ? 'bg-brand-hover text-brand-main'
                    : 'text-secondary',
                  'w-max items-center rounded-lg text-gray-600 hover:bg-brand-hover'
                )}
              >
                <NavLink href="/home">
                  <p className={`${styles['btn-md']}`}>DISCOVER COURSES</p>
                </NavLink>
              </button>
              <button
                onClick={() => setActiveNavHeaderButton('my-sessions')}
                className={classNames(
                  activeNavHeaderButton === 'my-sessions'
                    ? 'bg-brand-hover text-brand-main'
                    : 'text-secondary',
                  'w-max items-center rounded-lg text-gray-600 hover:bg-brand-hover'
                )}
              >
                <NavLink href="/my-sessions">
                  <p className={`${styles['btn-md']}`}>MY SESSIONS</p>
                </NavLink>
              </button>
            </div>
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
                  data={data}
                  focused={false}
                />
              )}
            </button>
            <IconButton
              className="md:hidden"
              HeroIcon={(props) => (
                <Bars3Icon
                  onClick={() => handleClick()}
                  className="md:hidden"
                />
              )}
            />
          </div>
        </div>
      </header>
      {modal && (
        <div
          className="fixed absolute z-10 block h-screen min-w-full bg-gray-700/50 md:hidden"
          onClick={handleBackdropClick}
        >
          <div className="rounded-b-lg bg-white p-4">
            <div className="flex gap-0.5 xsm:w-full xsm:flex-col md:flex-row">
              <button
                onClick={() => setActiveNavHeaderButton('home')}
                className={classNames(
                  activeNavHeaderButton === 'home'
                    ? 'bg-brand-hover text-brand-main'
                    : 'text-secondary',
                  'items-center rounded-lg text-gray-600 hover:bg-brand-hover xsm:w-full xsm:py-2 xsm:text-left md:w-max md:py-0 md:text-center'
                )}
              >
                <NavLink className="w-full" href="/home">
                  <p className={`${styles['btn-md']}`}>DISCOVER COURSES</p>
                </NavLink>
              </button>
              <button
                onClick={() => setActiveNavHeaderButton('my-sessions')}
                className={classNames(
                  activeNavHeaderButton === 'my-sessions'
                    ? 'bg-brand-hover text-brand-main'
                    : 'text-secondary',
                  'items-center rounded-lg text-gray-600 hover:bg-brand-hover xsm:w-full xsm:text-left md:w-max md:text-center'
                )}
              >
                <NavLink href="/courses">
                  <p className={`${styles['btn-md']}`}>MY COURSES</p>
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen"
          onClick={handleBackdropClick}
        />
      )}
    </>
  );
};

export default NavHeader;
