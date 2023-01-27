import React from 'react';

import NavLink from './NavLink';

interface Links {
  href: string;
  name: string;
}

interface Props extends React.PropsWithChildren {}

const NavLinks: Links[] = [
  { href: '/manage/volunteer', name: 'Volunteer' },
  { href: '/manage/class', name: 'Class' },
  { href: '/manage/commitee', name: 'Commitee Member' },
];

const NavBar: React.FC<Props> = function (props) {
  const { children } = props;
  return (
    <>
      <nav className="sidenav">
        <ul>
          {NavLinks.map((link, i) => (
            <li key={'link' + i}>
              <NavLink href={link.href}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative ml-48">{children}</div>
    </>
  );
};

export default NavBar;
