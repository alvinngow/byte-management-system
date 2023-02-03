import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import styles from '../styles/component_styles/Link.module.css';

interface PropType extends React.HTMLAttributes<HTMLAnchorElement> {
  text: string;
  href: string;
  variant?: 'default' | 'underlined' | 'none';
}

const CustomLink: React.FC<PropType> = (props) => {
  const { text, variant = 'default', className, ...otherProps } = props;

  const linkStyles = classNames({
    [styles['link-text']]: true,
    [styles['link-text-default']]: variant != 'none',
    [styles['link-underline-light']]: variant == 'underlined',
  });

  return (
    <Link
      className={`text-brand-main" ${linkStyles} ${className}`}
      {...otherProps}
    >
      {text}
    </Link>
  );
};

export default CustomLink;
