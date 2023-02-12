import { useMutation } from '@apollo/client';
import produce from 'immer';
import { DateTime } from 'luxon';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Session } from '../../../../gen/graphql/resolvers';
import * as SessionEdit from '../../../graphql/frontend/mutations/SessionEditMutation';
import Button from '../../Button';
import Input from '../../Input';
import Spinner from '../../Spinner';
import { DEFAULT_END_TIME, DEFAULT_START_TIME } from '../constants';

interface Props {
  session: Session;
  onClose: () => void;
}

const SessionEditModal: React.FC<Props> = function (props) {
  const { onClose, session } = props;

  const [sessionEdit, { loading, error }] = useMutation<
    SessionEdit.Data,
    SessionEdit.Variables
  >(SessionEdit.Mutation);

  const [date, setDate] = React.useState(() => {
    return DateTime.fromISO(session.startDate).toISODate();
  });

  const [startTime, setStartTime] = React.useState(() => {
    return DateTime.fromISO(session.startTime).toISOTime({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  });
  const [endTime, setEndTime] = React.useState(() => {
    return DateTime.fromISO(session.endTime).toISOTime({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  });
  const [volunteerSlotCount, setVolunteerSlotCount] = React.useState(
    session.volunteerSlotCount ?? 0
  );

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

  const handleEditClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(async () => {
    await sessionEdit({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          sessionId: session.id,
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
    });

    onClose();
  }, [
    sessionEdit,
    session.id,
    date,
    startTime,
    endTime,
    volunteerSlotCount,
    onClose,
  ]);

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
          <p className="text-center text-3xl font-semibold">Edit Session</p>
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
                <Button onClick={onClose} variant="secondary" disabled>
                  DELETE
                </Button>
                <Button onClick={handleEditClick}>EDIT</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionEditModal;
