import { useApolloClient, useFragment_experimental } from '@apollo/client';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';

import { User } from '../../../../../../gen/graphql/resolvers';
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
      className="max-w-fit cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onManagerRemoved(userId);
      }}
    >
      {user != null ? (
        <>
          <span className="mr-2 h-6 w-6 rounded-full bg-gray-400"></span>

          <span>
            {user.firstName} {user.lastName}
          </span>
          <XMarkIcon className="h-4 w-4" />
        </>
      ) : (
        <span>Unknown user</span>
      )}
    </Chip>
  );
};

export default ManagerChip;
