import { useFragment_experimental } from '@apollo/client';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

import * as UserFragment from '../../../../../graphql/frontend/fragments/UserFragment';
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
    <Chip
      scheme="disabled"
      className="w-full cursor-pointer"
      Icon={UserCircleIcon}
      iconSize={5}
      override
    >
      {user != null ? (
        <>
          <span className="pl-1 align-top">
            {user.firstName} {user.lastName}
          </span>
          <span className="float-right pt-[2px] pl-1">
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
    </Chip>
  );
};

export default ManagerChip;
