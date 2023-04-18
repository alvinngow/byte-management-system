import { gql, useQuery } from '@apollo/client';
import { CurrentUser } from '@bims/graphql/schema';

export interface Data {
  me: CurrentUser | null;
}

export const Query = gql`
  query MeQuery {
    me {
      id
      role
    }
  }
`;

export default function useCurrentUser() {
  const { data, loading, error } = useQuery<Data>(Query);

  return {
    me: data?.me,
    loading,
    error,
  };
}
