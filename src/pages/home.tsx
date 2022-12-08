import { NextPage } from 'next';

import AppLayout from '../layouts/AppLayout';

const HomePage: NextPage = function () {
  return (
    <AppLayout>
      <h1>Welcome</h1>
    </AppLayout>
  );
};

export default HomePage;
