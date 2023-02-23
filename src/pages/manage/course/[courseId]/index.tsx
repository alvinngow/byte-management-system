import {
  ArrowLeftIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import BackButton from '../../../../components/BackButton';
import IconButton from '../../../../components/IconButton';
import ManageCourseTabs from '../../../../components/ManageCourseTabs';
import NavBar from '../../../../components/NavBar';
import NavHeader from '../../../../components/NavHeader';
import NavLink from '../../../../components/NavLink';
import Spinner from '../../../../components/Spinner';
import AppLayout from '../../../../layouts/AppLayout';

const SingleCoursePage: NextPage = function (props) {
  const router = useRouter();
  const { courseId } = router.query;
  return (
    <AppLayout>
      <NavBar>
        <NavHeader />

        <div className="ml-12 xsm:mx-5 xsm:mt-6 md:mt-12 md:ml-14">
          {courseId != null ? (
            <ManageCourseTabs courseId={`${courseId}`} editMode={true} />
          ) : (
            <Spinner />
          )}
        </div>
      </NavBar>
    </AppLayout>
  );
};

export default SingleCoursePage;
