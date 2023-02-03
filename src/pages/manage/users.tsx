import { useMutation, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UserRole } from '../../../gen/graphql/resolvers';
import * as AccountRoleUpdate from '../../graphql/frontend/mutations/AccountRoleUpdateMutation';
import * as UsersQuery from '../../graphql/frontend/queries/UsersQuery';
import useCurrentUser from '../../hooks/useCurrentUser';
import AppLayout from '../../layouts/AppLayout';

const ALLOWED_ROLES = new Set([
  UserRole.SystemAdministrator,
  UserRole.CommitteeMember,
]);

const UsersPage: NextPage = function (props) {
  const { me, loading: meLoading } = useCurrentUser();

  const { data, loading, fetchMore } = useQuery<
    UsersQuery.Data,
    UsersQuery.Variables
  >(UsersQuery.Query);

  const [accountRoleUpdate] = useMutation<
    AccountRoleUpdate.Data,
    AccountRoleUpdate.Variables
  >(AccountRoleUpdate.Mutation);

  const router = useRouter();

  React.useEffect(() => {
    if (me == null) {
      return;
    }

    if (!ALLOWED_ROLES.has(me.role)) {
      router.push('/404');
    }
  }, [me, router]);

  const handleLoadMoreClick = React.useCallback<React.MouseEventHandler>(() => {
    fetchMore({
      variables: {
        after: data?.users.pageInfo.endCursor,
      },
    });
  }, [data?.users.pageInfo.endCursor, fetchMore]);

  const updateRole = React.useCallback(
    (userId: string, role: UserRole) => {
      accountRoleUpdate({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            userId,
            role,
          },
        },
      });
    },
    [accountRoleUpdate]
  );

  if (meLoading) {
    return null;
  }

  return (
    <AppLayout>
      <h1>Manage Users</h1>

      {loading && <span>Loading</span>}

      <table className="w-full table-fixed text-left text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <th className="px-6 py-3">Email</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Role</th>
          <th className="px-6 py-3">School</th>
          {me?.role === UserRole.SystemAdministrator && (
            <th className="px-6 py-3">Management</th>
          )}
        </thead>
        <tbody>
          {data?.users?.edges?.map((edge) => (
            <tr
              key={edge.node.id}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td className="px-6 py-4">{edge.node.email}</td>
              <td className="px-6 py-4">
                {edge.node.firstName} {edge.node.lastName}
              </td>
              <td className="px-6 py-4">{edge.node.role}</td>
              <td className="px-6 py-4">{edge.node.school?.name ?? 'N/A'}</td>

              {me?.role === UserRole.SystemAdministrator && (
                <td className="px-6 py-4">
                  <button
                    className="bg-cyan-400 hover:bg-cyan-500 rounded-md px-3 py-1 text-white"
                    onClick={() => {
                      updateRole(edge.node.id, UserRole.User);
                    }}
                  >
                    Make user
                  </button>
                  <button
                    className="bg-amber-400 hover:bg-amber-500 rounded-md px-3 py-1 text-white"
                    onClick={() => {
                      updateRole(edge.node.id, UserRole.CommitteeMember);
                    }}
                  >
                    Make committee member
                  </button>
                  <button
                    className="rounded-md bg-orange-400 px-3 py-1 text-white hover:bg-orange-500"
                    onClick={() => {
                      updateRole(edge.node.id, UserRole.SystemAdministrator);
                    }}
                  >
                    Make system administrator
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {data?.users?.pageInfo?.hasNextPage && (
        <button onClick={handleLoadMoreClick}>Load more</button>
      )}
    </AppLayout>
  );
};

export default UsersPage;
