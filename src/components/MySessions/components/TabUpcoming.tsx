import { useMutation } from '@apollo/client';
import { ArrowsUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Attendance,
  SessionAttendeeConnection,
} from '../../../../gen/graphql/resolvers';
import * as SessionAttend from '../../../graphql/frontend/mutations/SessionAttendMutation';
import * as MeSessions from '../../../graphql/frontend/queries/MeSessionAttendeesQuery';
import SessionButton from '../../../pages/course/components/SessionButton';
import NavLink from '../../NavLink';

interface TabUpcomingProps {
  sessionAttendeeConnection: SessionAttendeeConnection;
  reverse: boolean;
  handleReverseToggle: React.MouseEventHandler;
}

const TabUpcoming: React.FC<TabUpcomingProps> = function (props) {
  const { sessionAttendeeConnection, reverse, handleReverseToggle } = props;

  const [sessionAttend] = useMutation<
    SessionAttend.Data,
    SessionAttend.Variables
  >(SessionAttend.Mutation);

  const updateIndicatedAttendance = React.useCallback(
    (indicatedAttendance: Attendance, sessionId: string) => {
      sessionAttend({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            indicatedAttendance,
            sessionId,
          },
        },
        refetchQueries: [MeSessions.Query],
      });
    },
    [sessionAttend]
  );
  return (
    <table className="text-secondary w-full text-left">
      <thead className="subtitle2">
        <th className="whitespace-nowrap px-6 py-3">
          Date
          <button
            className="ml-auto hover:cursor-pointer"
            onClick={handleReverseToggle}
          >
            <ArrowsUpDownIcon
              className={classNames('h-5 w-5', {
                'text-secondary': reverse,
              })}
            />
          </button>
        </th>
        <th className="whitespace-nowrap px-6 py-3">Start Time </th>
        <th className="whitespace-nowrap px-6 py-3">End Time </th>
        <th className="whitespace-nowrap px-6 py-3">Course Title </th>
        <th className="whitespace-nowrap px-6 py-3">Location </th>
      </thead>
      <tbody>
        {sessionAttendeeConnection.edges.length === 0 && (
          <tr>
            <td colSpan={6}>
              <div className="mt-4 flex justify-center">
                <span className="text-gray-400">
                  There are no sessions to display.
                </span>
              </div>
            </td>
          </tr>
        )}
        {sessionAttendeeConnection.edges.map((edge) => (
          <tr key={edge.node.id} className="border-b bg-white">
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.startDate).toLocaleString(
                DateTime.DATE_MED
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.startTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {DateTime.fromISO(edge.node.session.endTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-blue-500 underline">
              <NavLink href={`/course/${edge.node.session.course.slug}`}>
                {edge.node.session.course.name}
              </NavLink>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              {edge.node.session.location?.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
              <SessionButton
                size="sm"
                isApplyBtn={true}
                variant="secondary"
                onClick={() => {
                  const startDate = DateTime.fromISO(
                    edge.node.session.startDate
                  ).toLocaleString(DateTime.DATE_MED);

                  const startTime = DateTime.fromISO(
                    edge.node.session.startTime
                  ).toLocaleString(DateTime.TIME_SIMPLE);

                  const endTime = DateTime.fromISO(
                    edge.node.session.endTime
                  ).toLocaleString(DateTime.TIME_SIMPLE);

                  if (
                    !window.confirm(
                      `Are you sure you want to unapply for "${edge.node.session.course.name}" on ${startDate} between ${startTime} and ${endTime}?`
                    )
                  ) {
                    return;
                  }
                  updateIndicatedAttendance(
                    Attendance.Absent,
                    edge.node.sessionId
                  );
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabUpcoming;
