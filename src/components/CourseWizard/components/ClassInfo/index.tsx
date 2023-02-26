import { DocumentArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import {
  BaseActionObject,
  ResolveTypegenMeta,
  State,
  TypegenDisabled,
} from 'xstate';

import Button from '../../../Button';
import Input from '../../../Input';
import NavLink from '../../../NavLink';
import Spinner from '../../../Spinner';
import {
  CourseData,
  CourseWizardContext,
  CourseWizardEvent,
  CourseWizardServiceMap,
  CourseWizardTypeState,
  LocationData,
} from '../../machines/CourseWizardMachine';
import LocationClusterPicker from '../LocationClusterPicker';
import LocationPicker from '../LocationPicker';
import ManagersPicker from '../ManagersPicker';

interface Props {
  state: State<
    CourseWizardContext & {
      courseData: CourseData;
    },
    CourseWizardEvent,
    any,
    CourseWizardTypeState,
    ResolveTypegenMeta<
      TypegenDisabled,
      CourseWizardEvent,
      BaseActionObject,
      CourseWizardServiceMap
    >
  >;
  send: (event: CourseWizardEvent) => void;
}

const MAX_FILE_SIZE_BYTES = 3145728;

const ClassInfo: React.FC<Props> = function (props) {
  const { state, send } = props;
  const router = useRouter();

  const { courseId } = router.query;

  const handleTitleChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      send({
        type: 'SET_COURSE_NAME',
        value: e.target.value,
      });
    },
    [send]
  );

  const handleSubtitleChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      send({
        type: 'SET_COURSE_SUBTITLE',
        value: e.target.value,
      });
    },
    [send]
  );

  const handleDescriptionChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      send({
        type: 'SET_COURSE_DESCRIPTION',
        value: e.target.value,
      });
    },
    [send]
  );

  const handleDescriptionPrivateChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      send({
        type: 'SET_COURSE_DESCRIPTION_PRIVATE',
        value: e.target.value,
      });
    },
    [send]
  );

  const handleDefaultStartTimeChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      send({
        type: 'COURSE_SET_DEFAULT_START_TIME',
        time: e.target.value,
      });
    },
    [send]
  );

  const handleDefaultEndTimeChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      send({
        type: 'COURSE_SET_DEFAULT_END_TIME',
        time: e.target.value,
      });
    },
    [send]
  );

  const handleLocationTextChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      send({
        type: 'SET_LOCATION_TEXT',
        value: e.target.value,
      });
    },
    [send]
  );

  const getRegion = (postalString: string) => {
    const west = [11, 12, 13, 60, 61, 62, 63, 64, 65, 66, 67, 68];
    const north = [69, 70, 71, 72, 73, 75, 76];
    const northEast = [53, 54, 55, 82, 56, 57, 77, 78];
    const east = [42, 43, 44, 45, 46, 47, 48, 49, 50, 81, 51, 52];

    const first_two = Number(postalString.slice(0, 2));

    if (west.includes(first_two)) {
      return 'West';
    } else if (north.includes(first_two)) {
      return 'North';
    } else if (northEast.includes(first_two)) {
      return 'North East';
    } else if (east.includes(first_two)) {
      return 'East';
    } else {
      return 'Central';
    }
  };

  const handleLocationPicked = React.useCallback(
    (locationData: LocationData) => {
      send({
        type: 'SET_COURSE_LOCATION',
        locationData: locationData,
      });
    },
    [send]
  );

  const handleLocationUnitChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      send({
        type: 'SET_LOCATION_UNIT',
        unit: e.target.value,
      });
    },
    [send]
  );

  const handleLocationClusterPicked = React.useCallback(
    (locationClusterId: string | null) => {
      send({
        type: 'SET_LOCATION_CLUSTER_ID',
        locationClusterId,
      });
    },
    [send]
  );

  const handleManagerAdded = React.useCallback(
    (userId: string) => {
      send({
        type: 'ADD_COURSE_MANAGER',
        userId,
      });
    },
    [send]
  );

  const handleManagerRemoved = React.useCallback(
    (userId: string) => {
      send({
        type: 'REMOVE_COURSE_MANAGER',
        userId,
      });
    },
    [send]
  );

  const handleInputFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.currentTarget.files?.[0] ?? null;
    if (file == null) {
      send({
        type: 'COVER_SET_FILE',
        file: null,
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      alert('File is too big!');
      return;
    }

    send({
      type: 'COVER_SET_FILE',
      file,
    });
  };

  function handleFileRemoveClick() {
    send({
      type: 'COVER_SET_FILE',
      file: null,
    });
  }

  return (
    <div className="flex h-max flex-col gap-y-4 rounded-lg border border-gray-100 px-5 py-4 shadow-md md:filter-none">
      <p className="subtitle1 mb-2">Course Information</p>
      {state.matches('loading') && <Spinner />}
      {state.matches('idle') && (
        <>
          <Input
            value={state.context.courseData.name}
            onChange={handleTitleChange}
            label="Title"
            placeholder="Live Coding Masterclass: Beginners To Advanced"
          />
          <Input
            value={state.context.courseData.subtitle ?? undefined}
            label="Subtitle"
            onChange={handleSubtitleChange}
            placeholder="Short description about the course"
          />
          <Input
            value={state.context.courseData.description}
            label="Description"
            onChange={handleDescriptionChange}
            placeholder="Course modules, class size, attire required etc."
          />
          <Input
            value={state.context.courseData.descriptionPrivate ?? undefined}
            label="Instructions (only visible to volunteers)"
            onChange={handleDescriptionPrivateChange}
            placeholder="Top secret information only volunteers can know."
          />
          <LocationPicker
            locationText={state.context.locationText}
            onLocationTextChange={handleLocationTextChange}
            onLocationPicked={handleLocationPicked}
          />
          <div className="grid gap-4 md:grid-cols-2 md:items-center">
            {/* insert unit number from GraphQL here */}
            <Input
              value={state.context.locationUnit}
              label="Apt, suite, unit number, etc. (optional)"
              onChange={handleLocationUnitChange}
              placeholder="e.g. #01-123"
              disabled={state.context.locationData == null}
            />
            <LocationClusterPicker
              locationClusterId={state.context.locationClusterId}
              onLocationClusterPicked={handleLocationClusterPicked}
            />
          </div>

          <ManagersPicker
            managerUserIds={state.context.managerUserIds}
            onManagerAdded={handleManagerAdded}
            onManagerRemoved={handleManagerRemoved}
          />
          <div className="grid gap-4 md:grid-cols-2 md:items-center">
            <Input
              type="time"
              label="Session Default Start Time"
              value={state.context.courseData.defaultStartTime}
              onChange={handleDefaultStartTimeChange}
            />
            <Input
              type="time"
              label="Session Default End Time"
              value={state.context.courseData.defaultEndTime}
              onChange={handleDefaultEndTimeChange}
            />
          </div>
          <p className="pt-4 text-lg font-semibold">Cover</p>
          <div className="mx-auto w-full rounded-md border-2 border-dashed py-4">
            <label htmlFor="file" className="block text-center">
              <DocumentArrowUpIcon className="mx-auto h-7 w-7 rounded-full bg-gray-200 p-1 hover:bg-gray-400" />
              <span className="font-semibold">
                <span className="text-blue-400 underline">
                  Click to upload&#160;
                </span>
              </span>
              <input
                onChange={handleInputFileChange}
                type="file"
                id="file"
                className="hidden"
                accept="image/svg, image/jpeg, image/png, image/gif"
              />

              <span className="block text-center text-gray-400">
                SVG, PNG, JPG or GIF (max. 3MB)
              </span>
            </label>
          </div>
          <div className="mt-10">
            <DocumentArrowUpIcon className="mb-7 inline h-7 w-7 rounded-full bg-gray-200 p-1" />
            <div className="inline-block pl-3">
              <span className="inline-block max-w-lg truncate">
                {state.context.file?.name ?? 'No file uploaded'}
              </span>
              <br></br>
              <span className="text-gray-400">
                {((state.context.file?.size ?? 0) * 0.000001).toPrecision(2)} mb
              </span>
              <span className="pl-3 text-gray-400">Complete</span>
            </div>
            <button
              onClick={handleFileRemoveClick}
              className="float-right mt-3 inline"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          {state.context.file != null && (
            <div className="mt-3">
              <p className="font-semibold">Preview</p>
              <div className="placeholderBG relative mx-auto mt-2 flex aspect-[728/225] justify-center rounded-md">
                <Image
                  src={URL.createObjectURL(state.context.file)}
                  alt="icon placeholder"
                  fill={true}
                  id="classImg"
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          )}
          <div className="my-6 grid gap-3 md:grid-cols-2 lg:max-w-fit">
            <Button
              size="sm"
              onClick={() => {
                send({ type: 'SUBMIT' });
              }}
              label={courseId != undefined ? 'Update' : 'Next'}
            />
            <Button size="sm" variant="secondary" href={'./'} label="Cancel" />
          </div>
        </>
      )}
      {state.matches('submitting') && (
        <span className="text-brand-main">Submitting...</span>
      )}
      {state.matches('submitted') && (
        <span className="text-green-500">Course updated!</span>
      )}
      {state.matches('error') && (
        <span className="text-red-400">An error occurred</span>
      )}
    </div>
  );
};

export default ClassInfo;
