import { useQuery } from '@apollo/client';
import React from 'react';

import { Session } from '../../../gen/graphql/resolvers';
import * as CourseSessions from '../../graphql/frontend/queries/CourseSessionsQuery';
import Button from '../Button';
import Spinner from '../Spinner';
import SessionEditModal from './components/SessionEditModal';
import SessionRow from './components/SessionRow';
import SessionsEmptyStateIcon from './components/SessionsEmptyStateIcon';
import SessionsModal from './components/SessionsModal';

interface Props {
  courseId: string;
}

const Sessions: React.FC<Props> = function (props) {
  const { courseId } = props;

  const [showModal, setShowModal] = React.useState(false);
  const [editModalSession, setEditModalSession] =
    React.useState<Session | null>(null);

  const { data, loading, error } = useQuery<
    CourseSessions.Data,
    CourseSessions.Variables
  >(CourseSessions.Query, {
    variables: {
      id: courseId,
    },
  });

  const sessionEdges = React.useMemo(
    () => data?.course?.sessions?.edges ?? [],
    [data]
  );

  return (
    <div className="mb-10 h-max rounded border px-5 pt-2 shadow-md shadow-gray-400">
      {loading && <Spinner />}
      {error != null && <span className="text-red-400">An Error Occurred</span>}
      <div className="flex items-center justify-between">
        <p>Sessions</p>
        <Button onClick={() => setShowModal(true)}>ADD SESSION</Button>
        <SessionsModal
          courseId={courseId}
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
        {editModalSession != null && (
          <SessionEditModal
            session={editModalSession}
            onClose={() => setEditModalSession(null)}
          />
        )}
      </div>
      {sessionEdges.length === 0 ? (
        <div className="m-auto flex flex-col">
          <div className="m-auto mt-10">
            <SessionsEmptyStateIcon />
          </div>
          <p className="my-2.5 text-center">
            This class doesn&rsquo;t have any time slots.
          </p>
          <p className="mb-5 text-center text-gray-400">
            Add time slot(s) to this class by clicking on the top right button.
          </p>
        </div>
      ) : (
        <div className="w-36 overflow-x-auto sm:w-72 md:w-auto">
          <table className="my-5 w-full border border-slate-300">
            <thead>
              <tr>
                <th className="border border-slate-300 py-4 pl-4 text-left">
                  Date
                </th>
                <th className="border border-slate-300 py-4 pl-4 text-left">
                  Start Time
                </th>
                <th className="border border-slate-300 py-4 pl-4 text-left">
                  End Time
                </th>
                <th className="border border-slate-300 py-4 pl-4 text-left">
                  Volunteer Slots
                </th>
                <th className="border border-slate-300 py-4 pl-4 text-left"></th>
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
  );
};

export default Sessions;
