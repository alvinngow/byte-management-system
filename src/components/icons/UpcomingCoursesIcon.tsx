import classNames from 'classnames';
import React from 'react';

interface IconProps extends React.PropsWithChildren {
  className?: string;
  width?: string;
  height?: string;
}

const UpcomingCoursesIcon: React.FC<IconProps> = function (props) {
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
        d="M2 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2v11a2 2 0 0 1-2 2h-4.586l2.293 2.293a1 1 0 0 1-1.414 1.414L12 18.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L9.586 18H5a2 2 0 0 1-2-2V5a1 1 0 0 1-1-1Zm3 1v11h14V5H5Zm12.707 2.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0L10 10.414l-2.293 2.293a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0L13 10.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
        clip-rule="evenodd"
      />
    </svg>
  );
};
export default UpcomingCoursesIcon;
