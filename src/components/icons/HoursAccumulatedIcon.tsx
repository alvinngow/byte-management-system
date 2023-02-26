import classNames from 'classnames';
import React from 'react';

interface IconProps extends React.PropsWithChildren {
  className?: string;
  width?: string;
  height?: string;
}

const HoursAccumulatedIcon: React.FC<IconProps> = function (props) {
  const {
    children,
    className,
    width = '24px',
    height = '24px',
    ...otherProps
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('mr-2 inline-flex', className)}
      {...otherProps}
    >
      <path
        fill="#6B7280"
        fill-rule="evenodd"
        d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-7.071.929A10 10 0 1 1 19.07 19.07 10 10 0 0 1 4.93 4.93ZM12 7a1 1 0 0 1 1 1v3.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1Z"
        clip-rule="evenodd"
      />
    </svg>
  );
};
export default HoursAccumulatedIcon;
