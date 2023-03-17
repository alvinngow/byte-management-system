import { useQuery } from '@apollo/client';
import { DateTime } from 'luxon';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

import {
  CourseDateFiltering,
  CourseFiltering,
} from '../../../gen/graphql/operations';
import { LocationClusterEdge } from '../../../gen/graphql/resolvers';
import Card from '../../components/Card';
import Input from '../../components/Input';
import NavLink from '../../components/NavLink';
import Select, { SelectItem } from '../../components/Select';
import SEO from '../../components/SEO';
import Spinner from '../../components/Spinner';
import * as CoursesQuery from '../../graphql/frontend/queries/CoursesQuery';
import useDebounce from '../../hooks/useDebounce';
import AppLayout from '../../layouts/AppLayout';

interface FilterByShowcaseProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  locationClusterEdges: LocationClusterEdge[];
}

const FilterByShowcase: React.FC<FilterByShowcaseProps> = function (props) {
  const { value, onChange, locationClusterEdges } = props;

  const items = React.useMemo<SelectItem[]>(() => {
    return [
      {
        label: 'All',
        value: undefined,
      },
      ...locationClusterEdges.map((edge) => {
        return {
          label: edge.node.name,
          value: edge.node.id,
        };
      }),
    ];
  }, [locationClusterEdges]);

  return (
    <Select
      items={items}
      value={value}
      label="Region"
      onChange={(value) => {
        onChange(value);
      }}
      className="w-full"
    />
  );
};

const DiscoverCoursesPage: NextPage = function () {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  const [filterForRegion, setFilterForRegion] = React.useState<
    string | undefined
  >(undefined);

  const variables = React.useMemo<CoursesQuery.Variables>(() => {
    const filter: CourseFiltering = {
      searchTerm: debouncedSearchTerm,
      date: CourseDateFiltering.Upcoming,
      locationClusterID: filterForRegion,
    };

    return {
      filter,
    };
  }, [debouncedSearchTerm, filterForRegion]);

  const { data, loading, refetch } = useQuery<
    CoursesQuery.Data,
    CoursesQuery.Variables
  >(CoursesQuery.Query, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const courses = data?.courses.edges;
  const locationClusterEdges = data?.locationClusters?.edges ?? [];

  React.useEffect(() => {
    refetch();
  }, [variables, refetch]);

  return (
    <AppLayout>
      <SEO title="Discover Courses" />

      <div>
        <div className="mt-6 mb-11">
          <div className="mb-11 mt-6 flex items-center gap-x-4">
            <h3>
              <span className="font-bold">Discover Causes (Courses)</span>
              &nbsp;That Matter To You
            </h3>
            {loading && <Spinner />}
          </div>
        </div>
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="basis-3/4">
            <label htmlFor="default-search"></label>
            <Input
              label="Search"
              placeholder={'eg: Art Course'}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="relative basis-1/4">
            <FilterByShowcase
              value={filterForRegion}
              onChange={setFilterForRegion}
              locationClusterEdges={locationClusterEdges}
            />
          </div>
        </div>

        {courses?.length === 0 && (
          <div className="flex w-full flex-col items-center">
            <div className="relative h-64 w-64">
              <Image
                src="/empty.png"
                className="object-contain"
                fill
                alt="Drawing of a man with questions"
              />
            </div>
            <span className="text-gray-400">
              There are no courses to display.
            </span>
          </div>
        )}

        <div className="mb-8 grid grid-cols-2 gap-4 md:shrink-0 md:grid-cols-3 lg:grid-cols-4">
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
