import classNames from 'classnames';
import { DateTime } from 'luxon';
import React from 'react';

import { Session } from '../../../../gen/graphql/resolvers';

interface Props {
  session: Session;
}

const SessionRow: React.FC<Props> = function (props) {
  const { session } = props;

  return (
    <tr>
      <td className="border border-slate-300 py-4 pl-4 text-left">
        {DateTime.fromISO(session.startDate).toLocaleString(DateTime.DATE_MED)}
      </td>
      <td className="border border-slate-300 py-4 pl-4 text-left">
        {DateTime.fromISO(session.startTime).toLocaleString(
          DateTime.TIME_SIMPLE
        )}
      </td>
      <td className="border border-slate-300 py-4 pl-4 text-left">
        {DateTime.fromISO(session.endTime).toLocaleString(DateTime.TIME_SIMPLE)}
      </td>
      <td
        className={classNames('border border-slate-300 py-4 pl-4 text-left', {
          'text-neutral-400':
            session.volunteerSlotCount === 0 ||
            session.volunteerSlotCount == null,
        })}
      >
        {session.volunteerSlotCount || 'UNLIMITED'}
      </td>
    </tr>
  );
};

export default SessionRow;