import classNames from 'classnames';
import React, { ReactComponentElement, ReactNode, SVGProps } from 'react';

import styles from '../styles/component_styles/IconButton.module.css';

interface PropType extends React.HTMLAttributes<HTMLButtonElement> {
  HeroIcon: (
    props: React.ComponentProps<'svg'> & { title?: string; titleId?: string }
  ) => JSX.Element;
  disabled?: boolean;
}

const IconButton: React.FC<PropType> = (props) => {
  const { HeroIcon, className, disabled } = props;

  return (
    <button
      disabled={disabled}
      className={classNames(`${styles['icon-button']}`, className)}
    >
      <HeroIcon />
    </button>
  );
};

export default IconButton;
