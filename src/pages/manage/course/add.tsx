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
import ManageCourseTabs from '../../../components/ManageCourseTabs';
import NavBar from '../../../components/NavBar';
import NavHeader from '../../../components/NavHeader';
import SEO from '../../../components/SEO';
import Spinner from '../../../components/Spinner';
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
        <SEO title="Add Course" />
        <div className="ml-12 xsm:mx-5 xsm:mt-6 md:mt-12 md:ml-14">
          <ManageCourseTabs />
        </div>
      </NavBar>
    </AppLayout>
  );
};

export default AddCourse;
