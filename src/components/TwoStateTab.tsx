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
  hasIcon?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  underline?: boolean;
}

const Tab: React.FC<PropsWithChildren<Prop>> = (
  prop: PropsWithChildren<Prop>
) => {
  const {
    underline = false,
    tabID,
    className,
    text = 'TAB',
    href = '',
    Icon = QuestionMarkCircleIcon,
    onClick,
    hasIcon = true,
    selectedID,
  } = prop;

  return (
    <>
      <NavLink href={href} onClick={onClick} className="group font-semibold">
        <p
          className={classNames(
            {
              'rounded-lg bg-brand-hover hover:bg-brand-hover':
                selectedID === tabID && !underline,
              'border-b-2 border-brand-main pb-3':
                selectedID === tabID && underline,
              'rounded-lg text-gray-500': selectedID !== tabID,
            },
            'group flex p-2 pr-3' + className
          )}
        >
          {hasIcon && (
            <Icon
              className={classNames(
                {
                  'text-brand-main': selectedID === tabID,
                  'text-gray-500': selectedID !== tabID,
                },
                'mr-2.5 h-6 w-6 group-hover:text-brand-main'
              )}
            />
          )}
          <span
            className={classNames(
              {
                'text-brand-main': selectedID === tabID,
                'text-gray-500': selectedID !== tabID,
              },
              'h-6 w-max group-hover:text-brand-main'
            )}
          >
            {text}
          </span>
        </p>
      </NavLink>
    </>
  );
};

export default Tab;
