import { useMutation } from '@apollo/client';
import { DateTime } from 'luxon';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Session } from '../../../../gen/graphql/resolvers';
import * as SessionDelete from '../../../graphql/frontend/mutations/SessionDeleteMutation';
import Button from '../../Button';
import Modal from '../../Modal';
import Spinner from '../../Spinner';

interface Props {
  session: Session;
  onClose: () => void;
}

const SessionDeleteModal: React.FC<Props> = function (props) {
  const { session, onClose } = props;

  const [sessionDelete, { loading, error }] = useMutation<
    SessionDelete.Data,
    SessionDelete.Variables
  >(SessionDelete.Mutation);

  const handleDeleteClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(async () => {
    await sessionDelete({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          sessionId: session.id,
        },
      },
      update: (cache, mutationResult) => {
        const normalizedId = cache.identify({
          id: session.id,
          __typename: 'Session',
        });

        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });

    onClose();
  }, [onClose, session.id, sessionDelete]);

  return (
    <>
      <Modal
        className="xsm:w-11/12 md:w-96"
        onClose={onClose}
        modalTitle="Delete Session"
      >
        <p className=" my-2 mx-4 text-center">
          Are you sure you want to delete the session from{' '}
          {DateTime.fromISO(session.startTime).toLocaleString(
            DateTime.TIME_SIMPLE
          )}{' '}
          to{' '}
          {DateTime.fromISO(session.endTime).toLocaleString(
            DateTime.TIME_SIMPLE
          )}
          ?
        </p>
        <div className="my-5 mb-6 flex justify-center xsm:gap-x-2 md:gap-x-4">
          {error != null && (
            <span className="text-red-400">An Error Occurred</span>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Button onClick={onClose} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleDeleteClick} href="" variant="danger">
                Delete
              </Button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SessionDeleteModal;
