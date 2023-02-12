import { useMutation } from '@apollo/client';
import produce from 'immer';
import { DateTime } from 'luxon';
import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as SessionAdd from '../../../graphql/frontend/mutations/SessionAddMutation';
import * as CourseSessions from '../../../graphql/frontend/queries/CourseSessionsQuery';
import Button from '../../Button';
import Input from '../../Input';
import Spinner from '../../Spinner';
import { DEFAULT_END_TIME, DEFAULT_START_TIME } from '../constants';

interface Props {
  courseId: string;
  showModal: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const SessionsModal: React.FC<Props> = function (props) {
  const { showModal, onClose, courseId } = props;

  const [sessionAdd, { loading, error }] = useMutation<
    SessionAdd.Data,
    SessionAdd.Variables
  >(SessionAdd.Mutation);

  const [date, setDate] = React.useState(() => {
    return DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd');
  });

  const [startTime, setStartTime] = React.useState(DEFAULT_START_TIME);
  const [endTime, setEndTime] = React.useState(DEFAULT_END_TIME);
  const [volunteerSlotCount, setVolunteerSlotCount] = React.useState(0);

  const handleDateChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setDate(e.target.value);
  }, []);

  const handleStartTimeChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setStartTime(e.target.value);
  }, []);

  const handleEndTimeChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setEndTime(e.target.value);
  }, []);

  const handleVolunteerSlotCountChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setVolunteerSlotCount(parseInt(e.target.value, 10));
  }, []);

  const handleAddClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    sessionAdd({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          courseId,
          date,
          startTime: DateTime.fromISO(startTime).toISOTime({
            includeOffset: true,
          }),
          endTime: DateTime.fromISO(endTime).toISOTime({
            includeOffset: true,
          }),
          volunteerSlotCount,
        },
      },
      update: (cache, mutationResult) => {
        const createdSession = mutationResult.data?.sessionAdd?.session;

        if (createdSession == null) {
          return;
        }

        const queryData = cache.readQuery<
          CourseSessions.Data,
          CourseSessions.Variables
        >({
          query: CourseSessions.Query,
          variables: {
            id: courseId,
          },
        });

        if (queryData == null) {
          return;
        }

        cache.writeQuery<CourseSessions.Data, CourseSessions.Variables>({
          query: CourseSessions.Query,
          variables: {
            id: courseId,
          },
          data: produce(queryData, (draftData) => {
            const { edges } = draftData.course.sessions;

            edges.push({
              node: createdSession,
              cursor: createdSession.id,
            });
          }),
        });
      },
    });
  }, [courseId, date, endTime, sessionAdd, startTime, volunteerSlotCount]);

  if (!showModal) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div
        className="mb:w-1/2 2xl:w-1/4 w-full rounded-xl bg-white sm:w-2/3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-12 flex flex-col gap-4 px-14 pt-14">
          <p className="text-center text-3xl font-semibold">Add Session</p>
          <div>
            <div className="py-3">
              <Input
                label="Date"
                type="date"
                value={date}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className="flex justify-items-stretch gap-x-4">
            <div className="grow">
              <Input
                label="Start Time"
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>
            <div className="grow">
              <Input
                label="End Time"
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
          <div>
            <Input
              label="Volunteer Slots (No of Pax)"
              type="number"
              placeholder="0"
              min={0}
              value={volunteerSlotCount.toString(10)}
              onChange={handleVolunteerSlotCountChange}
            />
          </div>
          <div className="flex justify-center gap-x-4 pb-14">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Button onClick={onClose} variant="secondary">
                  CANCEL
                </Button>
                <Button onClick={handleAddClick}>ADD</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsModal;
