import { useMutation, useQuery } from '@apollo/client';
import {
  ArrowsUpDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UserRole } from '../../gen/graphql/resolvers';
import * as AccountRoleUpdate from '../graphql/frontend/mutations/AccountRoleUpdateMutation';
import * as UsersQuery from '../graphql/frontend/queries/UsersQuery';
import useCurrentUser from '../hooks/useCurrentUser';
import AppLayout from '../layouts/AppLayout';
import BackButton from './BackButton';
import NavLink from './NavLink';

const ALLOWED_ROLES = new Set([
  UserRole.SystemAdministrator,
  UserRole.CommitteeMember,
]);

const ClassPage: React.FC = function () {
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
    // <NavLink href="/manage/courses">
    <>
      <NavLink href="/manage/courses">
        <BackButton text="Sessions" className="mb-5"></BackButton>
      </NavLink>
      <div className="mb-10 flex flex-col rounded border pt-2 shadow-md shadow-gray-400">
        <p className="ml-15 mt-3 px-8">Volunteers</p>
        <div className="ml-4 mr-4 mt-5 mb-5 flex">
          {/* start of the table */}
          <table className="w-full table-fixed border border-gray-100 text-left text-gray-500">
            <thead className="text-sm text-gray-700">
              {/* need to add the up-down arrow icon */}
              <th className="columns-1 px-6 py-3">
                Name{' '}
                <button>
                  <span className="inline-flex">
                    <ArrowsUpDownIcon className="ml-1 h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              <th className="columns-1 px-6 py-3">
                Email{' '}
                <button>
                  <span className="inline-flex">
                    <ArrowsUpDownIcon className="ml-1 h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              <th className="columns-1 px-6 py-3">
                Mobile Number{' '}
                <button>
                  <span className="inline-flex">
                    <ArrowsUpDownIcon className="ml-1 h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              <th className="columns-1 px-6 py-3">Mark Attendance</th>
              {me?.role === UserRole.SystemAdministrator && (
                <th className="px-6 py-3">Management</th>
              )}
            </thead>
            <tbody>
              {data?.users?.edges?.map((edge) => (
                <tr key={edge.node.id} className="border-b bg-white">
                  <td className="px-6 py-4 text-black">
                    {edge.node.firstName} {edge.node.lastName}
                  </td>
                  <td className="px-6 py-4 text-black">{edge.node.email}</td>
                  <td className="px-6 py-4 text-black">{edge.node.mobileNo}</td>
                  <td className="px-6 py-4 text-black">
                    {/* add the attendance here */}
                    <button className="text-grey-100 ml-5 mr-5 inline-flex items-center rounded-full bg-slate-100 p-1 text-center text-sm font-medium focus:bg-lime-100 focus:text-lime-500">
                      <CheckIcon className="h-6 w-6"></CheckIcon>
                    </button>
                    <button className="text-grey-100 inline-flex items-center rounded-full bg-slate-100 p-1 text-center text-sm font-medium focus:bg-red-100 focus:text-red-500">
                      <XMarkIcon className="h-6 w-6"></XMarkIcon>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data?.users?.pageInfo?.hasNextPage && (
            <button onClick={handleLoadMoreClick}>Load more</button>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassPage;
