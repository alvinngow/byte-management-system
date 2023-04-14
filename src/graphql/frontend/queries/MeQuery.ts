import { gql } from '@apollo/client';

import { CurrentUser } from '../../../../gen/graphql/resolvers';

export interface Data {
  me: CurrentUser | null;
}

export const Query = gql`
  query MeQuery {
    me {
      id
      email
      avatar
      firstName
      lastName
      mobileNo
      school {
        id
        name
      }
      role
      createdAt
      notifyNewCourse
      notifyNearNewCourse
      nearRegion
      notifyUpcomingSessions
      upcomingSessionTimeBefore
    }
  }
`;
