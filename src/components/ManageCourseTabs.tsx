import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React from 'react';

import BackButton from './BackButton';
import Button from './Button';
import CourseWizard from './CourseWizard';
import TabButton from './CourseWizard/components/TabButton';
import IconButton from './IconButton';
import Modal from './Modal';
import Sessions from './Sessions';
import Tab from './Tab';

type Tab = 'course_information' | 'sessions';
interface ManageCourseTabsProps {
  courseId?: string;
  editMode?: boolean;
}

const ManageCourseTabs: React.FC<ManageCourseTabsProps> = function (props) {
  const { courseId, editMode = false } = props;
  const [activeTab, setActiveTab] = React.useState<Tab>('course_information');
  const [modalState, setModalState] = React.useState(false);
  const [navTab, setNavTab] = React.useState(true);

  const handleClick = () => {
    if (navTab) {
      setNavTab(false);
    } else {
      setNavTab(true);
    }
  };
  return (
    <>
      <div className="mb-3 w-full items-center justify-between xsm:inline-flex md:block">
        <BackButton
          text={editMode ? 'Back to Manage Courses' : 'Back to Add Course'}
          href="/manage/course"
        />
        <h3 className="md:mt-8 md:mb-3">
          {editMode ? 'Manage Course' : 'Add Course'}
        </h3>
        <span className="cursor-pointer md:hidden">
          {navTab ? (
            <IconButton
              HeroIcon={() => (
                <BarsArrowUpIcon
                  className="h-6 w-6 text-brand-main"
                  onClick={() => handleClick()}
                />
              )}
            />
          ) : (
            <IconButton
              HeroIcon={() => (
                <BarsArrowDownIcon
                  className="h-6 w-6"
                  onClick={() => handleClick()}
                />
              )}
            />
          )}
        </span>
      </div>
      <div className="mb-20 flex xsm:flex-col xl:flex-row">
        <div className="mb-3 lg:mr-6 lg:basis-1/5">
          {navTab && (
            <>
              <Tab
                text="Course Information"
                Icon={ClipboardDocumentListIcon}
                selectedID={activeTab}
                tabID="course_information"
                onClick={() => setActiveTab('course_information')}
                href={`./${courseId}`}
              />
              <Tab
                id="sessions"
                text="Sessions"
                Icon={CalendarDaysIcon}
                selectedID={activeTab}
                tabID="sessions"
                href={courseId ? `./${courseId}` : ''}
                onClick={
                  editMode
                    ? () => setActiveTab('sessions')
                    : () => setModalState(true)
                }
              />
            </>
          )}
        </div>
        <div className="lg:basis-1/2">
          {activeTab === 'course_information' && (
            <CourseWizard courseId={courseId ? `${courseId}` : undefined} />
          )}
          {activeTab === 'sessions' && courseId != undefined && (
            <Sessions courseId={`${courseId}`} />
          )}
        </div>
      </div>
      {modalState && (
        <Modal
          // modalTitle="Please complete Course Information first."
          onClose={() => setModalState(false)}
        >
          <p className="subtitle1 px-5">
            Please complete Course Information first.
          </p>
          <Button
            onClick={() => setModalState(false)}
            size="sm"
            className="my-4"
          >
            Ok!
          </Button>
        </Modal>
      )}
    </>
  );
};

export default ManageCourseTabs;
