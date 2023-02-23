import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';

import IconButton from './IconButton';

type PropType = {
  modalTitle?: string;
  onClose: () => void;
};

const ModalHeader: React.FC<PropType> = (props) => {
  const { modalTitle, onClose } = props;

  return (
    <div className="relative flex w-full items-center justify-center pt-8">
      <div className="absolute right-0 top-0">
        <IconButton
          HeroIcon={() => (
            <XMarkIcon
              style={{ height: '24px', width: '24px' }}
              onClick={onClose}
            />
          )}
        />
      </div>
      <h4>{modalTitle}</h4>
    </div>
  );
};

export default ModalHeader;
