import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { HTMLAttributes, useState } from 'react';

import styles from '../styles/component_styles/AttendanceButton.module.css';

interface PropType extends HTMLAttributes<HTMLElement> {}

const AttendanceButton: React.FC<React.PropsWithChildren<PropType>> = (
  props
) => {
  const [attendanceState, setAttendanceState] = useState<boolean | undefined>(
    undefined
  );

  function updateAttendaceState(attendance: boolean) {
    if (attendanceState === attendance) {
      setAttendanceState(undefined);
    } else {
      setAttendanceState(attendance);
    }
  }
  return (
    <div>
      <div className={`${styles['icons-slot']} flex`}>
        <CheckIcon
          className={`${attendanceState ? styles.present : ''} cursor-pointer`}
          onClick={() => updateAttendaceState(true)}
        ></CheckIcon>
        <XMarkIcon
          className={`${
            attendanceState === false ? styles.absent : ''
          } cursor-pointer`}
          onClick={() => updateAttendaceState(false)}
        ></XMarkIcon>
      </div>
    </div>
  );
};

export default AttendanceButton;
