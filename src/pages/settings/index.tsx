import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import BackButton from '../../components/BackButton';
import IconButton from '../../components/IconButton';
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

  const [navTab, setNavTab] = useState(true);
  const handleClick = () => {
    if (navTab) {
      setNavTab(false);
    } else {
      setNavTab(true);
    }
  };

  useEffect(() => {
    if (router.query.s) {
      setSelectedTab(String(router.query.s));
      router.push('/settings');
    }
  }, [router]);

  return (
    <AppLayout>
      <SEO title="Settings" />
      <div className="flex items-center justify-between md:block">
        <BackButton
          text="Back"
          onClick={() => history.back()}
          className="my-9"
        />
        <h2>Settings</h2>
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
        <hr className="my-4 hidden rounded border-[1px] md:block" />
      </div>
      <div className="flex xsm:flex-col xl:flex-row">
        <div className="pr-4 xl:basis-1/4">
          {navTab && (
            <>
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
            </>
          )}
        </div>
        {selectedTab == 'Profile' && <Settings />}
        {selectedTab == 'Notifications' && <Notifications />}
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
