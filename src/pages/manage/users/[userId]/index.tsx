import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import {
  Attendance,
  SessionAttendeeDateFiltering,
  SessionAttendeeSortKey,
} from '@bims/graphql/schema';
import { UserRole } from '@bims/graphql/schema';
import classNames from 'classnames';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import BackButton from '../../../../components/BackButton';
import Button from '../../../../components/Button';
import DotsMoreOptions from '../../../../components/DotsMoreOptions';
import Input from '../../../../components/Input';
import TabHistory from '../../../../components/ManageUsers/components/TabHistory';
import TabUpcoming from '../../../../components/ManageUsers/components/TabUpcoming';
import { userSessionsReducer } from '../../../../components/ManageUsers/reducers/userSessionsReducer';
import Select from '../../../../components/Select';
import SEO from '../../../../components/SEO';
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

  const [hideParticulars, setHideParticulars] = React.useState(true);

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
      <SEO title="Manage User" />
      <div className="flex flex-col overflow-x-hidden xl:flex-row">
        <div className="flex flex-col gap-12 px-5 py-9 sm:text-left">
          <BackButton href="/manage/users" text="Back to Users" />
          <div className=" mx-3 flex flex-col  gap-2.5 lg:flex-row lg:justify-between xl:mx-auto xl:flex-col xl:justify-start">
            <div className="flex w-72 flex-row gap-2.5 xl:flex-col">
              <span
                className={classNames(
                  'flex h-16 w-16 items-center justify-center rounded-full xl:mx-auto',
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
                  <p className="avatarLetter grow self-center text-center text-white">
                    {userData?.user.firstName[0]}
                    {userData?.user.lastName[0]}
                  </p>
                )}
              </span>
              <div className="flex flex-col gap-2.5">
                <h4 className="capitalize xl:mx-auto">
                  {userData?.user.firstName} {userData?.user.lastName}
                </h4>
                <div className="body1 text-secondary xl:mx-auto">
                  {userData?.user.school?.name}
                </div>
              </div>
            </div>
            <div className="xl:mx-auto">
              <Button
                size="sm"
                className="my-4"
                variant="secondary"
                href={`mailto:${userData?.user.email}`}
              >
                Email
              </Button>
              <Button
                size="sm"
                className={classNames('ml-2.5 inline xl:hidden', {
                  '!bg-brand-main !text-white': !hideParticulars,
                })}
                variant="active"
                onClick={() => setHideParticulars((prevState) => !prevState)}
              >
                View Details
              </Button>
            </div>
          </div>
          <div
            className={classNames('xl:block', {
              hidden: hideParticulars,
            })}
          >
            <div className="flex flex-col gap-4">
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
                  className={`${styles['input']} text-secondary flex w-full justify-between`}
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
                          optionStyle: 'text-red-500',
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
        </div>
        <div className="hidden h-screen w-px bg-gray-300 xl:block"></div>
        <div className="block h-0.5 w-full bg-gray-300 xl:hidden"></div>
        <div className="flex flex-col overflow-x-hidden py-12 px-7">
          <h6>Overview</h6>
          <div className="sm:grid-cols-2 md:grid-cols-4">
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
          <div className="border-grey-400 mb-12 rounded-xl px-5 pb-12 shadow-xl">
            <div className="mb-5 mt-3 flex w-full flex-col gap-4 md:flex-row xl:flex-row">
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
                  <div className="sm:w-full md:w-1/4 xl:w-1/4">
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
                            label: 'Attended',
                            value: Attendance.Attend,
                          },
                          {
                            label: 'Absent',
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
                  {reducerState.tab === 'upcoming_sessions' && data != null && (
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
    </UserPageLayout>
  );
};

export default SingleUserPage;
