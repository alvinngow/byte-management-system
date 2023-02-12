import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';

type PropType = {
  modalTitle?: ReactNode;
  onClose: () => void;
};

const ModalHeader: React.FC<PropType> = (props) => {
  const { modalTitle, onClose } = props;

  return (
    <div className="relative w-full">
      <div>{modalTitle}</div>
      <XMarkIcon
        className="absolute right-4 top-4 cursor-pointer"
        style={{ height: '30px', width: '30px' }}
        onClick={onClose}
      ></XMarkIcon>
    </div>
  );
};

export default ModalHeader;
