import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';

import { SessionDateFiltering } from '../../../gen/graphql/operations';
import { Session, SessionSortKey } from '../../../gen/graphql/resolvers';
import * as CourseSessions from '../../graphql/frontend/queries/CourseSessionsQuery';
import Button from '../Button';
import Select from '../Select';
import Spinner from '../Spinner';
import SessionAddModal from './components/SessionAddModal';
import SessionDeleteModal from './components/SessionDeleteModal';
import SessionEditModal from './components/SessionEditModal';
import SessionRow from './components/SessionRow';
import SessionsEmptyStateIcon from './components/SessionsEmptyStateIcon';

interface Props {
  courseId: string;
}

const Sessions: React.FC<Props> = function (props) {
  const { courseId } = props;

  const [showModal, setShowModal] = React.useState(false);

  const [editModalSession, setEditModalSession] =
    React.useState<Session | null>(null);

  const [deleteModalSession, setDeleteModalSession] =
    React.useState<Session | null>(null);

  const [sessionDateFiltering, setSessionDateFiltering] = React.useState<
    SessionDateFiltering | undefined
  >(undefined);

  const { data, loading, error, refetch } = useQuery<
    CourseSessions.Data,
    CourseSessions.Variables
  >(CourseSessions.Query, {
    variables: {
      id: courseId,
      filter: {
        date: sessionDateFiltering,
      },
      sortKey: SessionSortKey.Start,
    },
  });

  useEffect(() => {
    refetch();
  }, [sessionDateFiltering, refetch]);

  const sessionEdges = React.useMemo(
    () => data?.course?.sessions?.edges ?? [],
    [data]
  );

  return (
    <div className="flex h-max flex-col gap-y-4 rounded-lg border border-gray-100 px-5 py-4 shadow-md md:filter-none">
      {loading && <Spinner />}
      {error != null && <span className="text-red-400">An Error Occurred</span>}
      <div className="flex items-center justify-between">
        <p className="subtitle1 mb-2">Sessions</p>
        <Button size="sm" onClick={() => setShowModal(true)}>
          ADD SESSION
        </Button>
        <SessionAddModal
          courseId={courseId}
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
        {editModalSession != null && (
          <SessionEditModal
            session={editModalSession}
            onClose={() => setEditModalSession(null)}
            onDeleteClick={setDeleteModalSession}
          />
        )}
        {deleteModalSession != null && (
          <SessionDeleteModal
            session={deleteModalSession}
            onClose={() => setDeleteModalSession(null)}
          />
        )}
      </div>
      <div className="w-36 xsm:w-full md:w-auto">
        <div className="relative md:w-1/2">
          <Select
            className="w-full"
            items={[
              { label: 'All', value: undefined },
              {
                label: 'Upcoming sessions',
                value: SessionDateFiltering.Upcoming,
              },
              { label: 'Past sessions', value: SessionDateFiltering.Past },
            ]}
            label={'Show'}
            value={sessionDateFiltering}
            onChange={setSessionDateFiltering}
          />
        </div>
        {sessionEdges.length === 0 ? (
          <div className="m-auto flex flex-col">
            <div className="m-auto mt-10">
              <SessionsEmptyStateIcon />
            </div>
            <p className="my-2.5 text-center">
              There are no sessions to display.
            </p>
            <p className="mb-5 text-center text-gray-400">
              Add a session by clicking on the &ldquo;ADD SESSION&rdquo; button.
            </p>
          </div>
        ) : (
          <div className="snap-x overflow-x-auto scroll-smooth">
            <table className="my-5 w-full shadow-sm">
              <thead>
                <tr>
                  <th className="py-4 pl-4 text-left">Date</th>
                  <th className="py-4 pl-4 text-left xsm:whitespace-nowrap md:whitespace-normal">
                    Start Time
                  </th>
                  <th className="py-4 pl-4 text-left xsm:whitespace-nowrap md:whitespace-normal">
                    End Time
                  </th>
                  <th className="py-4 pl-4 text-left xsm:whitespace-nowrap md:whitespace-normal">
                    Volunteer Slots
                  </th>
                  <th className="py-4 pl-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {sessionEdges.map((sessionEdge) => (
                  <SessionRow
                    key={sessionEdge.node.id}
                    session={sessionEdge.node}
                    onEditClick={setEditModalSession}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
