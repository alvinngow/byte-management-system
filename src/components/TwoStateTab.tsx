import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {
  ComponentType,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

import NavLink from './NavLink';
interface Prop extends HTMLAttributes<HTMLButtonElement> {
  selectedID: string;
  tabID: string;
  text?: string;
  href?: string;
  Icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Tab: React.FC<PropsWithChildren<Prop>> = (
  prop: PropsWithChildren<Prop>
) => {
  const {
    tabID,
    className,
    text = 'Tab',
    href = '',
    Icon = QuestionMarkCircleIcon,
    onClick,
    selectedID,
  } = prop;

  return (
    <>
      <div className="group flex">
        <NavLink href={href} onClick={onClick}>
          <p
            className={classNames(
              {
                'bg-gray-100 text-brand-main': selectedID === tabID,
                'text-gray-500': selectedID !== tabID,
              },
              'group flex rounded-lg p-2 hover:bg-gray-100 ' + className
            )}
          >
            <Icon
              className={classNames(
                {
                  'fill-brand-main text-brand-main': selectedID === tabID,
                  'text-gray-500': selectedID !== tabID,
                },
                'h-6 w-6 group-hover:fill-brand-main group-hover:text-brand-main'
              )}
            />
            <span
              className={classNames(
                {
                  'text-brand-main': selectedID === tabID,
                  'text-gray-500': selectedID !== tabID,
                },
                'h-6 w-6 group-hover:text-brand-main'
              )}
            >
              {text}
            </span>
          </p>
        </NavLink>
      </div>
    </>
  );
};

export default Tab;
