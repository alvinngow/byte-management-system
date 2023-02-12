import { useMutation, useQuery } from '@apollo/client';
import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  ClockIcon,
  PresentationChartLineIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UserRole } from '../../../../gen/graphql/resolvers';
import Chip from '../../../components/Chip';
import ClassOverviewCard from '../../../components/ClassOverviewCard';
import CrossPresentationChartLineIcon from '../../../components/icons/CrossPresentationChartLineIcon';
import TickPresentationChartLineIcon from '../../../components/icons/TickPresentationChartLineIcon';
import NavBar from '../../../components/NavBar';
import NavHeader from '../../../components/NavHeader';
import * as AccountRoleUpdate from '../../../graphql/frontend/mutations/AccountRoleUpdateMutation';
import * as UsersQuery from '../../../graphql/frontend/queries/UsersQuery';
import useCurrentUser from '../../../hooks/useCurrentUser';
import AppLayout from '../../../layouts/AppLayout';

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
    <AppLayout>
      <NavHeader />
      <div className="my-6 mx-auto flex">
        <p className="ml-20 mr-20 text-xl">Overview</p>
      </div>
      <div className="my-5 ml-20 mr-20 grid grid-cols-4 divide-x divide-gray-500">
        <ClassOverviewCard label="Upcoming Classes" currentData="3">
          <PresentationChartLineIcon className="mr-2 h-6 w-6" />
        </ClassOverviewCard>
        <ClassOverviewCard label="Class Attended" currentData="3">
          <TickPresentationChartLineIcon />
        </ClassOverviewCard>
        <ClassOverviewCard label="Hours Accumulated" currentData="3">
          <ClockIcon className="mr-2 h-6 w-6" />
        </ClassOverviewCard>
        <ClassOverviewCard label="Classes Cancelled" currentData="3">
          <CrossPresentationChartLineIcon />
        </ClassOverviewCard>
      </div>
      <div className="my-6 mx-auto flex">
        <p className="ml-20 mr-20 text-xl">Classes</p>
      </div>

      <div className="ml-20 mr-20 flex text-center text-sm font-medium text-gray-500">
        <ul className="-mb-px flex flex-wrap">
          <li className="mr-2">
            <a
              href="#"
              className="active inline-block rounded-t-lg border-b-2 border-transparent border-blue-600 p-4 text-blue-600"
              aria-current="page"
            >
              Upcoming Sessions
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className="active inline-block rounded-t-lg border-b-2 border-transparent p-4"
            >
              Session History
            </a>
          </li>
        </ul>
      </div>

      {/* start of first table */}
      <div className="border-grey-400 ml-20 mr-20 mb-12 border-2 pl-5 pr-5">
        {/* search bar */}
        <div>
          <p className="mb-1 mt-5 text-xs text-gray-500">Search</p>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="mb-5 inline-flex w-full items-center whitespace-pre border-b-2 border-solid border-b-neutral-400 py-2.5 text-center text-sm text-gray-500"
            type="button"
          >
            Course, Location...{' '}
          </button>
        </div>
        {/* start of the user's details table */}
        <div className="snap-x overflow-x-auto scroll-smooth">
          {loading && <span>Loading</span>}

          <table className="w-full text-left text-gray-500">
            <thead className="text-sm text-gray-700">
              <th className="columns-1 px-6 py-3">
                Date{' '}
                <button>
                  <span className="inline-flex">
                    <ArrowsUpDownIcon className="ml-1 h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              <th className="columns-1 px-6 py-3">
                Start Time{' '}
                <button>
                  <span className="inline-flex">
                    <ArrowsUpDownIcon className="ml-1 h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              <th className="columns-1 px-6 py-3">
                End Time{' '}
                <button>
                  <span className="inline-flex">
                    <ArrowsUpDownIcon className="ml-1 h-5 w-5"></ArrowsUpDownIcon>
                  </span>
                </button>
              </th>
              <th className="columns-1 px-6 py-3">Course Title </th>
              <th className="columns-1 px-6 py-3">Location </th>
              {/* {me?.role === UserRole.SystemAdministrator && (
                <th className="px-6 py-3">Management</th>
              )} */}
            </thead>
            <tbody>
              {data?.users?.edges?.map((edge) => (
                <tr key={edge.node.id} className="border-b bg-white">
                  <td className="px-6 py-4 text-black">10 Jan 2023</td>
                  <td className="px-6 py-4 text-black">4:00 PM</td>
                  <td className="px-6 py-4 text-black">5:00 PM</td>
                  <td className="px-6 py-4 text-blue-500 underline">
                    Learn Music Production From Scratch
                  </td>
                  <td className="px-6 py-4 text-black">Sembawang CC</td>
                  <td className="px-6 py-4 text-black">
                    <button>
                      <XMarkIcon className="ml-auto h-6 w-6"></XMarkIcon>
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
      {/* end of first table DIV */}

      {/* start of second table */}
      <div className="border-grey-400 ml-20 mr-20 mb-12 border-2 pl-5 pr-5">
        {/* search bar */}
        <div className="mb-8 flex gap-4">
          {/* div 1 */}
          <div className="w-3/5">
            <p className="mb-1 mt-5 text-xs text-gray-500">Search</p>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="inline-flex w-full items-center whitespace-pre border-b-2 border-solid border-b-neutral-400 py-2.5 text-center text-sm text-gray-500"
              type="button"
            >
              Course, Location...{' '}
            </button>
          </div>
          {/* div 2 */}
          <div className="w-2/5">
            <p className="mb-1 mt-5 text-xs text-gray-500">Attendance Status</p>
            <div className="flex">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="inline-flex w-full items-center whitespace-pre border-b-2 border-solid border-b-neutral-400 py-2.5 text-center text-sm text-gray-500"
                type="button"
              >
                All{' '}
                <ChevronDownIcon className="ml-auto h-6 w-6"></ChevronDownIcon>
              </button>
            </div>
          </div>
          {/* div 3 */}
          <div className="w-2/5">
            <p className="mb-1 mt-5 text-xs text-gray-500">Sort by</p>
            <div className="flex">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="inline-flex w-full items-center whitespace-pre border-b-2 border-solid border-b-neutral-400 py-2.5 text-center text-sm text-gray-500"
                type="button"
              >
                Date{' '}
                <ArrowsUpDownIcon className="ml-auto h-6 w-6"></ArrowsUpDownIcon>
              </button>
            </div>
          </div>
        </div>
        {/* start of the user's details table */}
        <div className="snap-x overflow-x-auto scroll-smooth">
          {loading && <span>Loading</span>}

          <table className="w-full text-left text-gray-500">
            <thead className="text-sm text-gray-700">
              {/* need to add the up-down arrow icon */}
              <th className="columns-1 px-6 py-3">Date </th>
              <th className="columns-1 px-6 py-3">Start Time </th>
              <th className="columns-1 px-6 py-3">End Time </th>
              <th className="columns-1 px-6 py-3">Course Title </th>
              <th className="columns-1 px-6 py-3">Location </th>
              <th className="columns-1 px-6 py-3">Attendance Status </th>
              {/* {me?.role === UserRole.SystemAdministrator && (
                <th className="px-6 py-3">Management</th>
              )} */}
            </thead>
            <tbody>
              {data?.users?.edges?.map((edge) => (
                <tr key={edge.node.id} className="border-b bg-white">
                  {/* need to change the edge nodes */}
                  <td className="px-6 py-4 text-black">10 Jan 2023</td>
                  <td className="px-6 py-4 text-black">
                    {/* {edge.node.mobileNo} */}
                    4:00 PM
                  </td>
                  <td className="px-6 py-4 text-black">5:00 PM</td>
                  <td className="px-6 py-4 text-blue-500 underline">
                    Learn Music Production From Scratch
                  </td>
                  <td className="px-6 py-4  text-black">Sembawang CC</td>
                  <td className="px-6 py-4  text-center text-black">
                    <Chip scheme={'danger'}>Chip</Chip>
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
      {/* end of second table DIV  */}
    </AppLayout>
  );
};

export default ClassPage;
