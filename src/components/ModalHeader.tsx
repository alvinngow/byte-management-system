import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';

type PropType = {
  modalTitle?: string;
  onClose: () => void;
};

const ModalHeader: React.FC<PropType> = (props) => {
  const { modalTitle, onClose } = props;

  return (
    <div className="relative flex w-full items-center">
      <h2>{modalTitle}</h2>
      <XMarkIcon
        className=" ml-auto mr-0 cursor-pointer"
        style={{ height: '30px', width: '30px' }}
        onClick={onClose}
      ></XMarkIcon>
    </div>
  );
};

export default ModalHeader;
