import classNames from 'classnames';
import React, { PropsWithChildren, ReactHTMLElement } from 'react';

import styles from '../styles/Card.module.css';

const BaseCard: React.FC<
  PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>>
> = (props) => {
  let { className, ...otherProps } = props;

  const classes = classNames(className, styles.card);
  return (
    <div className={`${classes} p-4`} {...otherProps}>
      {props.children}
    </div>
  );
};

export default BaseCard;
