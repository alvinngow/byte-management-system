import { useMutation, useQuery } from '@apollo/client';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import Select from '../../../../components/Select';
import Switch from '../../../../components/Switch';
import * as notificationUpdate from '../../../../graphql/frontend/mutations/AccountNotificationUpdateMutation';
import * as Me from '../../../../graphql/frontend/queries/MeQuery';

const Notifications: React.FC = function () {
  const { data: meData, refetch } = useQuery<Me.Data>(Me.Query);
  const [accountUpdate] = useMutation<
    notificationUpdate.Data,
    notificationUpdate.Variables
  >(notificationUpdate.Mutation);
  const regionRef = useRef();

  const items = [
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
  type SwitchType = 'notifyNewCourse' | 'notifyNearNewCourse' | 'nearRegion';

  async function handleSwitchChange(value: String | Boolean, type: SwitchType) {
    await accountUpdate({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          [type]: value,
        },
      },
    });
    refetch();
  }

  const [value, setValue] = useState();

  return (
    <div className="pt-6 xl:basis-3/4 xl:pt-3">
      <p className="mb-2 font-semibold">Notifications</p>
      <p className="mb-2 mt-6 font-semibold">General</p>
      <p className="mb-4 mt-3 text-gray-400">Manage your email notifications</p>
      <div className="flex">
        <Switch
          className="inline align-top"
          checked={meData?.me?.notifyNewCourse ?? true}
          onChange={(e) =>
            handleSwitchChange(e.target.checked, 'notifyNewCourse')
          }
        />
        <div className="pl-2">
          <p className="font-semibold">New Courses</p>
          <p className="mb-2 mt-2 text-gray-400">
            Get notified whenever there are new courses with available sessions
            created.
          </p>
        </div>
      </div>
      <div className="mt-4 flex">
        <Switch
          className="inline align-top"
          checked={meData?.me?.notifyNearNewCourse ?? true}
          onChange={(e) =>
            handleSwitchChange(e.target.checked, 'notifyNearNewCourse')
          }
        />
        <div className="pl-2">
          <p className="font-semibold">Courses Near Me</p>
          <p className="mb-2 mt-2 text-gray-400">
            Get weekly updates of courses near your region.
          </p>
          <div className="relative">
            <Select
              items={items}
              value={meData?.me?.nearRegion}
              label="Region"
              className="mt-4 w-full"
              onChange={(e) => handleSwitchChange(e, 'nearRegion')}
              placeholder="None"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
