import classNames from 'classnames';
import React from 'react';

interface IconProps extends React.PropsWithChildren {
  className?: string;
  width?: string;
  height?: string;
}

const CrossPresentationChartLine: React.FC<IconProps> = function (props) {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4C22 4.55228 21.5523 5 21 5V16C21 16.5304 20.7893 17.0391 20.4142 17.4142C20.0391 17.7893 19.5304 18 19 18H14.4142L16.7071 20.2929C17.0976 20.6834 17.0976 21.3166 16.7071 21.7071C16.3166 22.0976 15.6834 22.0976 15.2929 21.7071L12 18.4142L8.70711 21.7071C8.31658 22.0976 7.68342 22.0976 7.29289 21.7071C6.90237 21.3166 6.90237 20.6834 7.29289 20.2929L9.58579 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V5C2.44772 5 2 4.55228 2 4ZM5 5V16H11.9993H12.0007H19V5H5Z"
        fill="#6B7280"
      />
      <path
        d="M8.97631 7C9.43192 6.54439 10.1706 6.54439 10.6262 7L12.1346 8.50838L13.643 7C14.0986 6.54439 14.8373 6.54439 15.2929 7C15.7485 7.45561 15.7485 8.1943 15.2929 8.64992L13.7845 10.1583L15.2929 11.6667C15.7485 12.1223 15.7485 12.861 15.2929 13.3166C14.8373 13.7722 14.0986 13.7722 13.643 13.3166L12.1346 11.8082L10.6262 13.3166C10.1706 13.7722 9.43192 13.7722 8.97631 13.3166C8.5207 12.861 8.5207 12.1223 8.97631 11.6667L10.4847 10.1583L8.97631 8.64992C8.5207 8.1943 8.5207 7.45561 8.97631 7Z"
        fill="#6B7280"
      />
    </svg>
  );
};

export default CrossPresentationChartLine;
