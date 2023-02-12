import React, { useState } from 'react';

import styles from '../styles/component_styles/Modal.module.css';
import ModalBody from './ModalBody';

interface PropType extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

const Modal: React.FC<React.PropsWithChildren<PropType>> = (props) => {
  const { className, onClose, children } = props;

  return (
    <>
      <div className={`${styles['modal-overlay']}`} onClick={onClose}>
        <ModalBody onClose={onClose} className={className}>
          {children}
        </ModalBody>
      </div>
    </>
  );
};

export default Modal;
