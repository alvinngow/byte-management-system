import { useQuery } from '@apollo/client';
import { DateTime } from 'luxon';
import { NextPage } from 'next';
import React from 'react';

import {
  CourseDateFiltering,
  CourseFiltering,
} from '../../../gen/graphql/operations';
import Card from '../../components/Card';
import Input from '../../components/Input';
import NavLink from '../../components/NavLink';
import Select, { SelectItem } from '../../components/Select';
import SEO from '../../components/SEO';
import * as CoursesQuery from '../../graphql/frontend/queries/CoursesQuery';
import useDebounce from '../../hooks/useDebounce';
import AppLayout from '../../layouts/AppLayout';

const DiscoverCoursesPage: NextPage = function () {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  const [filterForRegion, setFilterForRegion] = React.useState();

  const variables = React.useMemo<CoursesQuery.Variables>(() => {
    const filter: CourseFiltering = { searchTerm: debouncedSearchTerm };
    filter.date = CourseDateFiltering.Upcoming;
    filter.locationClusterID = filterForRegion;
    return {
      filter,
    };
  }, [debouncedSearchTerm, filterForRegion]);

  const { data } = useQuery<CoursesQuery.Data, CoursesQuery.Variables>(
    CoursesQuery.Query,
    {
      variables,
    }
  );

  const courses = data?.courses.edges;

  const FilterByShowcase: React.FC = function () {
    const items = React.useMemo<SelectItem[]>(() => {
      return [
        {
          label: 'All',
        },
        {
          label: 'North-East',
          value: '7f3db8a4-fc16-4071-bd69-88ee60b92ace',
        },
        {
          label: 'North',
          value: 'd8bf4880-75d8-4443-869a-d9d96c3a5149',
        },
        {
          label: 'Central',
          value: '9faa98be-d88f-4a15-8c04-b369033e2510',
        },
        {
          label: 'West',
          value: '7883dc25-e051-4a1d-a2e9-7fb03d10c516',
        },
        {
          label: 'East',
          value: 'd025b461-db3c-4b39-89e9-971d37ef8baa',
        },
      ];
    }, []);

    const value = filterForRegion;

    return (
      <Select
        items={items}
        value={value}
        label="Region"
        onChange={(value) => {
          setFilterForRegion(value);
        }}
        className="w-full"
      />
    );
  };

  return (
    <AppLayout>
      <SEO title="Discover Courses" />

      <div>
        <div className="mx-5 mt-6 mb-11 w-auto sm:mx-auto sm:w-[80vw]">
          <h3 className="mb-11 mt-6">
            <span className="font-bold">Discover Causes (Courses)</span>
            &nbsp;That Matter To You
          </h3>
        </div>
        <div className="mx-5 mb-8 flex w-auto flex-col gap-4 sm:mx-auto sm:w-[80vw] md:flex-row">
          <form className="basis-3/4">
            <label htmlFor="default-search"></label>
            <Input
              label="Search"
              placeholder={'eg: Art Course'}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </form>
          <div className="relative basis-1/4">
            <FilterByShowcase />
          </div>
        </div>

        <div className="mx-5 mb-8 grid w-auto grid-cols-2 gap-4 sm:mx-auto sm:w-[80vw] md:shrink-0 md:grid-cols-3 lg:grid-cols-4">
          {courses?.map((course) => (
            <div key={course.node.id}>
              <NavLink href={`course/${course.node.id}`}>
                <Card
                  title={course.node.name}
                  coverImage={course.node.coverImage}
                  className="h-full"
                >
                  <div className="px-4 pb-4">
                    <p className="font-sm text-gray-600">
                      {course.node.defaultLocation?.name}
                    </p>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1 text-left text-xs text-gray-400">
                        From{' '}
                        {DateTime.fromISO(
                          `${course.node.firstSessionStartDate}`
                        ).toLocaleString(DateTime.DATE_MED)}
                      </p>
                      <p className="col-span-1 text-right text-xs text-gray-400">
                        {course.node.sessions.totalCount} sessions
                      </p>
                    </div>
                  </div>
                </Card>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default DiscoverCoursesPage;
