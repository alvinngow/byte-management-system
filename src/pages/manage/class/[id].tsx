import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import NavBar from '../../../components/NavBar';
import NavHeader from '../../../components/NavHeader';
import AppLayout from '../../../layouts/AppLayout';

const SingleStaffJourney: NextPage = function () {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout>
      <NavBar>
        <NavHeader />
        <div>Test</div>
      </NavBar>
    </AppLayout>
  );
};

export default SingleStaffJourney;
