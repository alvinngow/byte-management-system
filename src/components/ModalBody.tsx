import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import styles from '../styles/component_styles/Modal.module.css';
import ModalHeader from './ModalHeader';

interface PropTypes extends React.HTMLAttributes<HTMLDivElement> {
  modalTitle?: string;
  onClose: () => void;
}

const ModalBody: React.FC<React.PropsWithChildren<PropTypes>> = (props) => {
  const { onClose, modalTitle, className, children } = props;

  const classes = classNames('bg-white', 'p-2', className, [
    styles['modal-body'],
  ]);

  return (
    <div
      className={`${classes} flex flex-col items-center justify-center`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ModalHeader onClose={onClose} modalTitle={modalTitle}></ModalHeader>
      {children}
    </div>
  );
};

export default ModalBody;
