import { useApolloClient } from '@apollo/client';
import { TrashIcon } from '@heroicons/react/24/solid';
import React from 'react';

import { User } from '../../../../../../gen/graphql/resolvers';
import * as UserFragment from '../../../../../graphql/frontend/fragments/UserFragment';

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
    <div className="flex">
      {user != null ? (
        <>
          <span>
            {user.firstName} {user.lastName}
          </span>
          <TrashIcon
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onManagerRemoved(userId);
            }}
          />
        </>
      ) : (
        <span>Unknown user</span>
      )}
    </div>
  );
};

export default ManagerChip;
