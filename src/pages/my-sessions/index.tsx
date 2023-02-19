import { useMutation, useQuery } from '@apollo/client';
import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  ClockIcon,
  PresentationChartLineIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UserRole } from '../../../gen/graphql/resolvers';
import Chip from '../../components/Chip';
import ClassOverviewCard from '../../components/ClassOverviewCard';
import CrossPresentationChartLineIcon from '../../components/icons/CrossPresentationChartLineIcon';
import TickPresentationChartLineIcon from '../../components/icons/TickPresentationChartLineIcon';
import VolunteerNavHeader from '../../components/VolunteerNavHeader';
import * as AccountRoleUpdate from '../../graphql/frontend/mutations/AccountRoleUpdateMutation';
import * as UsersQuery from '../../graphql/frontend/queries/UsersQuery';
import useCurrentUser from '../../hooks/useCurrentUser';
import AppLayout from '../../layouts/AppLayout';

const ALLOWED_ROLES = new Set([
  UserRole.SystemAdministrator,
  UserRole.CommitteeMember,
]);

const MySessionsPage: React.FC = function () {
  const { me, loading: meLoading } = useCurrentUser();
  const [linkSelected, setLinkSelected] = React.useState<
    'Upcoming Sessions' | 'Session History'
  >('Upcoming Sessions');

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
      <VolunteerNavHeader />
      <div className="my-6 mx-auto flex">
        <p className="h6 ml-20 mr-20 text-xl">Overview</p>
      </div>
      <div className="my-5 ml-20 mr-20 grid grid-cols-4 divide-x divide-gray-500">
        <ClassOverviewCard label="Upcoming Courses" currentData="3">
          <PresentationChartLineIcon className="mr-2 h-6 w-6" />
        </ClassOverviewCard>
        <ClassOverviewCard label="Course Attended" currentData="3">
          <TickPresentationChartLineIcon />
        </ClassOverviewCard>
        <ClassOverviewCard label="Hours Accumulated" currentData="3">
          <ClockIcon className="mr-2 h-6 w-6" />
        </ClassOverviewCard>
        <ClassOverviewCard label="Courses Cancelled" currentData="3">
          <CrossPresentationChartLineIcon />
        </ClassOverviewCard>
      </div>
      <div className="my-6 mx-auto flex">
        <p className="h6 ml-20 mr-20 text-xl">Courses</p>
      </div>

      <div className="ml-20 mr-20 flex text-center text-sm font-medium text-gray-500">
        <ul className="-mb-px flex flex-wrap">
          <li className="mr-2">
            <div
              onClick={() => setLinkSelected('Upcoming Sessions')}
              className={classNames(
                {
                  'border-b-2 border-brand-main text-brand-main':
                    linkSelected === 'Upcoming Sessions',
                  'text-gray-500': linkSelected !== 'Upcoming Sessions',
                },
                'cursor-default px-4 py-5 group-hover:text-brand-main'
              )}
              aria-current="page"
            >
              UPCOMING SESSIONS
            </div>
          </li>
          <li className="mr-2">
            <div
              onClick={() => setLinkSelected('Session History')}
              className={classNames(
                {
                  'border-b-2 border-brand-main text-brand-main':
                    linkSelected === 'Session History',
                  'text-gray-500': linkSelected !== 'Session History',
                },
                'cursor-default px-4 py-5 group-hover:text-brand-main'
              )}
            >
              SESSION HISTORY
            </div>
          </li>
        </ul>
      </div>

      {linkSelected === 'Upcoming Sessions' && (
        <div className="border-grey-400 ml-20 mr-20 mb-12 border-2 pl-5 pr-5">
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
      )}

      {linkSelected === 'Session History' && (
        <div className="border-grey-400 ml-20 mr-20 mb-12 border-2 pl-5 pr-5">
          <div className="mb-8 flex gap-4">
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
            <div className="w-2/5">
              <p className="mb-1 mt-5 text-xs text-gray-500">
                Attendance Status
              </p>
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
          <div className="snap-x overflow-x-auto scroll-smooth">
            {loading && <span>Loading</span>}

            <table className="w-full text-left text-gray-500">
              <thead className="text-sm text-gray-700">
                <th className="columns-1 px-6 py-3">Date </th>
                <th className="columns-1 px-6 py-3">Start Time </th>
                <th className="columns-1 px-6 py-3">End Time </th>
                <th className="columns-1 px-6 py-3">Course Title </th>
                <th className="columns-1 px-6 py-3">Location </th>
                <th className="columns-1 px-6 py-3">Attendance Status </th>
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
                    <td className="px-6 py-4  text-black">Sembawang CC</td>
                    <td className="px-6 py-4  text-center text-black">
                      <Chip scheme={'danger'} />
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
      )}
    </AppLayout>
  );
};

export default MySessionsPage;
