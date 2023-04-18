import { InMemoryCacheConfig } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { StrictTypedTypePolicies } from '@bims/graphql/apollo-helpers';

const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      users: relayStylePagination(),
      courses: relayStylePagination(),
      schools: relayStylePagination(),
      locations: relayStylePagination(),
      locationClusters: relayStylePagination(),
    },
  },
  Course: {
    fields: {
      courseManagers: relayStylePagination(),
      sessions: relayStylePagination(),
    },
  },
  Session: {
    fields: {
      attendees: relayStylePagination(),
    },
  },
  CurrentUser: {
    fields: {
      sessionAttendees: relayStylePagination(),
    },
  },
  LocationCluster: {
    fields: {
      locations: relayStylePagination(),
    },
  },
};

export const cacheConfig: InMemoryCacheConfig = {
  typePolicies,
};
