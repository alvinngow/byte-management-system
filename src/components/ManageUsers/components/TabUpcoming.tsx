import { SessionAttendeeConnection } from '@bims/graphql/schema';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import React from 'react';

import IconButton from '../../IconButton';
import NavLink from '../../NavLink';

interface TabUpcomingProps {
  sessionAttendeeConnection: SessionAttendeeConnection;
  reverse: boolean;
  handleReverseToggle: React.MouseEventHandler;
}

const TabUpcoming: React.FC<TabUpcomingProps> = function (props) {
  const { sessionAttendeeConnection, reverse, handleReverseToggle } = props;

  return (
    <table className="subtitle2 w-full text-left">
      <thead className="subtitle2">
        <th className="flex items-center gap-1.5 whitespace-nowrap px-6 py-3">
          Date
          <IconButton
            HeroIcon={(props) => (
              <ArrowsUpDownIcon
                onClick={handleReverseToggle}
                className={classNames('h-5 w-5', {
                  'text-secondary': reverse,
                })}
              />
            )}
          />
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabUpcoming;
