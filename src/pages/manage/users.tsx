import { useMutation, useQuery } from '@apollo/client';
import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UserRole } from '../../../gen/graphql/resolvers';
import NavHeader from '../../components/NavHeader';
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
      <NavHeader></NavHeader>
      {/* start of body DIV*/}
      <div>
        <h1 className="mb-6 mt-4 flex p-4 px-12 text-3xl">Users</h1>
      </div>
      {/* start of table */}
      <div className="border-grey-400 ml-12 mr-12 mb-12 border-2 pl-5 pr-5">
        {/* search bar */}
        <div className="mb-2 grid grid-cols-2 gap-4 pl-5 pr-5 pt-6 pb-6">
          <div>
            <p className="mb-1 text-xs text-gray-500">Search</p>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="inline-flex w-full items-center whitespace-pre border-b-2 border-solid border-b-neutral-400 py-2.5 text-center text-sm text-gray-500"
              type="button"
            >
              Name, Email, School...{' '}
            </button>
          </div>
          <div>
            <p className="text-xs text-gray-500">User Type</p>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="inline-flex w-full items-center border-b-2 border-solid border-b-neutral-400 py-2.5 text-center text-sm text-gray-500"
              type="button"
            >
              All
              <ChevronDownIcon className="ml-auto h-6 w-6"></ChevronDownIcon>
            </button>
          </div>
        </div>
        {/* start of the user's details table */}
        <div className="snap-x overflow-x-auto scroll-smooth">
          {loading && <span>Loading</span>}

          <table className="w-full text-left text-gray-500">
            <thead className="text-sm text-gray-700">
              {/* need to add the up-down arrow icon */}
              <th className="columns-1 px-6 py-3">
                User Name{' '}
                <button className="">
                  <span className="inline-flex content-center text-center">
                    <ArrowsUpDownIcon className="h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              <th className="columns-1 px-6 py-3">
                Contact Number{' '}
                <button>
                  <span className="inline-flex">
                    <ArrowsUpDownIcon className="h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              <th className="columns-1 px-6 py-3">
                School/ Work{' '}
                <button>
                  <span className="inline-flex">
                    <ArrowsUpDownIcon className="h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              <th className="columns-1 px-6 py-3">
                User Type{' '}
                <button>
                  <span className="inline-flex">
                    <ArrowsUpDownIcon className="h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              <th className="columns-1 px-6 py-3">
                Account Status{' '}
                <button>
                  <span className="inline-flex">
                    <ArrowsUpDownIcon className="h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              {me?.role === UserRole.SystemAdministrator && (
                <th className="px-6 py-3">Management</th>
              )}
            </thead>
            <tbody>
              {data?.users?.edges?.map((edge) => (
                <tr key={edge.node.id} className="border-b bg-white">
                  <td className="grid grid-cols-2 gap-2 px-6 py-4 text-black">
                    {/* avatar is not appearing */}
                    <div className="col-span-1 ml-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU1wZeXDnAu6XK5bB6UsG69B-b2P_gnQfsfw&usqp=CAU"
                        alt="Rounded avatar"
                      ></img>
                      {edge.node.avatar}
                    </div>
                    <div className="col-span-1 mr-auto">
                      {edge.node.firstName} {edge.node.lastName}
                      <br />
                      <span className="text-gray-500">{edge.node.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-black">{edge.node.mobileNo}</td>
                  <td className="px-6 py-4 text-black">
                    {edge.node.school?.name ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-black">{edge.node.role}</td>
                  <td className="px-6 py-4 text-red-500">
                    NOT IMPLEMENTED IN GRAPHQL
                  </td>
                  <td className="px-6 py-4 text-black">
                    <button
                      type="button"
                      // id="ellipsisDropdown"
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown"
                    >
                      <EllipsisVerticalIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      ></EllipsisVerticalIcon>
                    </button>
                    {/* dropdown code starts here */}
                    <div
                      id="dropdown"
                      className=" w-44 divide-y divide-gray-100 rounded-lg text-gray-700 shadow "
                    >
                      <ul
                        className="py-2 text-sm text-gray-700"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        <li>
                          <button className=" px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                            Make as Comm Member
                          </button>
                        </li>
                        <li>
                          <button className=" px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                            Make as System Admin
                          </button>
                        </li>
                        <li>
                          <button className=" px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                            Make as Volunteer
                          </button>
                        </li>
                        <li>
                          <button className=" px-4 py-2 text-left text-red-500 hover:bg-gray-100">
                            Delete User
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                  {me?.role === UserRole.SystemAdministrator && (
                    <>
                      <td className="px-6 py-4">
                        <button
                          className="rounded-md bg-cyan-400 px-3 py-1 text-white hover:bg-cyan-500"
                          onClick={() => {
                            updateRole(edge.node.id, UserRole.User);
                          }}
                        >
                          Make user
                        </button>
                        <button
                          className="rounded-md bg-amber-400 px-3 py-1 text-white hover:bg-amber-500"
                          onClick={() => {
                            updateRole(edge.node.id, UserRole.CommitteeMember);
                          }}
                        >
                          Make committee member
                        </button>
                        <button
                          className="rounded-md bg-orange-400 px-3 py-1 text-white hover:bg-orange-500"
                          onClick={() => {
                            updateRole(
                              edge.node.id,
                              UserRole.SystemAdministrator
                            );
                          }}
                        >
                          Make system administrator
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {data?.users?.pageInfo?.hasNextPage && (
            <button onClick={handleLoadMoreClick}>Load more</button>
          )}
        </div>
      </div>
      {/* end of body DIV */}
      {/* start of page numbering */}
      <div></div>
    </AppLayout>
  );
};

export default UsersPage;
