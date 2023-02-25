import { useQuery } from '@apollo/client';
import {
  ClockIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

import { CurrentUserOverviewType } from '../../gen/graphql/resolvers';
import * as MeSessionOverview from '../graphql/frontend/queries/MeSessionOverviewQuery';
import ClassOverviewCard from './ClassOverviewCard';
import CrossPresentationChartLineIcon from './icons/CrossPresentationChartLineIcon';
import TickPresentationChartLineIcon from './icons/TickPresentationChartLineIcon';
import Spinner from './Spinner';

const IconMap: Record<CurrentUserOverviewType, React.ReactNode> = {
  [CurrentUserOverviewType.CoursesUpcoming]: (
    <PresentationChartLineIcon className="mr-2 h-4 w-6" />
  ),
  [CurrentUserOverviewType.CoursesAttended]: <TickPresentationChartLineIcon />,
  [CurrentUserOverviewType.HoursAccumulated]: (
    <ClockIcon className="mr-2 h-6 w-6" />
  ),
  [CurrentUserOverviewType.CoursesCancelled]: (
    <CrossPresentationChartLineIcon />
  ),
};

const TextMap: Record<CurrentUserOverviewType, string> = {
  [CurrentUserOverviewType.CoursesUpcoming]: 'Upcoming Courses',
  [CurrentUserOverviewType.CoursesAttended]: 'Attended Courses',
  [CurrentUserOverviewType.HoursAccumulated]: 'Hours Accumulated',
  [CurrentUserOverviewType.CoursesCancelled]: 'Cancelled Courses (beta)',
};

const MySessionsOverview: React.FC = function () {
  const { data, loading } = useQuery<MeSessionOverview.Data>(
    MeSessionOverview.Query
  );

  return (
    <div className="my-5 ml-20 mr-20 grid grid-cols-4 divide-x divide-gray-500">
      {loading && <Spinner />}
      {data?.me?.overview?.map((overview) => (
        <ClassOverviewCard
          key={overview.type}
          label={TextMap[overview.type]}
          currentData={overview.value.toString()}
          change={overview.change ?? null}
        >
          {IconMap[overview.type]}
        </ClassOverviewCard>
      ))}
    </div>
  );
};

export default MySessionsOverview;
