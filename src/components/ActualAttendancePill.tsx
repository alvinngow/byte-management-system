import 'react-tooltip/dist/react-tooltip.css';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React from 'react';
import { Tooltip } from 'react-tooltip';

import { Attendance } from '../../gen/graphql/resolvers';
import IconButton from './IconButton';

const classNameMap: Record<Attendance, string> = {
  [Attendance.Attend]: 'bg-blue-100 text-brand-main',
  [Attendance.Absent]: 'bg-amber-50 text-amber-500',
};

const textMap: Record<Attendance, JSX.Element | string> = {
  [Attendance.Attend]: 'Attended',
  [Attendance.Absent]: (
    <>
      <a id="warning-message" className="flex">
        Absent
        <IconButton
          HeroIcon={() => (
            <InformationCircleIcon className="ml-1 mb-1 bg-amber-50 text-amber-500" />
          )}
        />
      </a>
      <Tooltip
        anchorSelect="#warning-message"
        place="right"
        style={{
          width: '160px',
          whiteSpace: 'normal',
          padding: '15px 16px',
          borderRadius: '10px',
          background: 'rgb(75 85 99)',
        }}
      >
        If you can&#39;t make it to the class, please kindly cancel your session
        in advance.
      </Tooltip>
    </>
  ),
};

interface Props {
  actualAttendance: Attendance | null;
}

const ActualAttendancePill: React.FC<Props> = function (props) {
  const { actualAttendance } = props;

  return (
    <div
      className={classNames(
        'd-flex inline-flex items-center rounded-2xl py-2 px-2.5 text-sm font-medium',
        actualAttendance != null
          ? classNameMap[actualAttendance]
          : 'bg-gray-100 text-gray-500'
      )}
    >
      {actualAttendance != null ? textMap[actualAttendance] : 'Pending'}
    </div>
  );
};

export default ActualAttendancePill;
