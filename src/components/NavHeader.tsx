import { BellIcon, CogIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';

const NavHeader: React.FC = function () {
  return (
    <header className="flex items-center justify-end border border-solid border-gray-300 py-2 pr-6">
      <div className="flex">
        <div className="py-3 pr-3">
          <CogIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
        </div>
        <div className="py-3 pr-3">
          <BellIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-300">
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
