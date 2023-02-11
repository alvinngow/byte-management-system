import {
  ArrowLeftIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import CourseWizard from '../../../../components/CourseWizard';
import TabButton from '../../../../components/CourseWizard/components/TabButton';
import NavBar from '../../../../components/NavBar';
import NavHeader from '../../../../components/NavHeader';
import NavLink from '../../../../components/NavLink';
import Spinner from '../../../../components/Spinner';
import AppLayout from '../../../../layouts/AppLayout';

interface ManageCourseProps {
  courseId: string;
}

const ManageCourse: React.FC<ManageCourseProps> = function (props) {
  const { courseId } = props;

  return (
    <>
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
        <CourseWizard courseId={courseId} />
      </div>
    </>
  );
};

const SingleCoursePage: NextPage = function (props) {
  const router = useRouter();
  const { courseId } = router.query;

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
                <span className="p-2">Back to Manage Courses</span>
              </p>
            </NavLink>
          </div>
          <div className="ml-6 flex flex-col">
            <p className="text-2xl font-semibold">Manage Course</p>
          </div>
        </div>

        <div className="flex">
          {courseId != null ? (
            <ManageCourse courseId={`${courseId}`} />
          ) : (
            <Spinner />
          )}
        </div>
      </NavBar>
    </AppLayout>
  );
};

export default SingleCoursePage;
