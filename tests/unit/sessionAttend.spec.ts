import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import {
  Attendance,
  SessionAttendInput,
  SessionAttendPayload,
} from '../../gen/graphql/resolvers';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const testServer = setupApolloServer();

interface Data {
  sessionAttend: SessionAttendPayload;
}

interface Variables {
  input: SessionAttendInput;
}

const Mutation = gql`
  mutation SessionAttendMutation($input: SessionAttendInput!) {
    sessionAttend(input: $input) {
      clientMutationId
      sessionAttendee {
        id
        indicatedAttendance
      }
    }
  }
`;

const USER_ID_VOLUNTEER = 'f1444b1d-4360-42d4-bc1b-c23cd5051fa4';
const SESSION_ID_SEEDED = 'ff6f6872-5f81-44ac-8978-848fdc6ed1ef';

describe('sessionAttend', () => {
  test('can indicate attendance for existing session', async () => {
    const clientMutationId = uuidv4();
    const indicatedAttendance = Attendance.Attending;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: Mutation,
        variables: {
          input: {
            clientMutationId,
            sessionId: SESSION_ID_SEEDED,
            indicatedAttendance,
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

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).not.toBeNull();

    if (response.body.singleResult.data == null) {
      throw new Error();
    }

    expect(response.body.singleResult.data.sessionAttend.clientMutationId).toBe(
      clientMutationId
    );

    expect(
      response.body.singleResult.data.sessionAttend.sessionAttendee
        .indicatedAttendance
    ).toBe(indicatedAttendance);
  });

  test('cannot indicate attendance for non-existent session', async () => {
    const clientMutationId = uuidv4();
    const indicatedAttendance = Attendance.Attending;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: Mutation,
        variables: {
          input: {
            clientMutationId,
            sessionId: 'completely-invalid-session-id',
            indicatedAttendance,
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

  test('cannot indicate attendance for guest', async () => {
    const clientMutationId = uuidv4();
    const indicatedAttendance = Attendance.Attending;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: Mutation,
        variables: {
          input: {
            clientMutationId,
            sessionId: SESSION_ID_SEEDED,
            indicatedAttendance,
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
