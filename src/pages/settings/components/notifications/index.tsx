import React from 'react';

import Button from '../../../../components/Button';
import Select, { SelectItem } from '../../../../components/Select';
import Switch from '../../../../components/Switch';

const RegionSelect: React.FC = function () {
  const items = React.useMemo<SelectItem[]>(() => {
    return [
      {
        label: 'North',
        value: 'north',
      },
      {
        label: 'South',
        value: 'south',
      },
      {
        label: 'East',
        value: 'east',
      },
      {
        label: 'West',
        value: 'west',
      },
      {
        label: 'Central',
        value: 'central',
      },
    ];
  }, []);

  const [value, setValue] = React.useState('');

  return (
    <Select
      items={items}
      value={value}
      label="Region"
      onChange={setValue}
      className="mt-4 w-full"
      placeholder="None"
    />
  );
};

const Notifications: React.FC = function () {
  return (
    <div className="w-3/4 pt-3">
      <p className="mb-2 font-semibold">Notifications</p>
      <p className="mb-2 mt-6 font-semibold">General</p>
      <p className="mb-4 mt-3 text-gray-400">Manage your email notifications</p>
      <div className="flex">
        <Switch className="inline align-top" />
        <div className="pl-2">
          <p className="font-semibold">New Courses</p>
          <p className="mb-2 mt-2 text-gray-400">
            Get notified whenever there are new courses with available sessions
            created.
          </p>
        </div>
      </div>
      <div className="mt-4 flex">
        <Switch className="inline align-top" />
        <div className="pl-2">
          <p className="font-semibold">Courses Near Me</p>
          <p className="mb-2 mt-2 text-gray-400">
            Get weekly updates of courses near your region.
          </p>
          <div className="relative">
            <RegionSelect />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Button className="mt-8" size="sm" label="Save"></Button>
        <Button
          className="mt-8 ml-3"
          size="sm"
          label="Cancel"
          variant="secondary"
        ></Button>
      </div>
    </div>
  );
};

export default Notifications;
