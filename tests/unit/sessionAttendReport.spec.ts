import { gql } from '@apollo/client';
import {
  Attendance,
  SessionAttendReportInput,
  SessionAttendReportPayload,
} from '@bims/graphql/schema';
import bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '../../src/db';
import { buildMockContext } from '../util/buildMockContext';
import setupApolloServer from '../util/setupApolloServer';

const USER_ID_COMMITTEE_MEMBER = '3a9a70e3-6116-4d33-b9ac-9da0de9c2778';
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
  const USER_ID_VOLUNTEER_GENERATED = uuidv4();
  const SESSION_ID_GENERATED = uuidv4();

  beforeAll(async () => {
    // Create a user
    const hashedPassword = await bcrypt.hash('password', 10);

    await prisma.user.create({
      data: {
        id: USER_ID_VOLUNTEER_GENERATED,
        email: `user-${uuidv4()}-unit-test@example.com`,
        pwHash: hashedPassword,
        firstName: 'John',
        lastName: 'Smith',
        mobileNo: '+65 91234567',
      },
    });

    // Create a course with session
    await prisma.course.create({
      data: {
        name: 'Unit Test Course',
        description: 'Course created by unit test',
        descriptionPrivate: 'Hi there volunteer',
        subtitle: 'Amazing unit test course',
        defaultStartTime: DateTime.fromISO('19:00:00').toJSDate(),
        defaultEndTime: DateTime.fromISO('21:30:00').toJSDate(),
        defaultLocation: {
          connectOrCreate: {
            where: {
              name: 'ABC Building',
            },
            create: {
              name: 'ABC Building',
              description: '',
              address: '123 ABC Street',
              lat: 1,
              lng: 103,
              unit: '#01-01',
              locationClusterId: 'd8bf4880-75d8-4443-869a-d9d96c3a5149',
            },
          },
        },
        sessions: {
          create: {
            id: SESSION_ID_GENERATED,
            name: '',
            description: '',
            startDate: DateTime.now().toJSDate(),
            endDate: DateTime.now().toJSDate(),
            sessionAttendees: {
              create: {
                userId: USER_ID_VOLUNTEER_GENERATED,
                indicatedAttendance: Attendance.Attend,
              },
            },
          },
        },
      },
    });
  });

  test('committee member can report on attendance', async () => {
    const clientMutationId = uuidv4();
    const actualAttendance = Attendance.Absent;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: Mutation,
        variables: {
          input: {
            clientMutationId,
            sessionId: SESSION_ID_GENERATED,
            userId: USER_ID_VOLUNTEER_GENERATED,
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
    const actualAttendance = Attendance.Absent;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: Mutation,
        variables: {
          input: {
            clientMutationId,
            sessionId: SESSION_ID_GENERATED,
            userId: USER_ID_VOLUNTEER_GENERATED,
            actualAttendance,
          },
        },
      },
      {
        contextValue: buildMockContext(USER_ID_VOLUNTEER_GENERATED),
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
    const actualAttendance = Attendance.Absent;

    const response = await testServer.executeOperation<Data, Variables>(
      {
        query: Mutation,
        variables: {
          input: {
            clientMutationId,
            sessionId: SESSION_ID_GENERATED,
            userId: USER_ID_VOLUNTEER_GENERATED,
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
