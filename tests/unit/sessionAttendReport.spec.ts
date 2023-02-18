import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import {
  Attendance,
  SessionAttendReportInput,
  SessionAttendReportPayload,
} from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const USER_ID_COMMITTEE_MEMBER = '3a9a70e3-6116-4d33-b9ac-9da0de9c2778';
const USER_ID_VOLUNTEER = '28edcad7-da77-456c-b2a1-9e20470e058a';
const SESSION_ID_SEEDED = '5141c5c9-ad0a-451a-bbba-409dc0724cf0';

const testServer = setupApolloServer();

interface Data {
  sessionAttendReport: SessionAttendReportPayload;
}

interface Variables {
  input: SessionAttendReportInput;
}

const Mutation = gql`
  mutation SessionAttendReportMutation($input: SessionAttendReportInput!) {
    sessionAttendReport(input: $input) {
      clientMutationId
      sessionAttendee {
        id
        actualAttendance
      }
    }
  }
`;

describe('sessionAttendReport', () => {
  test('committee member can report on attendance', async () => {
    const clientMutationId = uuidv4();
    const actualAttendance = Attendance.NotAttending;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: Mutation,
        variables: {
          input: {
            clientMutationId,
            sessionId: SESSION_ID_SEEDED,
            userId: USER_ID_VOLUNTEER,
            actualAttendance,
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

    expect(
      response.body.singleResult.data.sessionAttendReport.clientMutationId
    ).toBe(clientMutationId);

    expect(
      response.body.singleResult.data.sessionAttendReport.sessionAttendee
        .actualAttendance
    ).toBe(actualAttendance);
  });

  test('volunteer cannot report on attendance', async () => {
    const clientMutationId = uuidv4();
    const actualAttendance = Attendance.NotAttending;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: Mutation,
        variables: {
          input: {
            clientMutationId,
            sessionId: SESSION_ID_SEEDED,
            userId: USER_ID_VOLUNTEER,
            actualAttendance,
          },
        },
      },
      {
        contextValue: buildMockContext(USER_ID_VOLUNTEER),
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind !== 'single') {
      throw new Error();
    }

    expect(response.body.singleResult.errors).not.toBeUndefined();
  });

  test('guest cannot report on attendance', async () => {
    const clientMutationId = uuidv4();
    const actualAttendance = Attendance.NotAttending;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: Mutation,
        variables: {
          input: {
            clientMutationId,
            sessionId: SESSION_ID_SEEDED,
            userId: USER_ID_VOLUNTEER,
            actualAttendance,
          },
        },
      },
      {
        contextValue: buildMockContext(),
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind !== 'single') {
      throw new Error();
    }

    expect(response.body.singleResult.errors).not.toBeUndefined();
  });
});
