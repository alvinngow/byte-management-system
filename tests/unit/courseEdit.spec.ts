import { gql } from '@apollo/client';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import {
  CourseAddInput,
  CourseAddPayload,
  CourseEditInput,
  CourseEditPayload,
} from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const testServer = setupApolloServer();

interface Data {
  courseEdit: CourseEditPayload;
}

interface Variables {
  input: CourseEditInput;
}

const USER_ID_COMMITTEE_MEMBER = '3a9a70e3-6116-4d33-b9ac-9da0de9c2778';

async function editCourseWithName(courseName: string) {
  const clientMutationId = uuidv4();

  const response = await testServer.executeOperation<Data, Variables>(
    {
      query: gql`
        mutation CourseEditMutation($input: CourseEditInput!) {
          courseEdit(input: $input) {
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
          courseId: '1bd97075-86e4-4137-b751-52b270e5caa9',
          courseName,
          courseDescription: 'Focus on basic machine learning concepts',
          courseDescriptionPrivate: '',
          courseDefaultStartTime: '02:00:00.000Z',
          courseDefaultEndTime: '04:00:00.000Z',
          locationAddress:
            'Block 238 Bukit Batok East Ave 5, #01-193, Singapore 650238',
          locationLat: 0,
          locationLng: 0,
          locationClusterId: '7883dc25-e051-4a1d-a2e9-7fb03d10c516',
          locationDescription: '',
          locationUnit: '#01-01',
          locationName: 'Bukit Batok East Zone 1 RC',
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

  expect(response.body.singleResult.data.courseEdit.clientMutationId).toBe(
    clientMutationId
  );
  expect(response.body.singleResult.data.courseEdit.course.name).toBe(
    courseName
  );
}

describe('courseEdit', () => {
  test('works', async () => {
    const originalCourseName = 'Machine Learning';
    const generatedCourseName = `jest-${uuidv4()}`;

    await editCourseWithName(generatedCourseName);
    await editCourseWithName(originalCourseName);
  });
});
