import { NextPage } from 'next';
import React from 'react';

import AvatarConfigurator from '../../components/AvatarConfigurator';
import NavHeader from '../../components/NavHeader';
import AppLayout from '../../layouts/AppLayout';

const SettingsPage: NextPage = function () {
  return (
    <AppLayout>
      <NavHeader />

      <AvatarConfigurator />
    </AppLayout>
  );
};

export default SettingsPage;
