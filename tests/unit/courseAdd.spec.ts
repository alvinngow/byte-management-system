import { gql } from '@apollo/client';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { CourseAddInput, CourseAddPayload } from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const testServer = setupApolloServer();

interface Data {
  courseAdd: CourseAddPayload;
}

interface Variables {
  input: CourseAddInput;
}

const USER_ID_COMMITTEE_MEMBER = '3a9a70e3-6116-4d33-b9ac-9da0de9c2778';

describe('courseAdd', () => {
  test('works', async () => {
    const clientMutationId = uuidv4();
    const courseName = `jest-${uuidv4()}`;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: gql`
          mutation CourseAddMutation($input: CourseAddInput!) {
            courseAdd(input: $input) {
              clientMutationId
              course {
                id
                name
              }
            }
          }
        `,
        variables: {
          input: {
            clientMutationId,
            courseName,
            courseDescription: 'Course created by unit test',
            courseDescriptionPrivate: 'Hi there volunteer',
            courseSubtitle: 'Amazing unit test course',
            courseDefaultStartTime: DateTime.now().toISOTime({
              includeOffset: true,
            }),
            courseDefaultEndTime: DateTime.now().toISOTime({
              includeOffset: true,
            }),
            locationName: 'ABC Building',
            locationDescription: '',
            locationAddress: '123 ABC Street',
            locationLat: 1,
            locationLng: 103,
            locationUnit: '#01-01',
            locationClusterId: 'd8bf4880-75d8-4443-869a-d9d96c3a5149',
          },
        },
      },
      {
        contextValue: buildMockContext(USER_ID_COMMITTEE_MEMBER),
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

    expect(response.body.singleResult.data.courseAdd.clientMutationId).toBe(
      clientMutationId
    );
    expect(response.body.singleResult.data.courseAdd.course.name).toBe(
      courseName
    );
  });
});
