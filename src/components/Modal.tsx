import React, { useState } from 'react';

import styles from '../styles/component_styles/Modal.module.css';
import ModalBody from './ModalBody';

interface PropType extends React.HTMLAttributes<HTMLDivElement> {
  modalTitle?: string;
  onClose: () => void;
  minWidth?: number;
  minHeight?: number;
}

const Modal: React.FC<React.PropsWithChildren<PropType>> = (props) => {
  let { className, onClose, children, modalTitle, minHeight, minWidth } = props;

  if (minHeight) {
    className += ` min-h-[${minHeight}px] `;
  }
  if (minWidth) {
    className += `  min-w-[${minWidth}px]`;
  }

  return (
    <>
      <div className={`${styles['modal-overlay']}`} onClick={onClose}>
        <ModalBody
          onClose={onClose}
          className={className}
          modalTitle={modalTitle}
        >
          {children}
        </ModalBody>
      </div>
    </>
  );
};

export default Modal;
