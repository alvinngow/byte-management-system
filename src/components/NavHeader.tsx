import Image from 'next/image';
import React from 'react';

const NavHeader: React.FC = function () {
  return (
    <header className="flex justify-between items-center px-6 py-2 border-solid border border-gray-300">
      <div className="flex">
        <div className="py-2 px-4">
          <h1>TAB</h1>
        </div>
        <div className="py-2 px-4">
          <h1>TAB</h1>
        </div>
        <div className="py-2 px-4">
          <h1>TAB</h1>
        </div>
        <div className="py-2 px-4">
          <h1>TAB</h1>
        </div>
        <div className="py-2 px-4">
          <h1>TAB</h1>
        </div>
        <div className="py-2 px-4">
          <h1>TAB</h1>
        </div>
      </div>
      <div className="flex">
        <div className="p-3">
          <Image
            src="/star.png"
            alt="icon placeholder"
            width={20}
            height={19}
          />
        </div>
        <div className="p-3">
          <Image
            src="/star.png"
            alt="icon placeholder"
            width={20}
            height={19}
          />
        </div>
        <div className="p-3">
          <Image
            src="/star.png"
            alt="icon placeholder"
            width={20}
            height={19}
          />
        </div>
        <div className="p-3">
          <Image
            src="/star.png"
            alt="icon placeholder"
            width={20}
            height={19}
          />
        </div>
        <div className="p-3">
          <Image
            src="/star.png"
            alt="icon placeholder"
            width={20}
            height={19}
          />
        </div>
        <span className="rounded-full w-10 h-10 bg-neutral-300 flex justify-center items-center">
          <Image
            className="h-6"
            src="/profile.png"
            alt="profile placeholder"
            width={24}
            height={24}
          />
        </span>
      </div>
    </header>
  );
};

export default NavHeader;
