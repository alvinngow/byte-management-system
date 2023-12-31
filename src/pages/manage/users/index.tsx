import { useMutation, useQuery } from '@apollo/client';
import { UserFiltering, UserRole } from '@bims/graphql/schema';
import {
  AccountApprovalUpdateInput,
  UserEdge,
  UserSortKey,
} from '@bims/graphql/schema';
import {
  ArrowRightIcon,
  ArrowsUpDownIcon,
  ChevronDoubleDownIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Avatar from '../../../components/Avatar';
import Chip from '../../../components/Chip';
import DotsMoreOptions from '../../../components/DotsMoreOptions';
import IconButton from '../../../components/IconButton';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import SEO from '../../../components/SEO';
import * as AccountApprovalUpdate from '../../../graphql/frontend/mutations/AccountApprovalUpdateMutation';
import * as AccountRoleUpdate from '../../../graphql/frontend/mutations/AccountRoleUpdateMutation';
import * as AccountTerminate from '../../../graphql/frontend/mutations/AccountTerminateMutation';
import * as UsersQuery from '../../../graphql/frontend/queries/UsersQuery';
import useCurrentUser from '../../../hooks/useCurrentUser';
import useDebounce from '../../../hooks/useDebounce';
import AppLayout from '../../../layouts/AppLayout';

const ALLOWED_ROLES = new Set([
  UserRole.SystemAdministrator,
  UserRole.CommitteeMember,
]);

const userTypeMap = {
  [UserRole.User]: 'Volunteer',
  [UserRole.SystemAdministrator]: 'System Administrator',
  [UserRole.CommitteeMember]: 'Committee Member',
};

const UsersPage: NextPage = function (props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [volunteerFilter, setVolunteerFilter] = useState<UserRole | string>('');
  const [sortKey, setSortKey] = useState<UserSortKey | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm);
  const { me, loading: meLoading } = useCurrentUser();

  const handleRowClick = (edge: UserEdge) => {
    router.push(`users/${edge.node.id}`);
  };

  const variables = React.useMemo<UsersQuery.Variables>(() => {
    const filter: UserFiltering = { searchTerm: debouncedSearchTerm };

    if (volunteerFilter) {
      filter.role = [volunteerFilter as UserRole];
    }
    return {
      filter,
      sortKey,
      reverse: sortDirection,
    };
  }, [debouncedSearchTerm, volunteerFilter, sortKey, sortDirection]);

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

  const [accountApprovalUpdate] = useMutation<
    AccountApprovalUpdate.Data,
    AccountApprovalUpdate.Variables
  >(AccountApprovalUpdate.Mutation);

  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, volunteerFilter, refetch, variables]);

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

  const approveAccount = React.useCallback(
    (userId: string) => {
      accountApprovalUpdate({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            userId,
          },
        },
      });
    },
    [accountApprovalUpdate]
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

  const dotsOptions = [
    {
      label: 'Make as Committee Member',
      value: UserRole.CommitteeMember,
    },
    {
      label: 'Make as System Administrator',
      value: UserRole.SystemAdministrator,
    },
    {
      label: 'Make as Volunteer',
      value: UserRole.User,
    },
    {
      label: 'Delete User',
      value: 'delete',
      optionStyle: '!text-red-500',
    },
  ];

  const dotsOptionsWithApprove = [
    {
      label: 'Approve User',
      value: 'approve',
    },
    {
      label: 'Make as Committee Member',
      value: UserRole.CommitteeMember,
    },
    {
      label: 'Make as System Administrator',
      value: UserRole.SystemAdministrator,
    },
    {
      label: 'Make as Volunteer',
      value: UserRole.User,
    },
    {
      label: 'Delete User',
      value: 'delete',
      optionStyle: '!text-red-500',
    },
  ];

  return (
    <AppLayout>
      <SEO title="Manage Users" />
      {/* start of body DIV*/}
      <div className="mb-12">
        <h3 className="my-6">Users</h3>
        {/* start of table */}
        <div className="border-full rounded-lg border shadow-lg">
          {/* search bar */}
          <div className="flex flex-col gap-4 pl-5 pr-5 pt-6 pb-6 md:flex-row lg:flex-row">
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
            <div className="relative flex basis-1/3 flex-col">
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
                className="relative w-full"
                onChange={function (value: string): void {
                  setVolunteerFilter(value);
                }}
              />
            </div>
          </div>
          {/* start of the user's details table */}
          <div className="snap-x overflow-x-auto scroll-smooth">
            {loading && <span>Loading</span>}

            <table className="w-full text-left">
              <thead className="border-b border-slate-300 py-4 pl-4 text-left">
                <tr>
                  <th className="px-4 py-3 xsm:columns-2 md:columns-3">
                    <div className="flex justify-center whitespace-nowrap">
                      <p>User Name</p>
                      <IconButton
                        HeroIcon={() => (
                          <ArrowsUpDownIcon
                            className="ml-1"
                            onClick={() => {
                              setSortKey(UserSortKey.FirstName);
                              setSortDirection((prevState) => !prevState);
                            }}
                          ></ArrowsUpDownIcon>
                        )}
                      />
                    </div>
                  </th>
                  <th className=" columns-1 px-4 py-3">
                    <div className="flex justify-center whitespace-nowrap">
                      <p>Contact Number</p>
                      <IconButton
                        HeroIcon={() => (
                          <ArrowsUpDownIcon
                            className="ml-1"
                            onClick={() => {
                              setSortKey(UserSortKey.ContactNumber);
                              setSortDirection((prevState) => !prevState);
                            }}
                          ></ArrowsUpDownIcon>
                        )}
                      />
                    </div>
                  </th>
                  <th className="columns-1 px-4 py-3 ">
                    <div className="flex justify-center whitespace-nowrap">
                      <p>School/Work</p>
                      <IconButton
                        HeroIcon={() => (
                          <ArrowsUpDownIcon
                            className="ml-1"
                            onClick={() => {
                              setSortKey(UserSortKey.School);
                              setSortDirection((prevState) => !prevState);
                            }}
                          ></ArrowsUpDownIcon>
                        )}
                      />
                    </div>
                  </th>
                  <th className=" columns-1 px-4 py-3">
                    <div className="flex justify-center whitespace-nowrap">
                      User Type
                      <IconButton
                        HeroIcon={() => (
                          <ArrowsUpDownIcon
                            className="ml-1"
                            onClick={() => {
                              setSortKey(UserSortKey.UserType);
                              setSortDirection((prevState) => !prevState);
                            }}
                          ></ArrowsUpDownIcon>
                        )}
                      />
                    </div>
                  </th>
                  <th className="columns-1 px-4 py-3">Account Status</th>
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
                    <td className="items-center px-4 py-4">
                      {/* avatar is not appearing */}
                      <div className="grid grid-cols-[100px_1fr]">
                        <div className="flex ">
                          {edge.node && (
                            <Avatar
                              className="h-10 w-10 shrink-0"
                              user={edge.node}
                            ></Avatar>
                          )}
                          <div className="ml-4 text-left">
                            <p className="capitalize">
                              {edge.node.firstName} {edge.node.lastName}
                            </p>
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
                      {edge.node.approved_at ? (
                        <Chip scheme="approved" number={'Approved'} />
                      ) : edge.node.verified_at ? (
                        <Chip scheme="success" number={'Verified'} />
                      ) : (
                        <Chip scheme="disabled" number={'Pending'} />
                      )}
                    </td>
                    <td>
                      <IconButton
                        className="mr-4"
                        HeroIcon={() => (
                          <ArrowRightIcon
                            onClick={() => handleRowClick(edge)}
                          />
                        )}
                      />
                      {me?.role === UserRole.SystemAdministrator && (
                        <IconButton
                          HeroIcon={() => (
                            <DotsMoreOptions
                              className="h-6 w-6"
                              aria-hidden="true"
                              onOptionClick={(value: string) => {
                                switch (value) {
                                  case 'delete':
                                    terminateAccount(edge.node.id);
                                    break;
                                  case 'approve':
                                    approveAccount(edge.node.id);
                                    break;
                                  default:
                                    updateRole(edge.node.id, value as UserRole);
                                    break;
                                }
                              }}
                              options={
                                edge.node.verified_at && !edge.node.approved_at
                                  ? dotsOptionsWithApprove
                                  : dotsOptions
                              }
                            />
                          )}
                        ></IconButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data?.users?.pageInfo?.hasNextPage && (
              <div className="px-3 py-3 text-center">
                <button className="inline-flex" onClick={handleLoadMoreClick}>
                  <IconButton
                    HeroIcon={() => (
                      <ChevronDoubleDownIcon className="h-5 w-5 text-brand-main" />
                    )}
                  />
                  <p className="body1 text-brand-main">Load More</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end of body DIV */}
    </AppLayout>
  );
};

export default UsersPage;
