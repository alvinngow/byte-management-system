import { gql } from '@apollo/client';

import { CourseConnection } from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const USER_ID_USER = '3e4a7c05-9ec7-46d9-93c1-69e47eb4e803';

interface Data {
  courses: CourseConnection | null;
}

interface Variables {
  first?: number;
  after?: string;
}

const testServer = setupApolloServer();

describe('courses', () => {
  test('returns list of courses', async () => {
    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          query CoursesQuery($first: Int, $after: String) {
            courses(first: $first, after: $after) {
              edges {
                node {
                  id
                }
              }
            }
          }
        `,
      },
      {
        contextValue: buildMockContext(USER_ID_USER),
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind !== 'single') {
      throw new Error();
    }

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).not.toBeNull();

    if (response.body.singleResult.data == null) {
      throw new Error();
    }

    expect(
      response.body.singleResult.data.courses?.edges.length
    ).toBeGreaterThan(0);
  });

  test('first parameter works', async () => {
    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          query CoursesQuery($first: Int, $after: String) {
            courses(first: $first, after: $after) {
              edges {
                node {
                  id
                }
              }
            }
          }
        `,
        variables: {
          first: 2,
        },
      },
      {
        contextValue: buildMockContext(USER_ID_USER),
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind !== 'single') {
      throw new Error();
    }

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).not.toBeNull();

    if (response.body.singleResult.data == null) {
      throw new Error();
    }

    expect(response.body.singleResult.data.courses?.edges.length).toBe(2);
  });
});
