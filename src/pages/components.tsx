import { StarIcon } from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { MouseEventHandler } from 'react';

import BackButton from '../components/BackButton';
import PillWithText from '../components/ClassOverviewCard/PillWithText';
import Select, { SelectItem } from '../components/Select';
import Tab from '../components/TwoStateTab';
import AppLayout from '../layouts/AppLayout';

const SelectShowcase: React.FC = function () {
  const items = React.useMemo<SelectItem[]>(() => {
    return [
      {
        label: 'Fishball',
        value: 'fishball',
      },
      {
        label: 'Cake',
        value: 'cake',
      },
    ];
  }, []);

  const [value, setValue] = React.useState('fishball');

  return (
    <Select items={items} value={value} label="Food" onChange={setValue} />
  );
};

const Components: NextPage = function (props) {
  const router = useRouter();
  const [tab, setTab] = React.useState('none');

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    router.push('/404');
  }, [router]);

  return (
    <AppLayout>
      <div className="flex min-h-screen w-full flex-col bg-gray-300">
        <h1 className="mb-4 text-3xl font-bold">Components showcase</h1>

        <SelectShowcase />
        <BackButton
          href="/home"
          className="font-bold text-red-900"
          text="Example"
        />
        <Tab
          Icon={StarIcon}
          selectedID={tab}
          tabID="1"
          onClick={() => setTab('1')}
        />
        <PillWithText pillColor="red">2-cancelled this week</PillWithText>
        <PillWithText pillColor="blue">3-hours this week</PillWithText>
        <PillWithText>2-hours this week</PillWithText>
      </div>
    </AppLayout>
  );
};

export default Components;
