import { useFragment_experimental } from '@apollo/client';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

import * as UserFragment from '../../../../../graphql/frontend/fragments/UserFragment';
import Avatar from '../../../../Avatar';
import Chip from '../../../../Chip';

interface Props {
  userId: string;
  onManagerRemoved: (userId: string) => void;
}

const ManagerChip: React.FC<Props> = function (props) {
  const { userId, onManagerRemoved } = props;

  const { data: user } = useFragment_experimental<UserFragment.Data, undefined>(
    {
      fragment: UserFragment.Fragment,
      from: {
        __typename: 'User',
        id: userId,
      },
    }
  );

  return (
    <div className="flex w-full cursor-pointer items-center rounded-2xl bg-gray-100 py-1.5 px-3 text-gray-500">
      {user != null ? (
        <>
          <Avatar className="mr-2 h-6 w-6 shrink-0 text-xs" user={user} />
          <span className="pl-1 align-top">
            {user.firstName} {user.lastName}
          </span>
          <span className="ml-auto rounded-full p-1 hover:bg-gray-300">
            <XMarkIcon
              onClick={(e) => {
                e.stopPropagation();
                onManagerRemoved(userId);
              }}
              className="h-4 w-4"
            />
          </span>
        </>
      ) : (
        <span>Unknown user</span>
      )}
    </div>
  );
};

export default ManagerChip;
