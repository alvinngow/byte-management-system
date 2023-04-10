import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Attendance,
  SessionAttendeeDateFiltering,
  SessionAttendeeSortKey,
} from '../../../../../gen/graphql/resolvers';
import { UserRole } from '../../../../../gen/graphql/resolvers';
import BackButton from '../../../../components/BackButton';
import Button from '../../../../components/Button';
import DotsMoreOptions from '../../../../components/DotsMoreOptions';
import Input from '../../../../components/Input';
import TabHistory from '../../../../components/ManageUsers/components/TabHistory';
import TabUpcoming from '../../../../components/ManageUsers/components/TabUpcoming';
import { userSessionsReducer } from '../../../../components/ManageUsers/reducers/userSessionsReducer';
import Select from '../../../../components/Select';
import Spinner from '../../../../components/Spinner';
import Tab from '../../../../components/Tab';
import UserSessionsOverview from '../../../../components/UserSessionsOverview';
import * as AccountRoleUpdate from '../../../../graphql/frontend/mutations/AccountRoleUpdateMutation';
import * as AccountTerminate from '../../../../graphql/frontend/mutations/AccountTerminateMutation';
import * as UserQuery from '../../../../graphql/frontend/queries/UserQuery';
import * as UserSessions from '../../../../graphql/frontend/queries/UserSessionAttendeesQuery';
import useDebounce from '../../../../hooks/useDebounce';
import UserPageLayout from '../../../../layouts/UserPageLayout';
import styles from '../../../../styles/component_styles/Input.module.css';

const BACKGROUND_COLORS = [
  'bg-pink-600',
  'bg-sky-600',
  'bg-lime-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-violet-500',
  'bg-red-500',
  'bg-indigo-500',
];

const userTypeMap = {
  [UserRole.User]: 'User',
  [UserRole.SystemAdministrator]: 'System Administrator',
  [UserRole.CommitteeMember]: 'Committee Member',
};

const SingleUserPage: NextPage = function () {
  const router = useRouter();
  const { userId } = router.query;

  const [reducerState, reducerDispatch] = React.useReducer(
    userSessionsReducer,
    {
      tab: 'upcoming_sessions',
      searchTerm: '',
      reverse: false,
      filterActualAttendance: undefined,
    }
  );

  const searchTermDebounced = useDebounce(reducerState.searchTerm);

  const variables = React.useMemo<UserSessions.Variables>(() => {
    switch (reducerState.tab) {
      case 'upcoming_sessions': {
        return {
          id: userId as string,
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
          id: userId as string,
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
    userId,
  ]);

  const { data, loading, fetchMore, refetch } = useQuery<
    UserSessions.Data,
    UserSessions.Variables
  >(UserSessions.Query, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  React.useEffect(() => {
    refetch();
  }, [refetch, variables]);

  const [accountRoleUpdate] = useMutation<
    AccountRoleUpdate.Data,
    AccountRoleUpdate.Variables
  >(AccountRoleUpdate.Mutation);

  const [accountTerminate] = useMutation<
    AccountTerminate.Data,
    AccountTerminate.Variables
  >(AccountTerminate.Mutation);

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

  const randomBgClass = React.useMemo(() => {
    return BACKGROUND_COLORS[
      Math.floor(Math.random() * BACKGROUND_COLORS.length)
    ];
  }, []);

  const { data: userData } = useQuery<UserQuery.Data, UserQuery.Variables>(
    UserQuery.Query,
    {
      variables: {
        id: userId as string,
      },
    }
  );

  const avatarUrl = userData?.user.avatar;

  const endCursor = data?.user.sessionAttendees.pageInfo.endCursor;

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

  const handleAttendanceStatusChange = React.useCallback(
    (value: Attendance | undefined) => {
      reducerDispatch({
        type: 'set_attendance',
        attendance: value,
      });
    },
    []
  );

  const toggleReverse = React.useCallback(() => {
    reducerDispatch({
      type: 'flip_reverse',
    });
  }, []);

  return (
    <UserPageLayout>
      <div className="flex">
        <div className="flex basis-1/5 flex-col gap-12 px-5 py-9">
          <h6 className="text-gray-600">
            <BackButton href="/manage/users" text="Back to Users" />
          </h6>
          <div className="mx-auto flex flex-col gap-2.5">
            <span
              className={classNames(
                'mx-auto flex h-16 w-16 items-center justify-center rounded-full',
                randomBgClass
              )}
            >
              {avatarUrl ? (
                <Image
                  className="grow object-cover"
                  src={avatarUrl}
                  alt="profile placeholder"
                  width={24}
                  height={24}
                />
              ) : (
                <span className="avatarLetter grow self-center text-center text-white">
                  {userData?.user.firstName[0]}
                  {userData?.user.lastName[0]}
                </span>
              )}
            </span>
            <div className="mx-auto">
              {userData?.user.firstName} {userData?.user.lastName}
            </div>
            <div className="mx-auto">{userData?.user.school?.name}</div>
            <div className="mx-auto">
              <Button
                size="sm"
                className="my-4"
                variant="secondary"
                href={`mailto:${userData?.user.email}`}
              >
                Email
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Input
              type="email"
              placeholder={userData?.user.email}
              label="Email"
              readOnly
            ></Input>
            <Input
              type="number"
              placeholder={userData?.user.mobileNo}
              label="Mobile Number"
              autoComplete="tel-local"
              prefixElement={
                <span className="mb-5 h-full w-12 py-0 pr-2 leading-tight focus:outline-none">
                  +65
                </span>
              }
              readOnly
            ></Input>
            <div>
              <span className={`${styles['input-label']}`}>User Type</span>
              <div
                className={`${styles['input']} text-secondary flex w-full  justify-between`}
              >
                {userTypeMap[userData?.user.role!]}
                <span>
                  <DotsMoreOptions
                    className="h-6 w-6"
                    aria-hidden="true"
                    onOptionClick={(value: string) => {
                      switch (value) {
                        case 'delete':
                          terminateAccount(userData?.user.id!);
                          break;
                        default:
                          updateRole(userData?.user.id!, value as UserRole);
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
                </span>
              </div>
            </div>
            <Input
              type="text"
              placeholder={
                userData?.user.approved_at
                  ? 'Approved'
                  : userData?.user.verified_at
                  ? 'Verified'
                  : 'Pending'
              }
              label="Account Status"
              readOnly
            ></Input>
          </div>
        </div>
        <div className="h-screen w-px bg-gray-300"></div>
        <div className="basis-4/5">
          <div className="my-12 mx-7">
            <h6>Overview</h6>
            <div className="sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
              <UserSessionsOverview userId={userId as string} />
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
                href="#"
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
                href="#"
              />
            </div>
            <div className="border-grey-400 mb-12 rounded-lg px-5 pb-12 shadow-lg">
              <div className="mb-5 mt-3 flex w-full flex-col gap-4 md:flex-row lg:flex-row">
                <div className="sm:w-full">
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
                          placeholder="All"
                          items={[
                            {
                              label: 'All',
                              value: undefined,
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
                          value={
                            reducerState.filterActualAttendance as
                              | Attendance
                              | undefined
                          }
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
                    {reducerState.tab === 'upcoming_sessions' &&
                      data != null && (
                        <TabUpcoming
                          sessionAttendeeConnection={data.user.sessionAttendees}
                          reverse={reducerState.reverse}
                          handleReverseToggle={toggleReverse}
                        />
                      )}

                    {reducerState.tab === 'session_history' && data != null && (
                      <TabHistory
                        sessionAttendeeConnection={data.user.sessionAttendees}
                        reverse={reducerState.reverse}
                        handleReverseToggle={toggleReverse}
                      />
                    )}
                  </>
                )}

                {data?.user.sessionAttendees.pageInfo.hasNextPage && (
                  <button onClick={handleLoadMoreClick}>Load more</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPageLayout>
  );
};

export default SingleUserPage;
