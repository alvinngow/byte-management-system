import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import styles from '../styles/component_styles/Button.module.css';

interface PropType extends React.HTMLAttributes<HTMLButtonElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?:
    | 'secondary'
    | 'primary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'error'
    | 'disabled';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  label?: string;
  isApplyBtn?: boolean;
  /**
   * Optional client-side page link.
   */
  href?: string;
}

const Button: React.FC<React.PropsWithChildren<PropType>> = (props) => {
  const {
    size = 'md',
    variant = 'primary',
    type = 'button',
    disabled = false,
    label,
    style,
    className,
    children,
    onClick,
    href,
    isApplyBtn,
    ...otherProps
  } = props;

  const router = useRouter();

  /**
   * If href is provided, automatically route to that page
   */
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (!e.isDefaultPrevented() && href != null) {
      if (href.startsWith('/')) {
        router.push(href);
      } else if (typeof window !== 'undefined') {
        window.location.href = href;
      }
    }
  };

  const classes = classNames({
    [styles.btn]: true,
    [styles[variant]]: true,
    [styles[`btn-${size}`]]: true,
    [styles[`btn-apply`]]: isApplyBtn,
  });
  return (
    <button
      disabled={disabled as boolean}
      type={type}
      style={style}
      className={`${classes} ${className}`}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
      {label}
    </button>
  );
};

export default Button;
