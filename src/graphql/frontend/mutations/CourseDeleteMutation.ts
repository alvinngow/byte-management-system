import { gql } from '@apollo/client';

import {
  CourseDeleteInput,
  CourseDeletePayload,
} from '../../../../gen/graphql/resolvers';

export interface Data {
  courseDelete: CourseDeletePayload;
}

export interface Variables {
  input: CourseDeleteInput;
}

export const Mutation = gql`
  mutation CourseDeleteMutation($input: CourseDeleteInput!) {
    courseDelete(input: $input) {
      clientMutationId
      ok
    }
  }
`;
