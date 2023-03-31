import { useQuery } from '@apollo/client';
import React from 'react';

import { CurrentUserOverviewType } from '../../gen/graphql/resolvers';
import * as MeSessionOverview from '../graphql/frontend/queries/MeSessionOverviewQuery';
import ClassOverviewCard from './ClassOverviewCard';
import CrossPresentationChartLineIcon from './icons/CrossPresentationChartLineIcon';
import HoursAccumulatedIcon from './icons/HoursAccumulatedIcon';
import TickPresentationChartLineIcon from './icons/TickPresentationChartLineIcon';
import UpcomingCoursesIcon from './icons/UpcomingCoursesIcon';
import Spinner from './Spinner';

const IconMap: Record<CurrentUserOverviewType, React.ReactNode> = {
  [CurrentUserOverviewType.CoursesUpcoming]: <UpcomingCoursesIcon />,
  [CurrentUserOverviewType.CoursesAttended]: <TickPresentationChartLineIcon />,
  [CurrentUserOverviewType.HoursAccumulated]: <HoursAccumulatedIcon />,
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
  const { data, loading, refetch } = useQuery<MeSessionOverview.Data>(
    MeSessionOverview.Query,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  return (
    <div className="my-5 grid xsm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-300">
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
