import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import React from 'react';

import CourseWizard from '../../../components/CourseWizard';
import TabButton from '../../../components/CourseWizard/components/TabButton';
import NavBar from '../../../components/NavBar';
import NavHeader from '../../../components/NavHeader';
import NavLink from '../../../components/NavLink';
import AppLayout from '../../../layouts/AppLayout';

const AddClass: NextPage = function () {
  return (
    <AppLayout>
      <NavBar>
        <NavHeader />
        <div className="mt-2 ml-2 sm:mt-6 sm:ml-14 lg:mt-12 lg:ml-10">
          <div className="ml-6 mb-6 flex items-center px-2">
            <NavLink href="/manage/course">
              <p className="flex items-center">
                <ArrowLeftIcon
                  style={{ color: '#0F172A' }}
                  className="h-6 w-6"
                />
                <span className="p-2">Back to Courses</span>
              </p>
            </NavLink>
          </div>
          <div className="ml-6 flex flex-col">
            <p className="text-2xl font-semibold">Add Course</p>
          </div>
          <div className="flex">
            <div className="mr-6 basis-1/4">
              <TabButton
                active
                onClick={() => {}}
                HeroIcon={ClipboardDocumentListIcon}
              >
                Course Information
              </TabButton>
            </div>
            <div className="basis-1/2">
              <CourseWizard />
            </div>
          </div>
        </div>
      </NavBar>
    </AppLayout>
  );
};

export default AddClass;
