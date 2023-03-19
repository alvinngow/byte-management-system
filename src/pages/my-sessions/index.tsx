import { useQuery } from '@apollo/client';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Attendance,
  SessionAttendeeDateFiltering,
  SessionAttendeeSortKey,
} from '../../../gen/graphql/resolvers';
import Input from '../../components/Input';
import TabHistory from '../../components/MySessions/components/TabHistory';
import TabUpcoming from '../../components/MySessions/components/TabUpcoming';
import { mySessionsReducer } from '../../components/MySessions/reducers/mySessionsReducer';
import MySessionsOverview from '../../components/MySessionsOverview';
import Select from '../../components/Select';
import SEO from '../../components/SEO';
import Spinner from '../../components/Spinner';
import Tab from '../../components/Tab';
import * as MeSessions from '../../graphql/frontend/queries/MeSessionAttendeesQuery';
import useDebounce from '../../hooks/useDebounce';
import AppLayout from '../../layouts/AppLayout';

const MySessionsPage: React.FC = function () {
  const [reducerState, reducerDispatch] = React.useReducer(mySessionsReducer, {
    tab: 'upcoming_sessions',
    searchTerm: '',
    reverse: false,
    filterActualAttendance: undefined,
  });

  const searchTermDebounced = useDebounce(reducerState.searchTerm);

  const variables = React.useMemo<MeSessions.Variables>(() => {
    switch (reducerState.tab) {
      case 'upcoming_sessions': {
        return {
          filter: {
            actualAttendance: reducerState.filterActualAttendance,
            date: SessionAttendeeDateFiltering.Upcoming,
            searchText: searchTermDebounced || undefined,
            indicatedAttendance: Attendance.Attend,
          },
          sortKey: SessionAttendeeSortKey.SessionStart,
          reverse: reducerState.reverse,
        };
      }
      case 'session_history': {
        return {
          filter: {
            actualAttendance: reducerState.filterActualAttendance,
            date: SessionAttendeeDateFiltering.Past,
            searchText: searchTermDebounced || undefined,
          },
          sortKey: SessionAttendeeSortKey.SessionStart,
          reverse: reducerState.reverse,
        };
      }
    }
  }, [
    reducerState.filterActualAttendance,
    reducerState.reverse,
    reducerState.tab,
    searchTermDebounced,
  ]);

  const { data, loading, fetchMore, refetch } = useQuery<
    MeSessions.Data,
    MeSessions.Variables
  >(MeSessions.Query, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const endCursor = data?.me.sessionAttendees.pageInfo.endCursor;

  React.useEffect(() => {
    refetch();
  }, [refetch, variables]);

  const handleLoadMoreClick = React.useCallback<React.MouseEventHandler>(() => {
    fetchMore({
      variables: {
        ...variables,
        after: endCursor,
      },
    });
  }, [endCursor, fetchMore, variables]);

  const handleSearchInputChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    reducerDispatch({
      type: 'set_search_term',
      searchTerm: e.target.value,
    });
  }, []);

  const handleAttendanceStatusChange = React.useCallback((value: string) => {
    reducerDispatch({
      type: 'set_attendance',
      attendance: value != null ? (value as Attendance) : undefined,
    });
  }, []);

  const toggleReverse = React.useCallback(() => {
    reducerDispatch({
      type: 'flip_reverse',
    });
  }, []);

  return (
    <AppLayout>
      <SEO title="My Sessions" />
      <div className="mt-6 mb-11">
        <h6>Overview</h6>
        <div className="sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          <MySessionsOverview />
        </div>
        <h6 className="mb-5">Courses</h6>

        <div className="subtitle2 text-secondary flex text-center font-medium">
          <Tab
            selectedID={reducerState.tab}
            tabID="upcoming_sessions"
            onClick={() => {
              reducerDispatch({
                type: 'set_tab',
                tab: 'upcoming_sessions',
              });
            }}
            underline={true}
            text="UPCOMING SESSIONS"
          />

          <Tab
            selectedID={reducerState.tab}
            tabID="session_history"
            onClick={() => {
              reducerDispatch({
                type: 'set_tab',
                tab: 'session_history',
              });
            }}
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
                value={reducerState.searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>
            {reducerState.tab === 'session_history' && (
              <>
                <div className="sm:w-full md:w-1/4 lg:w-1/4">
                  <div className="relative flex grow">
                    <Select
                      className="grow"
                      placeholder="None"
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
                      value={reducerState.filterActualAttendance as string}
                      onChange={handleAttendanceStatusChange}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="snap-x overflow-x-auto scroll-smooth">
            {loading ? (
              <Spinner />
            ) : (
              <>
                {reducerState.tab === 'upcoming_sessions' && data != null && (
                  <TabUpcoming
                    sessionAttendeeConnection={data.me.sessionAttendees}
                    reverse={reducerState.reverse}
                    handleReverseToggle={toggleReverse}
                  />
                )}

                {reducerState.tab === 'session_history' && data != null && (
                  <TabHistory
                    sessionAttendeeConnection={data.me.sessionAttendees}
                    reverse={reducerState.reverse}
                    handleReverseToggle={toggleReverse}
                  />
                )}
              </>
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
