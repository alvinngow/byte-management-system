// volunteer attendees.tsx page
import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import BackButton from '../../components/BackButton';
import ClassInfo from '../../components/CourseWizard/components/ClassInfo';
import { CourseWizardEvent } from '../../components/CourseWizard/machines/CourseWizardMachine';
import NavBar from '../../components/NavBar';
import NavHeader from '../../components/NavHeader';
import NavLink from '../../components/NavLink';
import VolunteerAttendees from '../../components/VolunteerAttendees';
import AppLayout from '../../layouts/AppLayout';

const SingleClassPage: NextPage = function () {
  const router = useRouter();
  const { id } = router.query;

  interface Button {
    name: string;
    isrc: React.ElementType;
  }

  const RenderButtons: Button[] = [
    {
      name: 'Class Information',
      isrc: ClipboardDocumentListIcon,
    },
    // {
    //   name: 'Timeslots',
    //   isrc: CalendarDaysIcon,
    // },
    {
      name: 'Sessions',
      isrc: CalendarDaysIcon,
    },
  ];

  const [activeTab, setActiveTab] = useState('Class Information');

  return (
    <>
      <AppLayout>
        <NavBar>
          <NavHeader />
          <div className="h-max bg-white text-slate-900">
            <div className="grid auto-rows-min px-20 pt-5">
              <div>
                <NavLink href="/manage/class">
                  <BackButton text="Back to Courses"></BackButton>
                </NavLink>
              </div>
              <div className="pt-3">
                <p className="text-3xl">Add Class</p>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  {RenderButtons.map((button, i) => {
                    return (
                      <button
                        key={'button' + i}
                        className={classNames(
                          'group block w-full rounded-lg pb-1 pt-2 pl-5 text-left',
                          {
                            'bg-gray-200': activeTab === button.name,
                            'bg-white': activeTab !== button.name,
                          }
                        )}
                        onClick={() => setActiveTab(button.name)}
                      >
                        <button.isrc
                          className={classNames(
                            'mb-1 inline-block h-6 w-6 group-hover:text-blue-500',
                            {
                              'text-blue-500': activeTab === button.name,
                            }
                          )}
                        />
                        <span
                          className={classNames(
                            'pl-1 group-hover:text-blue-500',
                            {
                              'text-blue-500': activeTab === button.name,
                            }
                          )}
                        >
                          {button.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="col-span-2">
                  {/* {activeTab === 'Class Information' && (
                    <ClassInfo
                      state={undefined}
                      send={function (event: CourseWizardEvent): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  )} */}
                  {/* {activeTab === 'Timeslots' && <div></div>} */}
                  {activeTab === 'Sessions' && <VolunteerAttendees />}
                </div>
              </div>
            </div>
          </div>
        </NavBar>
      </AppLayout>
    </>
  );
};

export default SingleClassPage;
