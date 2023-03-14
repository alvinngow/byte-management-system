import classNames from 'classnames';
import React from 'react';

interface Props extends React.PropsWithChildren {
  className?: string;
  isActive: boolean;
  onClick: React.MouseEventHandler;
}

const FormatButton: React.FC<Props> = function (props) {
  const { className, children, isActive, onClick } = props;

  return (
    <div
      className={classNames(
        'flex items-center justify-center overflow-hidden hover:cursor-pointer hover:bg-gray-300',
        {
          'bg-gray-100': isActive,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FormatButton;
