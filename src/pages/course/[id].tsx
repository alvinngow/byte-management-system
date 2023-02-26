import { useQuery } from '@apollo/client';
import {
  ArrowsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { SessionSortKey } from '../../../gen/graphql/resolvers';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import SEO from '../../components/SEO';
import Spinner from '../../components/Spinner';
import VolunteerNavHeader from '../../components/VolunteerNavHeader';
import * as CourseSessionsQuery from '../../graphql/frontend/queries/CourseSessionsQuery';

const first = 10;

const CourseDetailPage: React.FC = function () {
  const router = useRouter();
  const { id } = router.query;

  const [reverse, setReverse] = React.useState(false);

  const [linkSelected, setLinkSelected] = React.useState<
    'Apply' | 'Description' | 'Volunteer Instructions'
  >('Apply');

  const { data, loading, error, fetchMore } = useQuery<
    CourseSessionsQuery.Data,
    CourseSessionsQuery.Variables
  >(CourseSessionsQuery.Query, {
    variables: {
      id: id as string,
      reverse,
      sortKey: SessionSortKey.Start,
      first,
    },
    skip: id == null,
  });

  const handleLoadMoreClick: React.MouseEventHandler = () => {
    const endCursor = data?.course?.sessions?.pageInfo?.endCursor;

    fetchMore({
      variables: {
        after: endCursor,
      },
    });
  };

  React.useEffect(() => {
    if (id == null || loading) {
      return;
    }

    if (data != null || error != null) {
      return;
    }

    router.push('/404');
  }, [data, error, id, loading, router]);

  const course = data?.course ?? null;

  return (
    <>
      <VolunteerNavHeader />
      <h6 className="mx-auto my-9 w-[80vw] text-gray-600">
        <BackButton href="/discover-courses" text="Back to Discover Classes" />
      </h6>
      <div className="relative mx-auto mb-9 h-[30vh] w-[80vw]">
        <Image
          src={course?.coverImage ?? '/default-cover-image.jpg'}
          alt="cover picture"
          fill
          className="rounded-3xl object-cover"
        />
      </div>
      <SEO title={course?.name ?? 'Course'} />
      {loading && <Spinner />}
      {error != null && <span className="text-red-400">{error.message}</span>}
      {course != null && (
        <div className="mx-auto flex w-[80vw]">
          <div className="mr-14 w-8/12">
            <h6 className="mb-6">
              From{' '}
              {DateTime.fromISO(
                course.firstSessionStartDate ?? ''
              ).toLocaleString(DateTime.DATE_MED)}{' '}
              -{' '}
              {DateTime.fromISO(course.lastSessionEndDate ?? '').toLocaleString(
                DateTime.DATE_MED
              )}
            </h6>
            <h2 className="mb-6">Volunteer for Teaching Students Art 2022</h2>
            <div className="subtitle1 mb-5">{course.subtitle}</div>
            <div>
              <div className="flex gap-4">
                <div
                  onClick={() => setLinkSelected('Apply')}
                  className={classNames(
                    {
                      'border-b-2 border-brand-main text-brand-main':
                        linkSelected === 'Apply',
                      'text-gray-500': linkSelected !== 'Apply',
                    },
                    'cursor-default px-4 py-5 group-hover:text-brand-main'
                  )}
                >
                  Apply
                </div>
                <div
                  onClick={() => setLinkSelected('Description')}
                  className={classNames(
                    {
                      'border-b-2 border-brand-main text-brand-main':
                        linkSelected === 'Description',
                      'text-gray-500': linkSelected !== 'Description',
                    },
                    'cursor-default px-4 py-5 group-hover:text-brand-main'
                  )}
                >
                  Description
                </div>
                <div
                  onClick={() => setLinkSelected('Volunteer Instructions')}
                  className={classNames(
                    {
                      'border-b-2 border-brand-main text-brand-main':
                        linkSelected === 'Volunteer Instructions',
                      'text-gray-500':
                        linkSelected !== 'Volunteer Instructions',
                    },
                    'cursor-default px-4 py-5 group-hover:text-brand-main'
                  )}
                >
                  Instructions for volunteers
                </div>
              </div>
              <div className="border-full mb-12 block w-full rounded-lg border bg-white shadow-lg">
                {linkSelected === 'Apply' && (
                  <>
                    <table className="md:w-full">
                      <thead>
                        <tr>
                          <th className="border-b border-slate-300 py-4 pl-4 text-left">
                            <div className="subtitle2 flex items-center gap-1.5">
                              <span>Date</span>
                              <span>
                                <ArrowsUpDownIcon
                                  className={classNames(
                                    'h-5 w-5 hover:cursor-pointer hover:text-gray-600',
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
                          <th className="border-b border-slate-300 py-4 pl-4 text-left">
                            <div className="subtitle2 flex items-center gap-1.5">
                              <span>Start Time</span>
                            </div>
                          </th>
                          <th className="border-b border-slate-300 py-4 pl-4 text-left">
                            <div className="subtitle2 flex items-center gap-1.5">
                              <span>End Time</span>
                            </div>
                          </th>
                          <th className="border-b border-slate-300 py-4 pl-4 text-left">
                            <div className="subtitle2 flex items-center gap-1.5">
                              <span>Available Slots</span>
                            </div>
                          </th>
                          <th className="border-b border-slate-300 py-4 pl-4 text-left" />
                        </tr>
                      </thead>
                      <tbody>
                        {course.sessions.edges.map((edge) => (
                          <tr key={edge.cursor}>
                            <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                              {DateTime.fromISO(
                                edge.node.startDate
                              ).toLocaleString(DateTime.DATE_MED)}
                            </td>
                            <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                              {DateTime.fromISO(
                                edge.node.startTime
                              ).toLocaleString(DateTime.TIME_SIMPLE)}
                            </td>
                            <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                              {DateTime.fromISO(
                                edge.node.endTime
                              ).toLocaleString(DateTime.TIME_SIMPLE)}
                            </td>
                            <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                              {edge.node.volunteerSlotAvailableCount ??
                                'Unlimited'}
                            </td>
                            <td className="border-b border-slate-300 py-4 pl-4 text-center">
                              <Button size="sm" label="Apply" disabled />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex items-center justify-end gap-6 px-3">
                      {course.sessions.pageInfo.hasNextPage && (
                        <button onClick={handleLoadMoreClick}>Load more</button>
                      )}
                      <div>
                        1 - {course.sessions.edges.length} of{' '}
                        {course.sessions.totalCount}
                      </div>
                    </div>
                  </>
                )}
                {linkSelected === 'Description' && <p>{course.description}</p>}
                {linkSelected === 'Volunteer Instructions' && (
                  <p>
                    {course.descriptionPrivate ||
                      'There are no instructions available.'}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="border-full mb-12 block w-full rounded-lg border bg-white p-10 shadow-lg">
              <div className="subtitle1 mb-2.5 uppercase">location</div>
              <div className="mb-2.5">Placeholder</div>
              <div className="body1 mb-8">
                {course.defaultLocation?.address}
              </div>
              <div className="subtitle1 mb-2.5 uppercase">contact details</div>
              <div className="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                Ut et massa mi. <br />
                Aliquam in hendrerit urna.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetailPage;
