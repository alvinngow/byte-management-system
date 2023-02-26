import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import React from 'react';

import { CourseSortKey } from '../../../gen/graphql/resolvers';
import Card from '../../components/Card';
import Input from '../../components/Input';
import NavLink from '../../components/NavLink';
import Select, { SelectItem } from '../../components/Select';
import SEO from '../../components/SEO';
import VolunteerNavHeader from '../../components/VolunteerNavHeader';
import * as CoursesQuery from '../../graphql/frontend/queries/CoursesQuery';
import AppLayout from '../../layouts/AppLayout';

interface CoursesType {
  [key: string]: any;
  courseId: string;
  courseTitle: string;
  courseLocation: string | undefined;
  courseCoverImage: string;
  courseStartDate: string;
}

const DiscoverCoursesPage: NextPage = function () {
  const { data } = useQuery<CoursesQuery.Data, CoursesQuery.Variables>(
    CoursesQuery.Query,
    {
      variables: {
        sortKey: CourseSortKey.LocationName,
      },
    }
  );

  const courses = data?.courses.edges;

  const Courses = React.useMemo(() => {
    const emptyArray: CoursesType[] = [];
    if (courses != null) {
      courses.map((course) => {
        const sortedCourse = {
          courseId: course.node.id,
          courseTitle: course.node.name,
          courseLocation: course.node.defaultLocation?.name,
          courseCoverImage: course.node.coverImage,
          courseStartDate: course.node.sessions?.edges[0].node.startDate,
        };
        emptyArray.push(sortedCourse);
      });
      return emptyArray;
    }
  }, [courses]);

  const FilterByShowcase: React.FC = function () {
    const items = React.useMemo<SelectItem[]>(() => {
      return [
        {
          label: 'All',
          value: 'All',
        },
        {
          label: 'North',
          value: 'North',
        },
        {
          label: 'South',
          value: 'South',
        },
        {
          label: 'East',
          value: 'East',
        },
        {
          label: 'West',
          value: 'West',
        },
      ];
    }, []);

    const [value, setValue] = React.useState('All');

    return (
      <Select
        items={items}
        value={value}
        label="Region"
        onChange={setValue}
        className="w-full"
      />
    );
  };

  return (
    <AppLayout>
      <VolunteerNavHeader />

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
            <Input label="Search" placeholder={'eg: Art Course'} />
          </form>
          <div className="relative basis-1/4">
            <FilterByShowcase />
          </div>
        </div>

        <div className="mx-5 mb-8 grid w-auto grid-cols-2 gap-4 sm:mx-auto sm:w-[80vw] md:shrink-0 md:grid-cols-3 lg:grid-cols-4">
          {Courses?.map((Course) => (
            <div key={Course.courseId}>
              <NavLink href={`course/${Course.courseId}`}>
                <Card
                  title={Course.courseTitle}
                  coverImage={Course.courseCoverImage}
                  className="h-full"
                >
                  <div className="px-4 pb-4">
                    <p className="font-sm text-gray-600">
                      {Course.courseLocation}
                    </p>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1 text-left text-xs text-gray-400">
                        From {Course.courseStartDate}
                      </p>
                      <p className="col-span-1 text-right text-xs text-gray-400">
                        7000 Sessions
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
