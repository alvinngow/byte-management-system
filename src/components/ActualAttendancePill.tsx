import { Attendance } from '@bims/graphql/schema';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React from 'react';

import IconButton from './IconButton';
import ToolTip from './ToolTip';

const classNameMap: Record<Attendance, string> = {
  [Attendance.Attend]: 'bg-blue-100 text-brand-main',
  [Attendance.Absent]: 'bg-amber-50 text-amber-500',
};

const textMap: Record<Attendance, JSX.Element | string> = {
  [Attendance.Attend]: 'Attended',
  [Attendance.Absent]: (
    <ToolTip
      buttonText="Absent"
      toolTipText="If you can&#39;t make it to the class, please kindly cancel your
            session in advance."
    >
      <IconButton
        HeroIcon={() => (
          <InformationCircleIcon className="ml-1 mb-1 bg-amber-50 text-amber-500" />
        )}
      />
    </ToolTip>
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
