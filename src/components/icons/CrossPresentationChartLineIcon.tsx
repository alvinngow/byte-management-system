import classNames from 'classnames';
import React from 'react';

interface IconProps extends React.PropsWithChildren {
  className?: string;
  width?: string;
  height?: string;
}

const CrossPresentationChartLineIcon: React.FC<IconProps> = function (props) {
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
      <g fill="#6B7280">
        <path
          fill-rule="evenodd"
          d="M2 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2v11a2 2 0 0 1-2 2h-4.586l2.293 2.293a1 1 0 0 1-1.414 1.414L12 18.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L9.586 18H5a2 2 0 0 1-2-2V5a1 1 0 0 1-1-1Zm3 1v11h14V5H5Z"
          clip-rule="evenodd"
        />
        <path d="M8.976 7a1.167 1.167 0 0 1 1.65 0l1.509 1.508L13.643 7a1.167 1.167 0 1 1 1.65 1.65l-1.508 1.508 1.508 1.509a1.167 1.167 0 0 1-1.65 1.65l-1.508-1.509-1.509 1.509a1.167 1.167 0 0 1-1.65-1.65l1.509-1.509L8.976 8.65a1.167 1.167 0 0 1 0-1.65Z" />
      </g>
    </svg>
  );
};

export default CrossPresentationChartLineIcon;
