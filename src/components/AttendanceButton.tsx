import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { HTMLAttributes, useEffect, useState } from 'react';

import { Attendance } from '../../gen/graphql/operations';
import { Maybe } from '../../gen/graphql/resolvers';
import styles from '../styles/component_styles/AttendanceButton.module.css';

interface PropType extends HTMLAttributes<HTMLElement> {
  updateAttendance: (attendanceState: Attendance | null) => void;
  userAttendanceState: Maybe<Attendance> | undefined;
}

const AttendanceButton: React.FC<React.PropsWithChildren<PropType>> = (
  props
) => {
  const { updateAttendance, userAttendanceState } = props;

  function updateAttendanceState(attendance: Attendance | null) {
    if (userAttendanceState === attendance) {
      updateAttendance(null);
    } else {
      updateAttendance(attendance);
    }
  }

  const { className } = props;

  return (
    <div className={`${styles['icons-slot']} ${className} flex`}>
      <CheckIcon
        className={`${
          userAttendanceState == Attendance.Attend ? styles.present : ''
        } cursor-pointer hover:bg-gray-100`}
        onClick={() => updateAttendanceState(Attendance.Attend)}
      ></CheckIcon>
      <XMarkIcon
        className={`${
          userAttendanceState == Attendance.Absent ? styles.absent : ''
        } cursor-pointer hover:bg-gray-100`}
        onClick={() => updateAttendanceState(Attendance.Absent)}
      ></XMarkIcon>
    </div>
  );
};

export default AttendanceButton;
