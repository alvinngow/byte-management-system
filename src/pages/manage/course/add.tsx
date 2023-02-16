import {
  ArrowLeftIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import React, { useState } from 'react';

import BackButton from '../../../components/BackButton';
import CourseWizard from '../../../components/CourseWizard';
import TabButton from '../../../components/CourseWizard/components/TabButton';
import NavBar from '../../../components/NavBar';
import NavHeader from '../../../components/NavHeader';
import AppLayout from '../../../layouts/AppLayout';

const AddCourse: NextPage = function () {
  const [modal, setModal] = useState(true);

  const handleClick = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  return (
    <AppLayout>
      <NavBar>
        <NavHeader />
        <div className="ml-12 xsm:mx-5 xsm:mt-6 md:mt-12 md:ml-14">
          <div className="mb-3 w-full items-center justify-between xsm:inline-flex md:block">
            <BackButton text="Back to Courses" href="/manage/course" />
            <h3 className="md:mt-8 md:mb-3">Add Course</h3>
            <span className="cursor-pointer md:hidden">
              {modal ? (
                <BarsArrowUpIcon
                  className="h-6 w-6 text-brand-main"
                  onClick={() => handleClick()}
                />
              ) : (
                <BarsArrowDownIcon
                  className="h-6 w-6"
                  onClick={() => handleClick()}
                />
              )}
            </span>
          </div>

          <div className="mb-20 flex xsm:flex-col xl:flex-row">
            <div className="mb-3 lg:mr-6 lg:basis-1/5">
              {modal && (
                <TabButton
                  active
                  onClick={() => {}}
                  HeroIcon={ClipboardDocumentListIcon}
                >
                  Course Information
                </TabButton>
              )}
            </div>
            <div className="lg:basis-1/2">
              <CourseWizard />
            </div>
          </div>
        </div>
      </NavBar>
    </AppLayout>
  );
};

export default AddCourse;
