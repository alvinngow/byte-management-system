import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HTMLAttributes, PropsWithChildren } from 'react';

import NavLink from './NavLink';

interface Prop extends HTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
}

const BackButton: React.FC<PropsWithChildren<Prop>> = (
  prop: PropsWithChildren<Prop>
) => {
  const { className, text = 'placeholder', href = '/discover-courses' } = prop;
  return (
    <>
      <div className="flex">
        <NavLink href={href}>
          <p className={className + ' group items-center md:flex'}>
            <ArrowLeftIcon
              style={{ color: '#0F172A' }}
              className="mr-2.5 h-6 w-6 group-hover:-translate-x-px"
            />
            <span className="xsm:hidden md:block">{text}</span>
          </p>
        </NavLink>
      </div>
    </>
  );
};

export default BackButton;
