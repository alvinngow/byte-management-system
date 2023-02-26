import { useMutation, useQuery } from '@apollo/client';
import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  ChevronDoubleDownIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UserFiltering, UserRole } from '../../../gen/graphql/resolvers';
import DotsMoreOptions from '../../components/DotsMoreOptions';
import Input from '../../components/Input';
import NavBar from '../../components/NavBar';
import NavHeader from '../../components/NavHeader';
import Select from '../../components/Select';
import * as AccountRoleUpdate from '../../graphql/frontend/mutations/AccountRoleUpdateMutation';
import * as AccountTerminate from '../../graphql/frontend/mutations/AccountTerminateMutation';
import * as UsersQuery from '../../graphql/frontend/queries/UsersQuery';
import useCurrentUser from '../../hooks/useCurrentUser';
import useDebounce from '../../hooks/useDebounce';
import AppLayout from '../../layouts/AppLayout';

const ALLOWED_ROLES = new Set([
  UserRole.SystemAdministrator,
  UserRole.CommitteeMember,
]);

const userTypeMap = {
  [UserRole.User]: 'User',
  [UserRole.SystemAdministrator]: 'System Administrator',
  [UserRole.CommitteeMember]: 'Committee Member',
};

const UsersPage: NextPage = function (props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [volunteerFilter, setVolunteerFilter] = useState<UserRole | string>('');

  const debouncedSearchTerm = useDebounce(searchTerm);
  const { me, loading: meLoading } = useCurrentUser();

  const variables = React.useMemo<UsersQuery.Variables>(() => {
    const filter: UserFiltering = { searchTerm: debouncedSearchTerm };
    if (volunteerFilter) {
      filter.role = [volunteerFilter as UserRole];
    }
    return {
      filter,
    };
  }, [debouncedSearchTerm, volunteerFilter]);

  const { data, loading, refetch, fetchMore } = useQuery<
    UsersQuery.Data,
    UsersQuery.Variables
  >(UsersQuery.Query, { variables });

  const [accountRoleUpdate] = useMutation<
    AccountRoleUpdate.Data,
    AccountRoleUpdate.Variables
  >(AccountRoleUpdate.Mutation);

  const [accountTerminate] = useMutation<
    AccountTerminate.Data,
    AccountTerminate.Variables
  >(AccountTerminate.Mutation);

  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, volunteerFilter, refetch]);

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

  const terminateAccount = React.useCallback(
    (userId: string) => {
      accountTerminate({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            userId,
          },
        },
        update: (cache, mutationResult) => {
          const normalizedId = cache.identify({
            id: userId,
            __typename: 'User',
          });
          cache.evict({ id: normalizedId });
          cache.gc();
        },
      });
    },

    [accountTerminate]
  );

  if (meLoading) {
    return null;
  }

  return (
    <AppLayout>
      <NavHeader></NavHeader>
      {/* start of body DIV*/}
      <NavBar>
        <div>
          <div>

            <h4 className="mt-8 flex xsm:mx-5 xsm:mb-8 md:mx-12 md:mb-12">
              Users
            </h4>
          </div>
          {/* start of table */}
          <div className="mx-5 mb-12 rounded-lg px-5 pb-12 shadow-lg xsm:mx-5 xsm:mb-8 md:mx-12 md:mb-12">
            {/* search bar */}
            <div className="mb-2 flex flex-col gap-4 pl-5 pr-5 pt-6 pb-6 md:flex-row lg:flex-row">
              <div className="sm:w-full md:w-3/4 lg:w-3/4">
                <Input
                  label="Search"
                  placeholder={'Name, Email, School... '}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
              <div className="relative">
                <Select
                  items={[
                    { label: 'All', value: '' },
                    { label: 'Volunteer', value: UserRole.User },
                    {
                      label: 'Committee Member',
                      value: UserRole.CommitteeMember,
                    },
                    { label: 'Admin', value: UserRole.SystemAdministrator },
                  ]}
                  label={'User Type'}
                  value={volunteerFilter}
                  className="relative mb-3 w-full"
                  onChange={function (value: string): void {
                    setVolunteerFilter(value);
                  }}
                />
              </div>
            </div>
            {/* start of the user's details table */}
            <div className="snap-x overflow-x-auto scroll-smooth">
              {loading && <span>Loading</span>}

              <table className="w-full text-left text-gray-500">
                <thead className="text-sm text-gray-700">
                  <tr className="text-center">
                    {/* need to add the up-down arrow icon */}
                    <th className="columns-1 px-4 py-3">
                      <div className="flex justify-center">
                        <p>User Name</p>
                        <button className="ml-2">
                          <ArrowsUpDownIcon className="h-5 w-5"></ArrowsUpDownIcon>
                        </button>
                      </div>
                    </th>
                    <th className=" columns-1 px-4 py-3">
                      <div className="flex justify-center">
                        <p>Contact Number</p>
                        <button className="ml-2">
                          <ArrowsUpDownIcon className="h-5 w-5"></ArrowsUpDownIcon>
                        </button>
                      </div>
                    </th>
                    <th className=" columns-1 px-4 py-3">
                      School/ Work
                      <button className="ml-2">
                        <ArrowsUpDownIcon className="h-5 w-5"></ArrowsUpDownIcon>
                      </button>
                    </th>
                    <th className=" columns-1 px-4 py-3">
                      User Type
                      <button className="ml-2">
                        <ArrowsUpDownIcon className="h-5 w-5"></ArrowsUpDownIcon>
                      </button>
                    </th>
                    <th className=" columns-1 px-4 py-3">
                      Account Status
                      <button className="ml-2">
                        <ArrowsUpDownIcon className="h-5 w-5"></ArrowsUpDownIcon>
                      </button>
                    </th>
                    {me?.role === UserRole.SystemAdministrator && (
                      <th className="px-6 py-3">Management</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.edges?.map((edge) => (
                    <tr
                      key={edge.node.id}
                      className="border-b bg-white text-center"
                    >
                      <td className="items-center  py-4 text-black">
                        {/* avatar is not appearing */}
                        <div className="grid grid-cols-[100px_1fr]">
                          <div className="flex">
                            <Image
                              className="h-10 w-10 rounded-full"
                              src="/favicon.ico"
                              alt="Rounded avatar"
                              width={100}
                              height={100}
                            />
                            {edge.node.avatar}
                            <div className="ml-4">
                              {edge.node.firstName} {edge.node.lastName}
                              <br />
                              <span className="text-gray-500">
                                {edge.node.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-black">
                        {edge.node.mobileNo}
                      </td>
                      <td className="px-6 py-4 text-black">
                        {edge.node.school?.name ?? 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-black">
                        {userTypeMap[edge.node.role!]}
                      </td>
                      <td className="px-6 py-4 text-red-500">
                        NOT IMPLEMENTED IN GRAPHQL
                      </td>
                      <td className="flex justify-center px-6 py-4 text-black">
                        {/* dropdown code starts here */}
                        {me?.role === UserRole.SystemAdministrator && (
                          <DotsMoreOptions
                            className="h-6 w-6"
                            aria-hidden="true"
                            onOptionClick={(value: string) => {
                              switch (value) {
                                case 'delete':
                                  terminateAccount(edge.node.id);
                                  break;
                                default:
                                  updateRole(edge.node.id, value as UserRole);
                                  break;
                              }
                            }}
                            options={[
                              {
                                label: 'Make as Comm Member',
                                value: UserRole.CommitteeMember,
                              },
                              {
                                label: 'Make as System Admin',
                                value: UserRole.SystemAdministrator,
                              },
                              {
                                label: 'Make as Volunteer',
                                value: UserRole.User,
                              },
                              {
                                label: 'Delete User',
                                value: 'delete',
                                optionStyle: 'text-center text-red-500',
                              },
                            ]}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-3 py-3 text-center">
                <button className="inline-flex">
                  <IconButton
                    HeroIcon={() => (
                      <ChevronDoubleDownIcon className="h-5 w-5 text-brand-main" />
                    )}
                  />
                  <p className="body1 text-brand-main">Load More</p>
                </button>
              </div>
              {data?.users?.pageInfo?.hasNextPage && (
                <button onClick={handleLoadMoreClick}>Load more</button>
              )}
            </div>
          </div>
        </div>
      </NavBar>
      {/* end of body DIV */}
    </AppLayout>
  );
};

export default UsersPage;
