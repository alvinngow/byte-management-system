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
import IconButton from '../../components/IconButton';
import Input from '../../components/Input';
import MySessionsOverview from '../../components/MySessionsOverview';
import Select from '../../components/Select';
import SEO from '../../components/SEO';
import Spinner from '../../components/Spinner';
import Tab from '../../components/Tab';
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
    <table className="text-secondary w-full text-left">
      <thead className="subtitle2">
        <th className="whitespace-nowrap px-6 py-3">
          Date
          <button
            className="ml-auto hover:cursor-pointer"
            onClick={handleReverseToggle}
          >
            <ArrowsUpDownIcon
              className={classNames('h-5 w-5', {
                'text-secondary': reverse,
              })}
            />
          </button>
        </th>
        <th className="whitespace-nowrap px-6 py-3">Start Time </th>
        <th className="whitespace-nowrap px-6 py-3">End Time </th>
        <th className="whitespace-nowrap px-6 py-3">Course Title </th>
        <th className="whitespace-nowrap px-6 py-3">Location </th>
      </thead>
      <tbody>
        {sessionAttendeeConnection.edges.map((edge) => (
          <tr key={edge.node.id} className="border-b bg-white">
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.startDate).toLocaleString(
                DateTime.DATE_MED
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.startTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.endTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-blue-500 underline">
              {edge.node.session.course.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {edge.node.session.location?.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              <IconButton
                HeroIcon={() => (
                  <XMarkIcon
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
                  />
                )}
              />
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
    <table className="text-secondary w-full text-left">
      <thead className="subtitle2 text-secondary">
        <th className="whitespace-nowrap px-6 py-3">
          Date
          <button
            className="ml-auto hover:cursor-pointer"
            onClick={handleReverseToggle}
          >
            <ArrowsUpDownIcon
              className={classNames('h-5 w-5', {
                'text-secondary': reverse,
              })}
            />
          </button>
        </th>
        <th className="whitespace-nowrap px-6 py-3">Start Time </th>
        <th className="whitespace-nowrap px-6 py-3">End Time </th>
        <th className="whitespace-nowrap px-6 py-3">Course Title </th>
        <th className="whitespace-nowrap px-6 py-3">Location </th>
        <th className="whitespace-nowrap px-6 py-3 text-center">
          Attendance Status
        </th>
      </thead>
      <tbody>
        {sessionAttendeeConnection.edges.map((edge) => (
          <tr key={edge.node.id} className="border-b bg-white">
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.startDate).toLocaleString(
                DateTime.DATE_MED
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.startTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.endTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-blue-500 underline">
              {edge.node.session.course.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {edge.node.session.location?.name}
            </td>

            <td className="whitespace-nowrap px-6 py-4  text-center text-black">
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
  const [tab, setTab] = React.useState<'upcoming-sessions' | 'session-history'>(
    'upcoming-sessions'
  );

  const [searchTerm, setSearchTerm] = React.useState('');
  const searchTermDebounced = useDebounce(searchTerm);

  const [reverse, setReverse] = React.useState(false);

  const [filterActualAttendance, setFilterActualAttendance] = React.useState<
    Attendance | undefined
  >(undefined);

  const variables = React.useMemo<MeSessions.Variables>(() => {
    switch (tab) {
      case 'upcoming-sessions': {
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
      case 'session-history': {
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
      <div className="mx-5 mt-6 mb-11 w-auto sm:mx-auto sm:w-[80vw]">
        <h6>Overview</h6>
        <div className="sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          <MySessionsOverview />
        </div>
        <h6 className="mb-5">Courses</h6>

        <div className="subtitle2 text-secondary flex text-center font-medium">
          <Tab
            selectedID={tab}
            tabID="upcoming-sessions"
            onClick={() => setTab('upcoming-sessions')}
            underline={true}
            text="UPCOMING SESSIONS"
          />

          <Tab
            selectedID={tab}
            tabID="session-history"
            onClick={() => setTab('session-history')}
            underline={true}
            text="SESSION HISTORY"
          />
        </div>

        <div className="border-grey-400 mb-12 rounded-lg px-5 pb-12 shadow-lg">
          <div className="mb-5 mt-3 flex w-full flex-col gap-4 md:flex-row lg:flex-row">
            <div className="sm:w-full">
              {/* md:w-3/4 lg:w-3/4 */}
              <Input
                className="grow"
                label="Search"
                placeholder="Course, Location..."
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>
            {tab === 'session-history' && (
              <>
                <div className="sm:w-full md:w-1/4 lg:w-1/4">
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
                </div>
              </>
            )}
          </div>

          <div className="snap-x overflow-x-auto scroll-smooth">
            {loading && <Spinner />}
            {tab === 'upcoming-sessions' && data != null && (
              <TabUpcoming
                sessionAttendeeConnection={data.me.sessionAttendees}
                reverse={reverse}
                handleReverseToggle={toggleReverse}
              />
            )}

            {tab === 'session-history' && data != null && (
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
      </div>
    </AppLayout>
  );
};

export default MySessionsPage;
