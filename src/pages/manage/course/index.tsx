import { useMutation, useQuery } from '@apollo/client';
import {
  ArrowsUpDownIcon,
  ChevronDoubleDownIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Course,
  CourseDateFiltering,
  CourseSortKey,
} from '../../../../gen/graphql/resolvers';
import Button from '../../../components/Button';
import IconButton from '../../../components/IconButton';
import Input from '../../../components/Input';
import Modal from '../../../components/Modal';
import NavLink from '../../../components/NavLink';
import NoResults from '../../../components/NoResults';
import Select, { SelectItem } from '../../../components/Select';
import SEO from '../../../components/SEO';
import Spinner from '../../../components/Spinner';
import * as CourseDelete from '../../../graphql/frontend/mutations/CourseDeleteMutation';
import * as CoursesQuery from '../../../graphql/frontend/queries/CoursesQuery';
import useDebounce from '../../../hooks/useDebounce';
import AppLayout from '../../../layouts/AppLayout';

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

const CoursePage: React.FC = function () {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  const [sortKeyForCourse, setSortKeyForCourse] = React.useState<
    | CourseSortKey.Name
    | CourseSortKey.LocationName
    | CourseSortKey.StartDate
    | CourseSortKey.EndDate
    | CourseSortKey.Region
  >();

  const [sortDirection, setSortDirection] = React.useState(false);

  const [filterForCourse, setFilterForCourse] = React.useState<
    CourseDateFiltering.Upcoming | CourseDateFiltering.Past
  >();

  const { data, loading, fetchMore, refetch } = useQuery<
    CoursesQuery.Data,
    CoursesQuery.Variables
  >(CoursesQuery.Query, {
    variables: {
      sortKey: sortKeyForCourse,
      filter: {
        date: filterForCourse,
        searchTerm: debouncedSearchTerm,
      },
      reverse: sortDirection,
    },
  });

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, sortKeyForCourse, sortDirection, refetch]);

  const courses = data?.courses.edges;

  const [
    courseDelete,
    { loading: courseDeleteLoading, error: courseDeleteError },
  ] = useMutation<CourseDelete.Data, CourseDelete.Variables>(
    CourseDelete.Mutation
  );

  const [courseToDelete, setCourseToDelete] = React.useState<Course | null>(
    null
  );

  const handleLoadMoreClick = React.useCallback<React.MouseEventHandler>(() => {
    fetchMore({
      variables: {
        after: data?.courses.pageInfo.endCursor,
      },
    });
  }, [data?.courses.pageInfo.endCursor, fetchMore]);

  const FilterByShowcase: React.FC = function () {
    const items = React.useMemo<SelectItem[]>(() => {
      return [
        {
          label: 'All Courses',
        },
        {
          label: 'Upcoming Courses',
          value: CourseDateFiltering.Upcoming,
        },
        {
          label: 'Past Courses',
          value: CourseDateFiltering.Past,
        },
      ];
    }, []);

    const value = filterForCourse;

    return (
      <Select
        items={items}
        value={value}
        label="Show"
        onChange={(value) => {
          setFilterForCourse(value);
        }}
      />
    );
  };

  return (
    <AppLayout>
      <SEO title="Courses" />

      <div className="my-6 flex justify-between">
        <h3>Courses</h3>
        <Button label="+ ADD CLASS" href={`/manage/course/add`} />
      </div>
      <div className="border-full mb-12 block w-full rounded-lg border bg-white shadow-lg">
        <div className="flex flex-col gap-4 p-4 lg:flex-row">
          <div className="flex basis-2/3 flex-col">
            <Input
              label="Search"
              placeholder="Title, location .."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="relative flex basis-1/3 flex-col">
            <FilterByShowcase />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b border-slate-300 py-4 pl-4 text-left">
                  <div className="flex items-center gap-1.5">
                    <span>Title</span>
                    <IconButton
                      HeroIcon={() => (
                        <ArrowsUpDownIcon
                          className="ml-1 mb-1"
                          onClick={() => {
                            setSortKeyForCourse(CourseSortKey.Name);
                            setSortDirection((prevState) => !prevState);
                          }}
                        />
                      )}
                    />
                  </div>
                </th>
                <th className="border-b border-slate-300 py-4 pl-4 text-left">
                  <div className="flex items-center gap-1.5">
                    <span>Location</span>
                    <IconButton
                      HeroIcon={() => (
                        <ArrowsUpDownIcon
                          className="ml-1 mb-1"
                          onClick={() => {
                            setSortKeyForCourse(CourseSortKey.LocationName);
                            setSortDirection((prevState) => !prevState);
                          }}
                        />
                      )}
                    />
                  </div>
                </th>
                <th className="border-b border-slate-300 py-4 pl-4 text-left">
                  <div className=" flex items-center gap-1.5">
                    <span>Region</span>
                    <IconButton
                      HeroIcon={() => (
                        <ArrowsUpDownIcon
                          className="ml-1 mb-1"
                          onClick={() => {
                            setSortKeyForCourse(CourseSortKey.Region);
                            setSortDirection((prevState) => !prevState);
                          }}
                        />
                      )}
                    />
                  </div>
                </th>
                <th className="border-b border-slate-300 py-4 pl-4 text-left">
                  Trainer(s)
                </th>
                <th className="border-b border-slate-300 py-4 pl-4 text-left">
                  <div className="flex items-center gap-1.5">
                    <span>Start Date</span>
                    <IconButton
                      HeroIcon={() => (
                        <ArrowsUpDownIcon
                          className="ml-1 mb-1"
                          onClick={() => {
                            setSortKeyForCourse(CourseSortKey.StartDate);
                            setSortDirection((prevState) => !prevState);
                          }}
                        />
                      )}
                    />
                  </div>
                </th>
                <th className="border-b border-slate-300 py-4 pl-4 text-left">
                  <div className="flex items-center gap-1.5">
                    <span>End Date</span>
                    <IconButton
                      HeroIcon={() => (
                        <ArrowsUpDownIcon
                          className="ml-1 mb-1"
                          onClick={() => {
                            setSortKeyForCourse(CourseSortKey.EndDate);
                            setSortDirection((prevState) => !prevState);
                          }}
                        />
                      )}
                    />
                  </div>
                </th>
                <th className="border-b border-slate-300 py-4 pl-4 text-left" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7}>
                  {courses?.length === 0 && <NoResults></NoResults>}
                </td>
              </tr>
              {courses?.map((course) => (
                <tr key={course.node.id}>
                  <td className="border-b border-slate-300 py-4 pl-4 text-left">
                    {course.node.name}
                  </td>
                  <td className="border-b border-slate-300 py-4 pl-4 text-left">
                    {course.node.defaultLocation?.name}
                  </td>
                  <td className="border-b border-slate-300 py-4 pl-4 text-left">
                    {course.node.defaultLocation?.cluster?.name}
                  </td>
                  <td className="border-b border-slate-300 py-4 pl-4 text-left">
                    <div className="relative flex items-center">
                      {course.node.courseManagers.edges.map(
                        (courseManager, i) => {
                          return i < 3 ? (
                            <span
                              key={courseManager.cursor}
                              className={classNames(
                                'absolute flex h-10 w-10 items-center justify-center rounded-full',
                                BACKGROUND_COLORS[
                                  Math.floor(
                                    Math.random() * BACKGROUND_COLORS.length
                                  )
                                ]
                              )}
                              style={{ left: i * 20, zIndex: 3 - i }}
                            >
                              {courseManager.node.user.avatar ? (
                                <Image
                                  className="grow object-cover"
                                  src={courseManager.node.user.avatar}
                                  alt="profile placeholder"
                                  width={24}
                                  height={24}
                                />
                              ) : (
                                <span
                                  className="avatarLetter grow self-center text-center text-white"
                                  title={
                                    courseManager.node.user.firstName +
                                    ' ' +
                                    courseManager.node.user.lastName
                                  }
                                >
                                  {courseManager.node.user.firstName?.[0]}
                                  {courseManager.node.user.lastName?.[0]}
                                </span>
                              )}
                            </span>
                          ) : (
                            ''
                          );
                        }
                      )}
                      {course.node.courseManagers.edges.length > 3 ? (
                        <p style={{ position: 'absolute', right: '-10px' }}>
                          +{course.node.courseManagers.edges.length - 3}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                  </td>
                  <td className="border-b border-slate-300 py-4 pl-4 text-left">
                    {course.node?.firstSessionStartDate}
                  </td>
                  <td className="border-b border-slate-300 py-4 pl-4 text-left">
                    {course.node?.lastSessionEndDate}
                  </td>
                  <td className="border-b border-slate-300 p-4 text-left">
                    <div className="flex gap-2.5">
                      <NavLink
                        href={`/manage/course/${course.node.id}`}
                        className="flex"
                      >
                        <IconButton
                          HeroIcon={() => (
                            <PencilIcon className="ml-1 mb-1" title="Edit" />
                          )}
                        />
                      </NavLink>
                      <IconButton
                        HeroIcon={() => (
                          <TrashIcon
                            style={{ color: '#6B7280' }}
                            className="h-6 w-6 hover:cursor-pointer"
                            title="Delete"
                            onClick={() => {
                              setCourseToDelete(course.node);
                            }}
                          />
                        )}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.courses?.pageInfo?.hasNextPage && (
          <div className="px-3 py-3 text-center">
            {loading ? (
              <Spinner />
            ) : (
              <button className="inline-flex" onClick={handleLoadMoreClick}>
                <IconButton
                  HeroIcon={() => (
                    <ChevronDoubleDownIcon className="h-5 w-5 text-brand-main" />
                  )}
                />
                <p className="body1 text-brand-main">Load More</p>
              </button>
            )}
          </div>
        )}
      </div>
      {courseToDelete != null && (
        <Modal
          onClose={() => {
            setCourseToDelete(null);
          }}
        >
          <div className="flex flex-col gap-y-2 px-3 pb-2">
            <h3>{courseToDelete.name}</h3>
            Are you sure you want to delete this course?
            {courseDeleteLoading ? (
              <Spinner />
            ) : (
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setCourseToDelete(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    courseDelete({
                      variables: {
                        input: {
                          clientMutationId: uuidv4(),
                          courseId: courseToDelete.id,
                        },
                      },
                      update: (cache, mutationResult) => {
                        const normalizedId = cache.identify({
                          id: courseToDelete.id,
                          __typename: 'Course',
                        });
                        cache.evict({ id: normalizedId });
                        cache.gc();
                      },
                    });
                    setCourseToDelete(null);
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
            {courseDeleteError != null && (
              <span className="text-red-400">{courseDeleteError.message}</span>
            )}
          </div>
        </Modal>
      )}
    </AppLayout>
  );
};

export default CoursePage;
