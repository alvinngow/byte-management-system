import { gql } from '@apollo/client';

import { User } from '../../../../gen/graphql/resolvers';

export type Data = User;

export const Fragment = gql`
  fragment UserFragment on User {
    id
    email
    firstName
    lastName
  }
`;
