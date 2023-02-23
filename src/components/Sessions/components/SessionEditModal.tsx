import { useMutation } from '@apollo/client';
import produce from 'immer';
import { DateTime } from 'luxon';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Session } from '../../../../gen/graphql/resolvers';
import { SESSION_MODAL_DEFAULT_VOLUNTEER_SLOT_COUNT } from '../../../constants/sessionModal';
import * as SessionEdit from '../../../graphql/frontend/mutations/SessionEditMutation';
import inputStyles from '../../../styles/component_styles/Input.module.css';
import Button from '../../Button';
import Input from '../../Input';
import Modal from '../../Modal';
import Spinner from '../../Spinner';
import Switch from '../../Switch';
import { DEFAULT_END_TIME, DEFAULT_START_TIME } from '../constants';

interface Props {
  session: Session;
  onClose: () => void;
  onDeleteClick: (session: Session) => void;
}

const SessionEditModal: React.FC<Props> = function (props) {
  const { onClose, session, onDeleteClick } = props;

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
  const [volunteerSlotCount, setVolunteerSlotCount] = React.useState<
    number | null
  >(session.volunteerSlotCount ?? null);

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

  const handleVolunteerSlotCountSwitchChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setVolunteerSlotCount(
      !e.target.checked ? SESSION_MODAL_DEFAULT_VOLUNTEER_SLOT_COUNT : null
    );
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
    <Modal className="w-auto" onClose={onClose} modalTitle="Edit Session">
      <div className="my-2 mx-4 flex flex-col gap-4">
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
        <div className="flex items-center gap-x-3">
          <span className={inputStyles['input-label']}>
            Unlimited volunteer slots
          </span>
          <Switch
            checked={volunteerSlotCount == null}
            onChange={handleVolunteerSlotCountSwitchChange}
          />
        </div>
        {volunteerSlotCount != null && (
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
        )}
        <div className="my-5 mb-6 flex justify-center xsm:gap-x-2 md:gap-x-4">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Button variant="danger" onClick={() => onDeleteClick(session)}>
                DELETE
              </Button>
              <Button onClick={onClose} variant="secondary">
                CANCEL
              </Button>

              <Button onClick={handleEditClick}>EDIT</Button>
            </>
          )}
        </div>
      </div>
      {/* </div> */}
    </Modal>
  );
};

export default SessionEditModal;
