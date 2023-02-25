import classNames from 'classnames';
import React from 'react';

import { Attendance } from '../../gen/graphql/resolvers';

const classNameMap: Record<Attendance, string> = {
  [Attendance.Attend]: 'bg-blue-100 text-brand-main',
  [Attendance.Absent]: 'bg-amber-50 text-amber-500',
};

const textMap: Record<Attendance, string> = {
  [Attendance.Attend]: 'Attended',
  [Attendance.Absent]: 'Absent',
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
