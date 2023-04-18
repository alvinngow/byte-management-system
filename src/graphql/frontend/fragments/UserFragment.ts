import { gql } from '@apollo/client';
import { User } from '@bims/graphql/schema';

export type Data = User;

export const Fragment = gql`
  fragment UserFragment on User {
    id
    email
    firstName
    lastName
  }
`;
