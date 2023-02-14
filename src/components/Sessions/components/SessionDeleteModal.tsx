import { useMutation } from '@apollo/client';
import { DateTime } from 'luxon';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Session } from '../../../../gen/graphql/resolvers';
import * as SessionDelete from '../../../graphql/frontend/mutations/SessionDeleteMutation';
import Button from '../../Button';
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
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div
        className="mb:w-1/2 2xl:w-1/4 flex w-full flex-col gap-y-4 rounded-xl bg-white pt-4 pb-8 sm:w-2/3"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-center text-3xl font-semibold">Delete Session</p>
        <p className="text-center">
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
        <div className="flex justify-center gap-x-4">
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
              <Button onClick={handleDeleteClick} variant="danger">
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDeleteModal;
