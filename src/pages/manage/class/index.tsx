import { NextPage } from 'next';

import NavBar from '../../../components/NavBar';
import NavHeader from '../../../components/NavHeader';
import AppLayout from '../../../layouts/AppLayout';

const ClassPage: React.FC = function () {
  return (
    <AppLayout>
      <NavBar>
        <NavHeader />
        {<div>TEST</div>}
      </NavBar>
    </AppLayout>
  );
};

export default ClassPage;
