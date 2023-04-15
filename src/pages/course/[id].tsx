import { useMutation, useQuery } from '@apollo/client';
import { ArrowsUpDownIcon, PencilIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import produce from 'immer';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UserRole } from '../../../gen/graphql/operations';
import {
  Attendance,
  SessionDateFiltering,
  SessionSortKey,
} from '../../../gen/graphql/resolvers';
import Avatar from '../../components/Avatar';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import NavLink from '../../components/NavLink';
import RichTextEditor from '../../components/RichTextEditor';
import SEO from '../../components/SEO';
import Spinner from '../../components/Spinner';
import Tab from '../../components/Tab';
import * as SessionAttend from '../../graphql/frontend/mutations/SessionAttendMutation';
import * as CourseSlugSessionsQuery from '../../graphql/frontend/queries/CourseSlugSessionsQuery';
import * as GuestCourseSessionsQuery from '../../graphql/frontend/queries/GuestCourseSlugSessionsQuery';
import * as MeSessionAttendeesQuery from '../../graphql/frontend/queries/MeSessionAttendeesQuery';
import useCurrentUser from '../../hooks/useCurrentUser';
import AppLayout from '../../layouts/AppLayout';
import SessionButton from './components/SessionButton';

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

const first = 10;

const CourseDetailPage: React.FC = function () {
  const router = useRouter();
  const { id: slug } = router.query;

  const [reverse, setReverse] = React.useState(false);

  const [linkSelected, setLinkSelected] = React.useState<
    'Apply' | 'Description' | 'Instructions'
  >('Apply');

  const variables = React.useMemo<CourseSlugSessionsQuery.Variables>(() => {
    return {
      slug: slug as string,
      reverse,
      sortKey: SessionSortKey.Start,
      first,
      filter: {
        date: SessionDateFiltering.Upcoming,
      },
    };
  }, [slug, reverse]);

  const { data: guestData } = useQuery<
    GuestCourseSessionsQuery.Data,
    GuestCourseSessionsQuery.Variables
  >(GuestCourseSessionsQuery.Query, {
    variables,
    skip: slug == null,
  });

  const { data, loading, error, fetchMore, refetch } = useQuery<
    CourseSlugSessionsQuery.Data,
    CourseSlugSessionsQuery.Variables
  >(CourseSlugSessionsQuery.Query, {
    variables,
    skip: slug == null,
  });

  React.useEffect(() => {
    if (slug == null) {
      return;
    }

    refetch();
  }, [slug, refetch, variables]);

  const [updateSession] = useMutation<
    SessionAttend.Data,
    SessionAttend.Variables
  >(SessionAttend.Mutation);

  const meCourseInfo = useQuery<
    MeSessionAttendeesQuery.Data,
    MeSessionAttendeesQuery.Variables
  >(MeSessionAttendeesQuery.Query);
  const attendingSessions = meCourseInfo.data?.me?.sessionAttendees.edges ?? [];

  const { me } = useCurrentUser();

  const attendingSessionsIdArr: string[] = [];

  for (const session of attendingSessions) {
    if (session.node.indicatedAttendance == 'attend') {
      attendingSessionsIdArr.push(session.node.sessionId);
    }
  }

  const course = data?.course ?? null;

  const guestCourse = guestData?.course ?? null;

  const handleLoadMoreClick: React.MouseEventHandler = () => {
    const endCursor = data?.course?.sessions?.pageInfo?.endCursor;

    fetchMore({
      variables: {
        after: endCursor,
      },
    });
  };

  const updateIndicatedAttendance = React.useCallback(
    (indicatedAttendance: Attendance, sessionId: string) => {
      updateSession({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            indicatedAttendance,
            sessionId,
          },
        },
        update: (cache, mutationResult) => {
          if (mutationResult.data == null) {
            return;
          }

          const queryData = cache.readQuery<
            CourseSlugSessionsQuery.Data,
            CourseSlugSessionsQuery.Variables
          >({
            query: CourseSlugSessionsQuery.Query,
            variables,
          });

          if (queryData == null) {
            return;
          }

          const queryDataUpdated = produce(queryData, (draft) => {
            const sessionEdge = draft.course.sessions.edges.find(
              (edge) => edge.node.id === sessionId
            );

            if (sessionEdge == null) {
              return;
            }

            sessionEdge.node.selfAttendee =
              mutationResult.data?.sessionAttend.sessionAttendee;
          });

          cache.writeQuery<
            CourseSlugSessionsQuery.Data,
            CourseSlugSessionsQuery.Variables
          >({
            query: CourseSlugSessionsQuery.Query,
            variables,
            data: queryDataUpdated,
          });
        },
      });
    },
    [updateSession, variables]
  );

  React.useEffect(() => {
    if (slug == null || loading) {
      return;
    }

    if (data != null || error != null) {
      return;
    }

    router.push('/404');
  }, [data, error, slug, loading, router]);

  if (!me) {
    return (
      <div className="mx-5 my-12 flex flex-col justify-between sm:mx-14 xl:mx-auto xl:w-11/12 xxl:w-4/5">
        <BackButton text={'Back to Home'} href="/" />
        <div className="relative mx-auto mb-9 h-[30vh] w-full">
          <Image
            src={guestCourse?.coverImage ?? '/default-cover-image.jpg'}
            alt="cover picture"
            fill
            className="mt-3 rounded-3xl"
          />
        </div>
        <SEO title={guestCourse?.name ?? 'Course'} />
        {guestCourse != null && (
          <div className="flex flex-col justify-between gap-9 xl:flex-row xl:gap-14">
            <div className="basis-2/3">
              <h6 className="mb-6">
                {guestCourse.firstSessionStartDate != null &&
                guestCourse.lastSessionEndDate != null ? (
                  <>
                    From{' '}
                    {DateTime.fromISO(
                      guestCourse.firstSessionStartDate ?? ''
                    ).toLocaleString(DateTime.DATE_MED)}{' '}
                    -{' '}
                    {DateTime.fromISO(
                      guestCourse.lastSessionEndDate ?? ''
                    ).toLocaleString(DateTime.DATE_MED)}
                  </>
                ) : (
                  <>No sessions</>
                )}
              </h6>
              <h2 className="mb-6">{guestCourse.name}</h2>
              <div className="subtitle1 mb-5">{guestCourse.subtitle}</div>
              <div>
                <div className="flex gap-4">
                  <Tab
                    onClick={() => setLinkSelected('Apply')}
                    selectedID={linkSelected}
                    tabID="Apply"
                    text="APPLY"
                    href="#"
                    underline={true}
                  />
                  <Tab
                    onClick={() => setLinkSelected('Description')}
                    selectedID={linkSelected}
                    tabID="Description"
                    text="DESCRIPTION"
                    href="#"
                    underline={true}
                  />
                  <Tab
                    onClick={() => setLinkSelected('Instructions')}
                    selectedID={linkSelected}
                    tabID="Instructions"
                    text="INSTRUCTIONS"
                    href="#"
                    underline={true}
                  />
                </div>
                <div className="border-full mb-5 block w-full rounded-lg border bg-white shadow-lg">
                  {linkSelected === 'Apply' && (
                    <>
                      <div className="snap-x overflow-x-auto scroll-smooth">
                        <table className="sm: w-full md:w-full lg:w-full">
                          <thead>
                            <tr>
                              <th className="whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                <div className="subtitle2 flex items-center gap-1.5">
                                  <span>Date</span>
                                  <span>
                                    <ArrowsUpDownIcon
                                      className={classNames(
                                        'hover:text-secondary h-5 w-5 hover:cursor-pointer',
                                        {
                                          'text-gray-400': !reverse,
                                          'text-gray-800': reverse,
                                        }
                                      )}
                                      onClick={() => {
                                        setReverse((prevState) => !prevState);
                                      }}
                                    />
                                  </span>
                                </div>
                              </th>
                              <th className="whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                <div className="subtitle2 flex items-center gap-1.5">
                                  <span>Start Time</span>
                                  <span>
                                    <ArrowsUpDownIcon
                                      className={classNames(
                                        'hover:text-secondary h-5 w-5 hover:cursor-pointer',
                                        {
                                          'text-gray-400': !reverse,
                                          'text-gray-800': reverse,
                                        }
                                      )}
                                      onClick={() => {
                                        setReverse((prevState) => !prevState);
                                      }}
                                    />
                                  </span>
                                </div>
                              </th>
                              <th className="whitespace-nowrap border-b  border-slate-300 py-4 pl-4 text-left">
                                <div className="subtitle2 flex items-center gap-1.5">
                                  <span>End Time</span>
                                  <span>
                                    <ArrowsUpDownIcon
                                      className={classNames(
                                        'hover:text-secondary h-5 w-5 hover:cursor-pointer',
                                        {
                                          'text-gray-400': !reverse,
                                          'text-gray-800': reverse,
                                        }
                                      )}
                                      onClick={() => {
                                        setReverse((prevState) => !prevState);
                                      }}
                                    />
                                  </span>
                                </div>
                              </th>
                              <th className="whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                <div className="subtitle2 flex items-center gap-1.5">
                                  <span>Available Slots</span>
                                  <span>
                                    <ArrowsUpDownIcon
                                      className={classNames(
                                        'hover:text-secondary h-5 w-5 hover:cursor-pointer',
                                        {
                                          'text-gray-400': !reverse,
                                          'text-gray-800': reverse,
                                        }
                                      )}
                                      onClick={() => {
                                        setReverse((prevState) => !prevState);
                                      }}
                                    />
                                  </span>
                                </div>
                              </th>
                              <th className="border-b border-slate-300 py-4 px-4 text-left" />
                            </tr>
                          </thead>
                          <tbody>
                            {guestCourse.sessions.edges.map((edge) => (
                              <tr key={edge.cursor}>
                                <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  {DateTime.fromISO(
                                    edge.node.startDate
                                  ).toLocaleString(DateTime.DATE_MED)}
                                </td>
                                <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  {DateTime.fromISO(
                                    edge.node.startTime
                                  ).toLocaleString(DateTime.TIME_SIMPLE)}
                                </td>
                                <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  {DateTime.fromISO(
                                    edge.node.endTime
                                  ).toLocaleString(DateTime.TIME_SIMPLE)}
                                </td>
                                <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  {edge.node.volunteerSlotAvailableCount ??
                                    'Unlimited'}
                                </td>
                                <td className="whitespace-nowrap border-b border-slate-300 py-4 px-4 text-center">
                                  {attendingSessionsIdArr.includes(
                                    edge.node.id
                                  ) ? (
                                    <SessionButton
                                      size="sm"
                                      isApplyBtn={true}
                                      variant="secondary"
                                      href="/login"
                                    />
                                  ) : (
                                    <Button
                                      size="sm"
                                      isApplyBtn={true}
                                      label="Apply"
                                      href="/login"
                                    />
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex items-center justify-end gap-6 px-3">
                        {guestCourse.sessions.pageInfo.hasNextPage && (
                          <button onClick={handleLoadMoreClick}>
                            Load more
                          </button>
                        )}
                        <div>
                          {Math.min(guestCourse.sessions.totalCount, 1)} -{' '}
                          {guestCourse.sessions.edges.length} of{' '}
                          {guestCourse.sessions.totalCount}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {linkSelected === 'Description' && (
                  <RichTextEditor
                    className="px-4"
                    value={guestCourse.description}
                    toolbarDisabled
                    readonly
                  />
                )}
                {linkSelected === 'Instructions' && (
                  <RichTextEditor
                    className="mb-4 px-4"
                    value={
                      guestCourse.descriptionPrivate ||
                      'There are no instructions available.'
                    }
                    toolbarDisabled
                    readonly
                  />
                )}
              </div>
            </div>
            <div className="basis-1/3">
              <div className="border-full mb-5 block w-full rounded-lg border bg-white p-10 shadow-lg">
                <div className="subtitle1 mb-2.5">LOCATION</div>
                <div className="mb-2.5 h-56 w-full">
                  <Map
                    lat={guestCourse!.defaultLocation!.lat}
                    lng={guestCourse!.defaultLocation!.lng}
                    name={guestCourse!.defaultLocation!.name}
                  />
                </div>
                <div className="body1 mb-8">
                  {guestCourse.defaultLocation?.address}
                </div>
                <div className="subtitle1 mb-2.5">TRAINER(S) DETAILS</div>
                <div className="body1">
                  <p className="items-center">
                    <div className="grid grid-cols-[100px_1fr]">
                      <div className="flex">
                        <div className="text-left">
                          {guestCourse.courseManagers.edges.map((edge) => (
                            <div
                              className="flex items-center justify-center"
                              key={edge.cursor}
                            >
                              {edge.node && (
                                <Avatar
                                  className="h-10 w-10 shrink-0"
                                  user={edge.node.user}
                                ></Avatar>
                              )}
                              <div className="ml-4">
                                <span>
                                  {edge.node.user.firstName}{' '}
                                  {edge.node.user.lastName}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="mb-12 flex flex-col justify-between ">
        <h6 className="body1 my-9">
          <BackButton
            text="Back to Discover Courses"
            href="/discover-courses"
          />
        </h6>
        <div className="relative mx-auto mb-9 h-[30vh] w-full">
          <Image
            src={course?.coverImage ?? '/default-cover-image.jpg'}
            alt="cover picture"
            fill
            className="rounded-3xl"
          />
        </div>
        <SEO title={course?.name ?? 'Course'} />
        {loading && <Spinner />}
        {error != null && <span className="text-red-400">{error.message}</span>}
        {course != null && (
          <div className="flex flex-col justify-between gap-9 xl:flex-row xl:gap-14">
            <div className="basis-2/3">
              <h6 className="mb-6">
                {course.firstSessionStartDate != null &&
                course.lastSessionEndDate != null ? (
                  <>
                    From{' '}
                    {DateTime.fromISO(
                      course.firstSessionStartDate ?? ''
                    ).toLocaleString(DateTime.DATE_MED)}{' '}
                    -{' '}
                    {DateTime.fromISO(
                      course.lastSessionEndDate ?? ''
                    ).toLocaleString(DateTime.DATE_MED)}
                  </>
                ) : (
                  <>No sessions</>
                )}
              </h6>
              <h2 className="mb-6 inline-flex items-center">
                <span className="mr-2">{course.name}</span>
                {me?.role !== UserRole.User && (
                  <NavLink href={`/manage/course/${course.id}`}>
                    <IconButton HeroIcon={() => <PencilIcon title="Edit" />} />
                  </NavLink>
                )}
              </h2>
              <div className="subtitle1 mb-5">{course.subtitle}</div>
              <div>
                <div className="flex gap-4">
                  <Tab
                    onClick={() => setLinkSelected('Apply')}
                    selectedID={linkSelected}
                    tabID="Apply"
                    text="APPLY"
                    href="#"
                    underline={true}
                  />
                  <Tab
                    onClick={() => setLinkSelected('Description')}
                    selectedID={linkSelected}
                    tabID="Description"
                    text="DESCRIPTION"
                    href="#"
                    underline={true}
                  />
                  <Tab
                    onClick={() => setLinkSelected('Instructions')}
                    selectedID={linkSelected}
                    tabID="Instructions"
                    text="INSTRUCTIONS"
                    href="#"
                    underline={true}
                  />
                </div>
                <div className="border-full mb-5 block w-full rounded-lg border bg-white shadow-lg">
                  {linkSelected === 'Apply' && (
                    <>
                      <div className="snap-x overflow-x-auto scroll-smooth">
                        <table className="sm: w-full md:w-full lg:w-full">
                          <thead>
                            <tr>
                              <th className="whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                <div className="subtitle2 flex items-center gap-1.5">
                                  <span>Date</span>
                                  <span>
                                    <ArrowsUpDownIcon
                                      className={classNames(
                                        'hover:text-secondary h-5 w-5 hover:cursor-pointer',
                                        {
                                          'text-gray-400': !reverse,
                                          'text-gray-800': reverse,
                                        }
                                      )}
                                      onClick={() => {
                                        setReverse((prevState) => !prevState);
                                      }}
                                    />
                                  </span>
                                </div>
                              </th>
                              <th className="whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                <div className="subtitle2 flex items-center gap-1.5">
                                  <span>Start Time</span>
                                </div>
                              </th>
                              <th className="whitespace-nowrap border-b  border-slate-300 py-4 pl-4 text-left">
                                <div className="subtitle2 flex items-center gap-1.5">
                                  <span>End Time</span>
                                </div>
                              </th>
                              <th className="whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                <div className="subtitle2 flex items-center gap-1.5">
                                  <span>Available Slots</span>
                                </div>
                              </th>
                              <th className="border-b border-slate-300 py-4 px-4 text-left" />
                            </tr>
                          </thead>
                          <tbody>
                            {course.sessions.edges.map((edge) => (
                              <tr key={edge.cursor}>
                                <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  {DateTime.fromISO(
                                    edge.node.startDate
                                  ).toLocaleString(DateTime.DATE_MED)}
                                </td>
                                <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  {DateTime.fromISO(
                                    edge.node.startTime
                                  ).toLocaleString(DateTime.TIME_SIMPLE)}
                                </td>
                                <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  {DateTime.fromISO(
                                    edge.node.endTime
                                  ).toLocaleString(DateTime.TIME_SIMPLE)}
                                </td>
                                <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  {edge.node.volunteerSlotAvailableCount
                                    ? edge.node.volunteerSlotAvailableCount +
                                      '/' +
                                      edge.node.volunteerSlotCount!
                                    : 'Unlimited'}
                                </td>
                                <td className="whitespace-nowrap border-b border-slate-300 py-4 px-4 text-center">
                                  {edge.node.selfAttendee
                                    ?.indicatedAttendance ===
                                  Attendance.Attend ? (
                                    <SessionButton
                                      size="sm"
                                      isApplyBtn={true}
                                      variant="secondary"
                                      onClick={() => {
                                        const startDate = DateTime.fromISO(
                                          edge.node.startDate
                                        ).toLocaleString(DateTime.DATE_MED);

                                        const startTime = DateTime.fromISO(
                                          edge.node.startTime
                                        ).toLocaleString(DateTime.TIME_SIMPLE);

                                        const endTime = DateTime.fromISO(
                                          edge.node.endTime
                                        ).toLocaleString(DateTime.TIME_SIMPLE);

                                        if (
                                          !window.confirm(
                                            `Are you sure you want to unapply for "${course.name}" on ${startDate} between ${startTime} and ${endTime}?`
                                          )
                                        ) {
                                          return;
                                        }
                                        updateIndicatedAttendance(
                                          Attendance.Absent,
                                          edge.node.id
                                        );
                                      }}
                                    />
                                  ) : (
                                    <Button
                                      size="sm"
                                      isApplyBtn={true}
                                      label="Apply"
                                      onClick={() => {
                                        const startDate = DateTime.fromISO(
                                          edge.node.startDate
                                        ).toLocaleString(DateTime.DATE_MED);

                                        const startTime = DateTime.fromISO(
                                          edge.node.startTime
                                        ).toLocaleString(DateTime.TIME_SIMPLE);

                                        const endTime = DateTime.fromISO(
                                          edge.node.endTime
                                        ).toLocaleString(DateTime.TIME_SIMPLE);

                                        if (
                                          !window.confirm(
                                            `Are you sure you want to apply for "${course.name}" on ${startDate} between ${startTime} and ${endTime}?`
                                          )
                                        ) {
                                          return;
                                        }

                                        updateIndicatedAttendance(
                                          Attendance.Attend,
                                          edge.node.id
                                        );
                                      }}
                                    />
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex items-center justify-end gap-6 px-3">
                        {course.sessions.pageInfo.hasNextPage && (
                          <button onClick={handleLoadMoreClick}>
                            Load more
                          </button>
                        )}
                        <div>
                          {Math.min(course.sessions.totalCount, 1)} -{' '}
                          {course.sessions.edges.length} of{' '}
                          {course.sessions.totalCount}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {linkSelected === 'Description' && (
                  <RichTextEditor
                    className="px-4"
                    value={course.description}
                    toolbarDisabled
                    readonly
                  />
                )}
                {linkSelected === 'Instructions' && (
                  <RichTextEditor
                    className="mb-4 px-4"
                    value={
                      course.descriptionPrivate ||
                      'There are no instructions available.'
                    }
                    toolbarDisabled
                    readonly
                  />
                )}
              </div>
            </div>
            <div className="basis-1/3">
              <div className="border-full mb-5 block w-full rounded-lg border bg-white p-10 shadow-lg">
                <div className="subtitle1 mb-2.5">LOCATION</div>
                <div className="mb-2.5 h-56 w-full">
                  <Map
                    lat={course!.defaultLocation!.lat}
                    lng={course!.defaultLocation!.lng}
                    name={course.defaultLocation!.name}
                  />
                </div>
                <div className="body1 mb-8">
                  {course.defaultLocation?.address}
                </div>
                <div className="subtitle1 mb-2.5">TRAINER(S) DETAILS</div>
                <div className="body1">
                  <p className="items-center">
                    <div className="grid grid-cols-[100px_1fr]">
                      <div className="flex">
                        <div className="text-left">
                          {course.courseManagers.edges.map((edge) => (
                            <div
                              className="flex items-center justify-center"
                              key={edge.cursor}
                            >
                              {edge.node && (
                                <Avatar
                                  className="h-10 w-10 shrink-0"
                                  user={edge.node.user}
                                ></Avatar>
                              )}
                              <div className="ml-4">
                                <p>
                                  {edge.node.user.firstName}{' '}
                                  {edge.node.user.lastName}
                                </p>
                                <p className="" key={edge.cursor}>
                                  {edge.node.user.email}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CourseDetailPage;
