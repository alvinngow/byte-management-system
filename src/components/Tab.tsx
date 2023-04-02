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
  onClick?: MouseEventHandler<HTMLButtonElement>;
  underline?: boolean;
  nofill?: boolean;
  textClass?: string;
}

const Tab: React.FC<PropsWithChildren<Prop>> = (
  prop: PropsWithChildren<Prop>
) => {
  const {
    underline,
    tabID,
    className,
    text = 'TAB',
    href = '',
    Icon,
    onClick,
    selectedID,
    nofill,
    textClass,
  } = prop;

  return (
    <>
      <div className={'flex' + className}>
        <NavLink
          href={href}
          onClick={onClick}
          className="group w-full font-semibold hover:cursor-pointer"
        >
          <p
            className={classNames(
              {
                'rounded-lg bg-gray-100': selectedID === tabID && !underline,
                'border-b-2 border-brand-main':
                  selectedID === tabID && underline,
                'text-gray-500': selectedID !== tabID,
              },
              'group flex p-2 pr-3'
            )}
          >
            {Icon && (
              <Icon
                className={classNames(
                  {
                    'text-brand-main': selectedID === tabID && nofill,
                    'fill-brand-main text-brand-main':
                      selectedID === tabID && !nofill,
                    'text-gray-500': selectedID !== tabID,
                    'group-hover:fill-brand-main': !nofill,
                  },
                  'h-6 w-6 align-middle group-hover:text-brand-main'
                )}
              />
            )}
            <span
              className={classNames(
                {
                  'text-brand-main': selectedID === tabID,
                  'text-gray-500': selectedID !== tabID,
                },
                'h-6 w-max group-hover:text-brand-main ' + textClass
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
