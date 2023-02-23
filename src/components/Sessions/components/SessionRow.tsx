import {
  ClipboardDocumentCheckIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import React from 'react';

import { Session } from '../../../../gen/graphql/resolvers';
import Chip from '../../Chip';
import IconButton from '../../IconButton';

interface Props {
  session: Session;
  onEditClick: (session: Session) => void;
}

const SessionRow: React.FC<Props> = function (props) {
  const { session, onEditClick } = props;

  return (
    <tr className="border border-x-0 border-y-gray-200">
      <td className="py-4 pl-4 text-left xsm:whitespace-nowrap md:whitespace-normal">
        {DateTime.fromISO(session.startDate).toLocaleString(DateTime.DATE_MED)}
      </td>
      <td className="py-4 pl-4 text-left">
        {DateTime.fromISO(session.startTime).toLocaleString(
          DateTime.TIME_SIMPLE
        )}
      </td>
      <td className="py-4 pl-4 text-left">
        {DateTime.fromISO(session.endTime).toLocaleString(DateTime.TIME_SIMPLE)}
      </td>
      <td
        className={classNames('py-4 pl-4 text-left', {
          'text-neutral-400':
            session.volunteerSlotCount === 0 ||
            session.volunteerSlotCount == null,
        })}
      >
        {session.volunteerSlotCount || (
          <Chip scheme={'disabled'}>Unlimited</Chip>
        )}
      </td>
      <td className="py-4 pl-4 text-left xsm:pr-4 md:pr-0">
        <div className="flex gap-y-3 gap-x-2.5 xsm:flex-col md:flex-row ">
          <IconButton
            HeroIcon={() => <PencilIcon onClick={() => onEditClick(session)} />}
          />
          <IconButton HeroIcon={() => <ClipboardDocumentCheckIcon />} />
        </div>
      </td>
    </tr>
  );
};

export default SessionRow;
