import classNames from 'classnames';
import React from 'react';
import { ReactPropTypes } from 'react';

import styles from '../styles/component_styles/Button.module.css';

interface PropType extends React.HTMLAttributes<HTMLButtonElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  label?: String;
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
    ...otherProps
  } = props;
  const classes = classNames({
    [styles.btn]: true,
    [styles[variant]]: true,
    [styles[`btn-${size}`]]: true,
  });
  return (
    <button
      disabled={disabled as boolean}
      type={type}
      style={style}
      className={`${classes} ${className}`}
      {...otherProps}
    >
      {children}
      {label}
    </button>
  );
};

export default Button;
