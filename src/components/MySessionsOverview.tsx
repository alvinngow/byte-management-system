import { useQuery } from '@apollo/client';
import { CurrentUserOverviewType } from '@bims/graphql/schema';
import React from 'react';

import * as MeSessionOverview from '../graphql/frontend/queries/MeSessionOverviewQuery';
import ClassOverviewCard from './ClassOverviewCard';
import CrossPresentationChartLineIcon from './icons/CrossPresentationChartLineIcon';
import HoursAccumulatedIcon from './icons/HoursAccumulatedIcon';
import TickPresentationChartLineIcon from './icons/TickPresentationChartLineIcon';
import UpcomingSessionsIcon from './icons/UpcomingSessionsIcon';
import Spinner from './Spinner';

const IconMap: Record<CurrentUserOverviewType, React.ReactNode> = {
  [CurrentUserOverviewType.SessionsUpcoming]: <UpcomingSessionsIcon />,
  [CurrentUserOverviewType.SessionsAttended]: <TickPresentationChartLineIcon />,
  [CurrentUserOverviewType.HoursAccumulated]: <HoursAccumulatedIcon />,
  [CurrentUserOverviewType.SessionsCancelled]: (
    <CrossPresentationChartLineIcon />
  ),
};

const TextMap: Record<CurrentUserOverviewType, string> = {
  [CurrentUserOverviewType.SessionsUpcoming]: 'Upcoming Sessions',
  [CurrentUserOverviewType.SessionsAttended]: 'Attended Sessions',
  [CurrentUserOverviewType.HoursAccumulated]: 'Hours Accumulated',
  [CurrentUserOverviewType.SessionsCancelled]: 'Cancelled Sessions (beta)',
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
