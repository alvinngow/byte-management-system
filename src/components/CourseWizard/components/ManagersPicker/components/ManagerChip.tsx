import { useApolloClient } from '@apollo/client';
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

  const apolloClient = useApolloClient();

  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const data = apolloClient.readFragment<UserFragment.Data>({
      fragment: UserFragment.Fragment,
      id: `User:${userId}`,
    });

    setUser(data ?? null);
  }, [apolloClient, userId]);

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
