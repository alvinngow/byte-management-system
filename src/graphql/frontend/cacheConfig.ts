import { InMemoryCacheConfig } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

export const cacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        users: relayStylePagination(),
      },
    },
  },
};
