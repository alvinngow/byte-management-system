import { InMemoryCacheConfig } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

export const cacheConfig: InMemoryCacheConfig = {
  typePolicies: {
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
  },
};
