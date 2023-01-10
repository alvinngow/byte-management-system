import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import AppLayout from '../../../layouts/AppLayout';

const SingleStaffJourney: NextPage = function () {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout>
      <h1>hello {id}</h1>
    </AppLayout>
  );
};

export default SingleStaffJourney;
