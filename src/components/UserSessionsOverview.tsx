import { useQuery } from '@apollo/client';
import { UserOverviewType } from '@bims/graphql/schema';
import React from 'react';

import * as UserQuery from '../graphql/frontend/queries/UserQuery';
import * as UserSessionOverview from '../graphql/frontend/queries/UserSessionsOverviewQuery';
import ClassOverviewCard from './ClassOverviewCard';
import CrossPresentationChartLineIcon from './icons/CrossPresentationChartLineIcon';
import HoursAccumulatedIcon from './icons/HoursAccumulatedIcon';
import TickPresentationChartLineIcon from './icons/TickPresentationChartLineIcon';
import UpcomingSessionsIcon from './icons/UpcomingSessionsIcon';
import Spinner from './Spinner';

const IconMap: Record<UserOverviewType, React.ReactNode> = {
  [UserOverviewType.SessionsUpcoming]: <UpcomingSessionsIcon />,
  [UserOverviewType.SessionsAttended]: <TickPresentationChartLineIcon />,
  [UserOverviewType.HoursAccumulated]: <HoursAccumulatedIcon />,
  [UserOverviewType.SessionsCancelled]: <CrossPresentationChartLineIcon />,
};

const TextMap: Record<UserOverviewType, string> = {
  [UserOverviewType.SessionsUpcoming]: 'Upcoming Sessions',
  [UserOverviewType.SessionsAttended]: 'Attended Sessions',
  [UserOverviewType.HoursAccumulated]: 'Hours Accumulated',
  [UserOverviewType.SessionsCancelled]: 'Cancelled Sessions (beta)',
};

interface Props {
  userId: string;
}

const UserSessionsOverview: React.FC<Props> = function (props) {
  const { userId } = props;

  const { data, loading } = useQuery<
    UserSessionOverview.Data,
    UserSessionOverview.Variables
  >(UserSessionOverview.Query, {
    variables: {
      id: userId,
    },
  });

  return (
    <div className="my-5 grid xsm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-gray-300">
      {loading && <Spinner />}
      {data?.user?.overview?.map((overview) => (
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

export default UserSessionsOverview;
