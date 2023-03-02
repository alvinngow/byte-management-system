import { useQuery } from '@apollo/client';
import {
  ArrowsUpDownIcon,
  ChevronDoubleDownIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

import {
  CourseDateFiltering,
  CourseFiltering,
  CourseSortKey,
  Maybe,
} from '../../../../gen/graphql/resolvers';
import Button from '../../../components/Button';
import IconButton from '../../../components/IconButton';
import Input from '../../../components/Input';
import NavBar from '../../../components/NavBar';
import NavHeader from '../../../components/NavHeader';
import NavLink from '../../../components/NavLink';
import Select, { SelectItem } from '../../../components/Select';
import SEO from '../../../components/SEO';
import * as CoursesQuery from '../../../graphql/frontend/queries/CoursesQuery';
import useDebounce from '../../../hooks/useDebounce';
import AppLayout from '../../../layouts/AppLayout';

interface sortedCoursesType {
  [key: string]: any;
  courseId: string;
  courseTitle: string;
  courseLocation: string | undefined;
  courseRegion: string | undefined;
  courseTrainer: string;
  courseStartDate: Maybe<string> | undefined;
  courseEndDate: Maybe<string> | undefined;
}

const CoursePage: React.FC = function () {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  const [sortKeyForCourse, setSortKeyForCourse] = React.useState<
    | CourseSortKey.Name
    | CourseSortKey.LocationName
    | CourseSortKey.StartDate
    | CourseSortKey.EndDate
  >();

  const [sortDirection, setSortDirection] = React.useState(false);

  const [filterForCourse, setFilterForCourse] = React.useState<
    CourseDateFiltering.Upcoming | CourseDateFiltering.Past
  >();

  const { data, fetchMore, refetch } = useQuery<
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

  const courses = data?.courses.edges;

  const Courses = React.useMemo(() => {
    const emptyArray: sortedCoursesType[] = [];
    if (courses != null) {
      courses.map((course) => {
        const sortedCourse = {
          courseId: course.node.id,
          courseTitle: course.node.name,
          courseLocation: course.node.defaultLocation?.name,
          courseRegion: course.node.defaultLocation?.cluster?.name,
          courseTrainer:
            course.node.courseManagers.edges[0]?.node.user.firstName +
            ' ' +
            course.node.courseManagers.edges[0]?.node.user.lastName,
          courseStartDate: course.node?.firstSessionStartDate,
          courseEndDate: course.node?.lastSessionEndDate,
        };
        emptyArray.push(sortedCourse);
      });
      return emptyArray;
    }
  }, [courses]);

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

      <div className="my-6 mx-5 flex w-auto justify-between sm:mx-auto sm:w-11/12 md:w-4/5">
        <h3>Courses</h3>
        <Button label="+ ADD CLASS" href={`/manage/course/add`} />
      </div>
      <div className="mx-5 flex w-auto justify-between sm:mx-auto sm:w-11/12 md:w-4/5">
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
                    Region
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
                {Courses?.map((course) => (
                  <tr key={course.courseId}>
                    <td className="border-b border-slate-300 py-4 pl-4 text-left">
                      {course.courseTitle}
                    </td>
                    <td className="border-b border-slate-300 py-4 pl-4 text-left">
                      {course.courseLocation}
                    </td>
                    <td className="border-b border-slate-300 py-4 pl-4 text-left">
                      {course.courseRegion}
                    </td>
                    <td className="border-b border-slate-300 py-4 pl-4 text-left">
                      {course.courseTrainer}
                    </td>
                    <td className="border-b border-slate-300 py-4 pl-4 text-left">
                      {course.courseStartDate}
                    </td>
                    <td className="border-b border-slate-300 py-4 pl-4 text-left">
                      {course.courseEndDate}
                    </td>
                    <td className="border-b border-slate-300 p-4 text-left">
                      <div className="flex gap-2.5">
                        <NavLink
                          href={`/manage/course/${course.courseId}`}
                          className="flex"
                        >
                          <IconButton
                            HeroIcon={() => (
                              <PencilIcon className="ml-1 mb-1" />
                            )}
                          />
                        </NavLink>
                        <IconButton
                          HeroIcon={() => <TrashIcon className="ml-1 mb-1" />}
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
              <button className="inline-flex">
                <IconButton
                  HeroIcon={() => (
                    <ChevronDoubleDownIcon className="h-5 w-5 text-brand-main" />
                  )}
                />
                <p className="body1 text-brand-main">Load More</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default CoursePage;
