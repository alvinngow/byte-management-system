import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import BackButton from '../../components/BackButton';
import SEO from '../../components/SEO';
import Tab from '../../components/Tab';
import AppLayout from '../../layouts/AppLayout';
import Notifications from './components/notifications';
import Settings from './components/settings';

const SettingsPage: NextPage = function () {
  const router = useRouter();
  let initState = 'Profile';
  if (router.query.s) {
    initState = String(router.query.s);
    router.push('/settings');
  }

  const [selectedTab, setSelectedTab] = useState(initState);

  useEffect(() => {
    if (router.query.s) {
      setSelectedTab(String(router.query.s));
      router.push('/settings');
    }
  }, [router]);

  return (
    <AppLayout>
      <SEO title="Settings" />
      <div>
        <BackButton
          text="Back"
          onClick={() => history.back()}
          className="my-9"
        />
        <h2>Settings</h2>
        <hr className="my-4 rounded border-[1px]" />
      </div>
      <div className="md:flex">
        <div className="w-1/4 pr-4">
          <Tab
            className="mb-1"
            nofill
            selectedID={selectedTab}
            tabID={'Profile'}
            onClick={() => setSelectedTab('Profile')}
            Icon={UserCircleIcon}
            text={'my profile'}
            textClass={'pl-2 uppercase font-semibold'}
          ></Tab>
          <Tab
            nofill
            selectedID={selectedTab}
            tabID={'Notifications'}
            onClick={() => setSelectedTab('Notifications')}
            Icon={BellIcon}
            text={'notifications'}
            textClass={'pl-2 uppercase font-semibold'}
          ></Tab>
        </div>
        {selectedTab == 'Profile' && <Settings />}
        {selectedTab == 'Notifications' && <Notifications />}
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
