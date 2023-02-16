import classNames from 'classnames';
import React from 'react';

interface Props {
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  HeroIcon: (
    props: React.ComponentProps<'svg'> & { title?: string; titleId?: string }
  ) => JSX.Element;
}

const TabButton: React.FC<React.PropsWithChildren<Props>> = function (props) {
  const { active, onClick, HeroIcon, children } = props;

  return (
    <button
      className={classNames(
        {
          'bg-gray-100 text-brand-main': active,
          'text-gray-500': !active,
        },
        'group mb-0.5 flex w-full items-center rounded-lg py-0.5 px-0.5 hover:bg-gray-100 hover:text-sky-600 xsm:py-3 xsm:px-4'
      )}
      onClick={onClick}
    >
      <HeroIcon
        className={classNames(
          {
            'text-brand-main': active,
            'text-secondary': !active,
          },
          'h-6 w-6 group-hover:text-brand-main'
        )}
      />
      <span
        className={classNames('subtitle1 pl-2.5 group-hover:text-brand-main', {
          'text-brand-main': active,
        })}
      >
        {children}
      </span>
    </button>
  );
};

export default TabButton;
