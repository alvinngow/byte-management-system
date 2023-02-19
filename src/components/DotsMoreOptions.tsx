import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, { HTMLAttributes, useState } from 'react';

import BaseCard from './BaseCard';

interface PropType extends HTMLAttributes<HTMLDivElement> {
  options: {
    label: string;
    value: string;
    optionStyle?: string;
  }[];
  onOptionClick: (value: string) => void;
}

const DotsMoreOptions: React.FC<PropType> = (props) => {
  const { options, className, onOptionClick } = props;
  const [menuState, setMenuState] = useState(false);

  const ellipsisClasses = classNames('cursor-pointer', className);

  const clickHandler = (value: string) => {
    onOptionClick(value);
    setMenuState(false);
  };
  return (
    <>
      {menuState && (
        <div
          className="fixed top-0 left-0 h-screen w-screen"
          onClick={() => {
            setMenuState(false);
          }}
        ></div>
      )}
      <div className="relative">
        <EllipsisVerticalIcon
          className={ellipsisClasses}
          onClick={() => setMenuState(!menuState)}
        />
        <BaseCard
          className={`absolute z-[9999] flex flex-col bg-white p-0 ${
            !menuState && 'hidden'
          }`}
        >
          <>
            {options.map((option, i) => {
              return (
                <button
                  key={`${option.label}${i}`}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${option.optionStyle}`}
                  onClick={() => clickHandler(option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </>
        </BaseCard>
      </div>
    </>
  );
};

export default DotsMoreOptions;
