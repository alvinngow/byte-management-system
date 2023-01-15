import Link from 'next/link';
import React from 'react';

interface Props extends React.PropsWithChildren {
  className?: string;
  href: string;
  onClick?: React.MouseEventHandler;
}

/**
 * This React component is similar to a HTML <a> tag,
 * but it is intended for client-side redirects.
 */
const NavLink: React.FC<Props> = function (props) {
  const { href, className, children, onClick } = props;

  return (
    <Link href={href} passHref className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default NavLink;
