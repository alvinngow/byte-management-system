import { UserRole } from '@bims/graphql/schema';
import {
  AcademicCapIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ComponentType, useMemo, useState } from 'react';

import useCurrentUser from '../hooks/useCurrentUser';
import ByteLogo from './icons/ByteLogo';
import NavLink from './NavLink';
import Tab from './Tab';

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

const NavBar: React.FC<Props> = function (props) {
  const { children } = props;
  const { me, loading: meLoading } = useCurrentUser();
  const router = useRouter();

  const routeName = useMemo(() => {
    for (const Link of NavLinks) {
      if (Link.href === router.route) {
        return Link.label;
      }
    }
  }, [router]);

  const [linkSelected, setLinkSelected] = useState(routeName!);

  if (meLoading) {
    return <>{children}</>;
  }

  return (
    <>
      {me?.role !== UserRole.User && (
        <div>
          <nav className="sidenav border border-r-gray-300 px-3 md:flex md:items-start">
            <NavLink className="mt-2 mb-10" href="/discover-courses">
              <ByteLogo className="pr-5" width="84px sm:45px" />
            </NavLink>

            <ul className="w-full">
              {NavLinks.map((link, i) => (
                <li key={'link' + i}>
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
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <div
        className={classNames('', {
          'md:ml-64': me?.role !== UserRole.User,
        })}
      >
        {children}
      </div>
    </>
  );
};

export default NavBar;
