import { useMutation, useQuery } from '@apollo/client';
import { ArrowsUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Attendance,
  SessionAttendeeConnection,
  SessionAttendeeDateFiltering,
  SessionAttendeeSortKey,
} from '../../../gen/graphql/resolvers';
import ActualAttendancePill from '../../components/ActualAttendancePill';
import Input from '../../components/Input';
import MySessionsOverview from '../../components/MySessionsOverview';
import Select from '../../components/Select';
import SEO from '../../components/SEO';
import Spinner from '../../components/Spinner';
import VolunteerNavHeader from '../../components/VolunteerNavHeader';
import * as SessionAttend from '../../graphql/frontend/mutations/SessionAttendMutation';
import * as MeSessions from '../../graphql/frontend/queries/MeSessionAttendeesQuery';
import useDebounce from '../../hooks/useDebounce';
import AppLayout from '../../layouts/AppLayout';

interface TabUpcomingProps {
  sessionAttendeeConnection: SessionAttendeeConnection;
  reverse: boolean;
  handleReverseToggle: React.MouseEventHandler;
}

const TabUpcoming: React.FC<TabUpcomingProps> = function (props) {
  const { sessionAttendeeConnection, reverse, handleReverseToggle } = props;

  const [sessionAttend] = useMutation<
    SessionAttend.Data,
    SessionAttend.Variables
  >(SessionAttend.Mutation);

  return (
    <table className="w-full text-left text-gray-500">
      <thead className="text-sm text-gray-700">
        <th className="flex columns-1 px-6 py-3">
          Date
          <button
            className="ml-auto hover:cursor-pointer"
            onClick={handleReverseToggle}
          >
            <ArrowsUpDownIcon
              className={classNames('h-4 w-4', {
                'text-gray-300': reverse,
              })}
            />
          </button>
        </th>
        <th className="columns-1 px-6 py-3">Start Time </th>
        <th className="columns-1 px-6 py-3">End Time </th>
        <th className="columns-1 px-6 py-3">Course Title </th>
        <th className="columns-1 px-6 py-3">Location </th>
      </thead>
      <tbody>
        {sessionAttendeeConnection.edges.map((edge) => (
          <tr key={edge.node.id} className="border-b bg-white">
            <td className="px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.startDate).toLocaleString(
                DateTime.DATE_MED
              )}
            </td>
            <td className="px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.startTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </td>
            <td className="px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.endTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </td>
            <td className="px-6 py-4 text-blue-500 underline">
              <a href={`/course/${edge.node.session.course.id}`}>
                {edge.node.session.course.name}
              </a>
            </td>
            <td className="px-6 py-4 text-black">
              {edge.node.session.location?.name}
            </td>
            <td className="px-6 py-4 text-black">
              <button>
                <XMarkIcon
                  className="ml-auto h-6 w-6"
                  onClick={() => {
                    if (
                      !window.confirm('Are you sure you are not attending?')
                    ) {
                      return;
                    }

                    sessionAttend({
                      variables: {
                        input: {
                          clientMutationId: uuidv4(),
                          sessionId: edge.node.id,
                          indicatedAttendance: Attendance.Absent,
                        },
                      },
                    });
                  }}
                ></XMarkIcon>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface TabHistoryProps {
  sessionAttendeeConnection: SessionAttendeeConnection;
  reverse: boolean;
  handleReverseToggle: React.MouseEventHandler;
}

const TabHistory: React.FC<TabHistoryProps> = function (props) {
  const { sessionAttendeeConnection, reverse, handleReverseToggle } = props;

  return (
    <table className="w-full text-left text-gray-500">
      <thead className="text-sm text-gray-700">
        <th className="flex columns-1 px-6 py-3">
          Date
          <button
            className="ml-auto hover:cursor-pointer"
            onClick={handleReverseToggle}
          >
            <ArrowsUpDownIcon
              className={classNames('h-4 w-4', {
                'text-gray-300': reverse,
              })}
            />
          </button>
        </th>
        <th className="columns-1 px-6 py-3">Start Time </th>
        <th className="columns-1 px-6 py-3">End Time </th>
        <th className="columns-1 px-6 py-3">Course Title </th>
        <th className="columns-1 px-6 py-3">Location </th>
        <th className="columns-1 px-6 py-3 text-center">Attendance Status</th>
      </thead>
      <tbody>
        {sessionAttendeeConnection.edges.map((edge) => (
          <tr key={edge.node.id} className="border-b bg-white">
            <td className="px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.startDate).toLocaleString(
                DateTime.DATE_MED
              )}
            </td>
            <td className="px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.startTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </td>
            <td className="px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.endTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </td>
            <td className="px-6 py-4 text-blue-500 underline">
              <a href={`/course/${edge.node.session.course.id}`}>
                {edge.node.session.course.name}
              </a>
            </td>
            <td className="px-6 py-4 text-black">
              {edge.node.session.location?.name}
            </td>

            <td className="px-6 py-4  text-center text-black">
              <ActualAttendancePill
                actualAttendance={edge.node.actualAttendance ?? null}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const MySessionsPage: React.FC = function () {
  const [tab, setTab] = React.useState<'Upcoming Sessions' | 'Session History'>(
    'Upcoming Sessions'
  );

  const [searchTerm, setSearchTerm] = React.useState('');
  const searchTermDebounced = useDebounce(searchTerm);

  const [reverse, setReverse] = React.useState(false);

  const [filterActualAttendance, setFilterActualAttendance] = React.useState<
    Attendance | undefined
  >(undefined);

  const variables = React.useMemo<MeSessions.Variables>(() => {
    switch (tab) {
      case 'Upcoming Sessions': {
        return {
          filter: {
            actualAttendance: filterActualAttendance,
            date: SessionAttendeeDateFiltering.Upcoming,
            searchText: searchTermDebounced || undefined,
          },
          sortKey: SessionAttendeeSortKey.SessionStart,
          reverse,
        };
      }
      case 'Session History': {
        return {
          filter: {
            actualAttendance: filterActualAttendance,
            date: SessionAttendeeDateFiltering.Past,
            searchText: searchTermDebounced || undefined,
          },
          sortKey: SessionAttendeeSortKey.SessionStart,
          reverse,
        };
      }
    }
  }, [filterActualAttendance, reverse, searchTermDebounced, tab]);

  const { data, loading, fetchMore } = useQuery<
    MeSessions.Data,
    MeSessions.Variables
  >(MeSessions.Query, {
    variables,
  });

  const endCursor = data?.me.sessionAttendees.pageInfo.endCursor;

  const handleLoadMoreClick = React.useCallback<React.MouseEventHandler>(() => {
    fetchMore({
      variables: {
        ...variables,
        after: endCursor,
      },
    });
  }, [endCursor, fetchMore, variables]);

  const handleSortByDateClick: React.MouseEventHandler = () => {
    setReverse((prevState) => !prevState);
  };

  const handleSearchInputChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAttendanceStatusChange = React.useCallback((value: string) => {
    setFilterActualAttendance(value ? (value as Attendance) : undefined);
  }, []);

  const toggleReverse = React.useCallback(() => {
    setReverse((prevState) => !prevState);
  }, []);

  return (
    <AppLayout>
      <SEO title="My Sessions" />
      <VolunteerNavHeader />
      <div className="my-6 mx-auto flex">
        <p className="h6 ml-20 mr-20 text-xl">Overview</p>
      </div>
      <MySessionsOverview />
      <div className="my-6 mx-auto flex">
        <p className="h6 ml-20 mr-20 text-xl">Courses</p>
      </div>

      <div className="ml-20 mr-20 flex text-center text-sm font-medium text-gray-500">
        <ul className="-mb-px flex flex-wrap">
          <li className="mr-2">
            <div
              onClick={() => setTab('Upcoming Sessions')}
              className={classNames(
                {
                  'border-b-2 border-brand-main text-brand-main':
                    tab === 'Upcoming Sessions',
                  'text-gray-500': tab !== 'Upcoming Sessions',
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
              onClick={() => setTab('Session History')}
              className={classNames(
                {
                  'border-b-2 border-brand-main text-brand-main':
                    tab === 'Session History',
                  'text-gray-500': tab !== 'Session History',
                },
                'cursor-default px-4 py-5 group-hover:text-brand-main'
              )}
            >
              SESSION HISTORY
            </div>
          </li>
        </ul>
      </div>

      <div className="border-grey-400 ml-20 mr-20 mb-12 border-2 pl-5 pr-5">
        <div className="mb-8 flex w-full justify-around gap-4">
          <Input
            className="grow"
            label="Search"
            placeholder="Course, Location..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />

          {tab === 'Session History' && (
            <>
              <div className="relative flex grow">
                <Select
                  className="grow"
                  items={[
                    {
                      label: 'None',
                      value: '',
                    },
                    {
                      label: 'Attending',
                      value: Attendance.Attend,
                    },
                    {
                      label: 'Not Attending',
                      value: Attendance.Absent,
                    },
                  ]}
                  label="Attendance Status"
                  value={filterActualAttendance as string}
                  onChange={handleAttendanceStatusChange}
                />
              </div>
            </>
          )}
        </div>

        <div className="snap-x overflow-x-auto scroll-smooth">
          {loading && <Spinner />}
          {tab === 'Upcoming Sessions' && data != null && (
            <TabUpcoming
              sessionAttendeeConnection={data.me.sessionAttendees}
              reverse={reverse}
              handleReverseToggle={toggleReverse}
            />
          )}

          {tab === 'Session History' && data != null && (
            <TabHistory
              sessionAttendeeConnection={data.me.sessionAttendees}
              reverse={reverse}
              handleReverseToggle={toggleReverse}
            />
          )}

          {data?.me.sessionAttendees.pageInfo.hasNextPage && (
            <button onClick={handleLoadMoreClick}>Load more</button>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default MySessionsPage;
