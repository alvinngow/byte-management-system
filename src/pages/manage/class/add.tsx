import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { NextPage } from 'next';
import React from 'react';

import ClassInfo from '../../../components/ClassInfo';
import NavHeader from '../../../components/NavHeader';
import NavLink from '../../../components/NavLink';
import TimeSlots from '../../../components/TimeSlots';
import AppLayout from '../../../layouts/AppLayout';

const AddClass: NextPage = function () {
  const [buttonSelected, setButtonSelected] = React.useState<
    'Class Information' | 'Timeslots' | 'Volunteer Attendees'
  >('Class Information');
  const handleButtonChange = (
    value: 'Class Information' | 'Timeslots' | 'Volunteer Attendees'
  ) => {
    setButtonSelected(value);
  };

  interface Button {
    name: 'Class Information' | 'Timeslots' | 'Volunteer Attendees';
    isrc: React.ElementType;
  }

  const RenderButtons: Button[] = [
    {
      name: 'Class Information',
      isrc: ClipboardDocumentListIcon,
    },
    {
      name: 'Timeslots',
      isrc: CalendarDaysIcon,
    },
    {
      name: 'Volunteer Attendees',
      isrc: UsersIcon,
    },
  ];

  return (
    <AppLayout>
      <NavHeader />
      <div className="mt-2 ml-2 sm:mt-6 sm:ml-14 lg:mt-12 lg:ml-28">
        <NavLink href="/manage/class">
          <div className="ml-6 mb-12 flex items-center px-2">
            <ArrowLeftIcon
              style={{ color: '#0F172A' }}
              className="mr-2.5 h-6 w-6"
            />
            <p>Back to Classes</p>
          </div>
        </NavLink>
        <div className="ml-6 flex flex-col">
          <p className="text-2xl font-semibold">Add Class</p>
          <div className="flex">
            <div className="mr-6 basis-1/4">
              {RenderButtons.map((button, i) => {
                return (
                  <button
                    key={'button' + i}
                    className={classNames(
                      {
                        'text-sky-600 bg-gray-100':
                          buttonSelected === button.name,
                        'text-gray-500': buttonSelected !== button.name,
                      },
                      'hover:text-sky-600 group mb-0.5 flex w-full items-center rounded-lg py-0.5 px-0.5 hover:bg-gray-100 sm:py-3 sm:px-4'
                    )}
                    onClick={() => handleButtonChange(button.name)}
                  >
                    <button.isrc
                      className={classNames(
                        {
                          'text-sky-600': buttonSelected === button.name,
                          'text-gray-500': buttonSelected !== button.name,
                        },
                        'group-hover:text-sky-600 h-6 w-6'
                      )}
                    />
                    <span
                      className={classNames('pl-1 group-hover:text-blue-500', {
                        'text-blue-500': buttonSelected === button.name,
                      })}
                    >
                      {button.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="basis-1/2">
              {buttonSelected === 'Class Information' && <ClassInfo />}
              {buttonSelected === 'Timeslots' && <TimeSlots />}
              {buttonSelected === 'Volunteer Attendees' && (
                <h1>Volunteer Attendees</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddClass;
