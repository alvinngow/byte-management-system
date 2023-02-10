import classNames from 'classnames';
import React from 'react';

interface LogoProps {
  width?: string;
  height?: string;
  className?: string;
  alt?: string;
}

const FacebookLogo: React.FC<LogoProps> = function (props) {
  const { width = '20px', height = '20px', className, ...otherProps } = props;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...otherProps}
    >
      <path
        d="M14.7579 1.5H12.0579C10.8644 1.5 9.71984 1.97411 8.87593 2.81802C8.03202 3.66193 7.55791 4.80653 7.55791 6V8.7H4.85791V12.3H7.55791V19.5H11.1579V12.3H13.8579L14.7579 8.7H11.1579V6C11.1579 5.76131 11.2527 5.53239 11.4215 5.3636C11.5903 5.19482 11.8192 5.1 12.0579 5.1H14.7579V1.5Z"
        stroke="white"
        stroke-width="1.35"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default FacebookLogo;
