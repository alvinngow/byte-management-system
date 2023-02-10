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
  const { className, text = 'placeholder', href = '/home' } = prop;
  return (
    <>
      <div className="flex">
        <NavLink href={href}>
          <p className={className + ' group flex items-center'}>
            <ArrowLeftIcon
              style={{ color: '#0F172A' }}
              className="mr-1 h-6 w-6 group-hover:-translate-x-px"
            />
            <span>{text}</span>
          </p>
        </NavLink>
      </div>
    </>
  );
};

export default BackButton;
