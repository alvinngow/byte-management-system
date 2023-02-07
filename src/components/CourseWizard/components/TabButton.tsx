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
          'text-sky-600 bg-gray-100': active,
          'text-gray-500': !active,
        },
        'hover:text-sky-600 group mb-0.5 flex w-full items-center rounded-lg py-0.5 px-0.5 hover:bg-gray-100 sm:py-3 sm:px-4'
      )}
      onClick={onClick}
    >
      <HeroIcon
        className={classNames(
          {
            'text-sky-600': active,
            'text-gray-500': !active,
          },
          'group-hover:text-sky-600 h-6 w-6'
        )}
      />
      <span
        className={classNames('pl-1 group-hover:text-blue-500', {
          'text-blue-500': active,
        })}
      >
        {children}
      </span>
    </button>
  );
};

export default TabButton;
