import { useMutation, useQuery } from '@apollo/client';
import {
  ArrowsUpDownIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UserRole } from '../../../gen/graphql/resolvers';
import IconButton from '../../components/IconButton';
import Input from '../../components/Input';
import NavBar from '../../components/NavBar';
import NavHeader from '../../components/NavHeader';
import Select from '../../components/Select';
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
  const [modal, setModal] = React.useState(false);

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
  const handleClick = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
    console.log(modal);
  };
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setModal(false);
  };

  if (meLoading) {
    return null;
  }

  return (
    <AppLayout>
      {/* start of body DIV*/}
      <NavBar>
        <NavHeader />
        <div>
          <div>
            <h4 className="mb-6 mt-4 flex p-4 px-12">Users</h4>
          </div>
          {/* start of table */}
          <div className="border-grey-400 ml-12 mr-12 mb-12 border-2 pl-5 pr-5">
            {/* search bar */}
            <div className="mb-2 grid grid-cols-2 gap-4 pl-5 pr-5 pt-6 pb-6">
              <div>
                <Input label="Search" placeholder={'Name, Email, School... '} />
              </div>
              <div className="relative">
                <Select
                  items={[
                    { label: 'All', value: 'All' },
                    { label: 'Volunteer', value: 'Volunteer' },
                    { label: 'Committee Member', value: 'Committee Member' },
                    { label: 'Admin', value: 'Admin' },
                  ]}
                  label={'User Type'}
                  value={'All'}
                  className="relative mb-3 w-full"
                  onChange={function (value: string): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </div>
            </div>
            {/* start of the user's details table */}
            <div className="snap-x overflow-x-auto scroll-smooth">
              {loading && <span>Loading</span>}

              <table className="w-full table-auto text-left">
                <thead className="subtitle2 py-auto">
                  <th className="px-6 py-3">
                    <div className="flex gap-1">
                      <p className="whitespace-nowrap">User Name</p>
                      <IconButton
                        HeroIcon={(props) => (
                          <ArrowsUpDownIcon className="h-5 w-5" />
                        )}
                      />
                    </div>
                  </th>
                  <th className="px-6 py-3">
                    <div className="flex gap-1">
                      <p className="whitespace-nowrap">Contact Number</p>
                      <IconButton
                        HeroIcon={(props) => (
                          <ArrowsUpDownIcon className="h-5 w-5" />
                        )}
                      />
                    </div>
                  </th>
                  <th className="px-6 py-3">
                    <div className="flex gap-1">
                      <p className="whitespace-nowrap">School/ Work</p>
                      <IconButton
                        HeroIcon={(props) => (
                          <ArrowsUpDownIcon className="h-5 w-5" />
                        )}
                      />
                    </div>
                  </th>
                  <th className="px-6 py-3">
                    <div className="flex gap-1">
                      <p className="whitespace-nowrap">User Type</p>
                      <IconButton
                        HeroIcon={(props) => (
                          <ArrowsUpDownIcon className="h-5 w-5" />
                        )}
                      />
                    </div>
                  </th>
                  <th className="px-6 py-3">
                    <div className="flex gap-1">
                      <p className="whitespace-nowrap">Account Status</p>
                      <IconButton
                        HeroIcon={(props) => (
                          <ArrowsUpDownIcon className="h-5 w-5" />
                        )}
                      />
                    </div>
                  </th>
                  {me?.role === UserRole.SystemAdministrator && (
                    <th className="px-6 py-3">Management</th>
                  )}
                </thead>
                <tbody>
                  {data?.users?.edges?.map((edge) => (
                    <tr key={edge.node.id} className="border-b bg-white">
                      <td className="body2 flex items-center gap-2 px-6 py-4 text-black">
                        <div className="w-[40px]">
                          <Image
                            className="h-[40px] w-[40px] rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU1wZeXDnAu6XK5bB6UsG69B-b2P_gnQfsfw&usqp=CAU"
                            alt="avatar-image"
                          />
                          {/* avatar is not appearing */}
                          {edge.node.avatar}
                        </div>
                        <div className="flex flex-col">
                          <span>
                            {edge.node.firstName} {edge.node.lastName}
                          </span>
                          <span className="text-secondary">
                            {edge.node.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6">{edge.node.mobileNo}</td>
                      <td className="px-6">
                        {edge.node.school?.name ?? 'N/A'}
                      </td>
                      <td className="px-6">{edge.node.role}</td>
                      <td className="px-6 text-red-500">NOT IN GRAPHQL</td>
                      <td className="relative">
                        <div onClick={handleClick}>
                          <IconButton
                            HeroIcon={() => (
                              <EllipsisVerticalIcon className="h-5 w-5" />
                            )}
                          />
                        </div>

                        {/* dropdown is hidden for now */}
                        {modal && (
                          <div
                            key={edge.node.id}
                            className="absolute top-0 left-10 z-50 flex flex-col items-start gap-y-px overflow-hidden rounded-b-lg bg-white p-2.5 shadow-lg"
                          >
                            <ul className="text-secondary subtitle2 py-2">
                              <li>
                                <button
                                  className="text-secondary px-4 py-2 text-left hover:bg-gray-100"
                                  onClick={() => {
                                    updateRole(
                                      edge.node.id,
                                      UserRole.CommitteeMember
                                    );
                                  }}
                                >
                                  Make as Comm Member
                                </button>
                              </li>
                              {me?.role === UserRole.SystemAdministrator && (
                                <li>
                                  <button
                                    className="text-secondary px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => {
                                      updateRole(
                                        edge.node.id,
                                        UserRole.SystemAdministrator
                                      );
                                    }}
                                  >
                                    Make as System Admin
                                  </button>
                                </li>
                              )}
                              <li>
                                <button
                                  className="text-secondary px-4 py-2 text-left hover:bg-gray-100"
                                  onClick={() => {
                                    updateRole(edge.node.id, UserRole.User);
                                  }}
                                >
                                  Make as Volunteer
                                </button>
                              </li>
                              <li>
                                <button className="px-4 py-2 text-left text-red-500 hover:bg-gray-100">
                                  Delete User
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
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
        </div>
      </NavBar>
      {/* end of body DIV */}
    </AppLayout>
  );
};

export default UsersPage;
