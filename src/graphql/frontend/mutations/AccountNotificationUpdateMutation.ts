import { gql } from '@apollo/client';
import {
  AccountNotificationUpdateInput,
  AccountNotificationUpdatePayload,
} from '@bims/graphql/schema';

export interface Data {
  accountNotificationUpdate: AccountNotificationUpdatePayload;
}

export interface Variables {
  input: AccountNotificationUpdateInput;
}

export const Mutation = gql`
  mutation AccountNotificationUpdateMutation(
    $input: AccountNotificationUpdateInput!
  ) {
    accountNotificationUpdate(input: $input) {
      clientMutationId
      user {
        id
        email
        notifyNewCourse
        notifyNearNewCourse
        nearRegion
        notifyUpcomingSessions
        upcomingSessionTimeBefore
      }
    }
  }
`;
