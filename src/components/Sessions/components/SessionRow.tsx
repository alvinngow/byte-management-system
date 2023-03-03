import { useMutation, useQuery } from '@apollo/client';
import {
  ClipboardDocumentCheckIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowsUpDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import Image from 'next/image';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Attendance } from '../../../../gen/graphql/operations';
import { Session } from '../../../../gen/graphql/resolvers';
import * as SessionAttendReport from '../../../graphql/frontend/mutations/SessionAttendReportMutation';
import * as SessionAttendee from '../../../graphql/frontend/queries/SessionAttendeesQuery';
import AttendanceButton from '../../AttendanceButton';
import Chip from '../../Chip';
import IconButton from '../../IconButton';
import Modal from '../../Modal';

interface Props {
  session: Session;
  onEditClick: (session: Session) => void;
}

const SessionRow: React.FC<Props> = function (props) {
  const { session, onEditClick } = props;
  const [attendanceModal, setAttendanceModal] = React.useState(false);
  const [userAttendanceUpdate] = useMutation<
    SessionAttendReport.Data,
    SessionAttendReport.Variables
  >(SessionAttendReport.Mutation);

  const { data, loading, error } = useQuery<
    SessionAttendee.Data,
    SessionAttendee.Variables
  >(SessionAttendee.Query, {
    variables: {
      id: session.id,
    },
  });

  const handleAttendanceChange = (
    attendanceState: Attendance | null,
    userId: string
  ) => {
    userAttendanceUpdate({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          sessionId: session.id,
          actualAttendance: attendanceState,
          userId: userId,
        },
      },
      refetchQueries: [
        {
          query: SessionAttendee.Query,
          variables: {
            id: session.id,
          },
        },
      ],
    });
  };

  return (
    <tr className="border border-x-0 border-y-gray-200">
      <td className="py-4 pl-4 text-left xsm:whitespace-nowrap md:whitespace-normal">
        {DateTime.fromISO(session.startDate).toLocaleString(DateTime.DATE_MED)}
        {attendanceModal ? (
          <Modal
            onClose={() => setAttendanceModal(false)}
            modalTitle="Mark Attendance"
            minHeight={150}
            minWidth={150}
          >
            <div className="mb-10 flex flex-col pt-2">
              <div className="ml-4 mr-4 mt-5 mb-5 flex">
                {/* start of the table */}
                <div className="snap-x overflow-x-auto scroll-smooth">
                  <table className="text-secondary w-full text-left">
                    <thead className="subtitle2">
                      {/* need to add the up-down arrow icon */}
                      <th className="whitespace-nowrap px-6 py-4">
                        Name{' '}
                        <IconButton
                          HeroIcon={(props) => (
                            <ArrowsUpDownIcon className="h-5 w-5" />
                          )}
                        />
                      </th>
                      <th className="whitespace-nowrap px-6 py-4">
                        Mark Attendance
                      </th>
                    </thead>
                    <tbody>
                      {data?.session.attendees.edges.map((edge) => (
                        <tr key={edge.cursor} className="border-b bg-white">
                          <td>
                            <div className="grid grid-cols-[30%_70%]">
                              <div className="p-2">
                                <Image
                                  className="h-10 w-10 rounded-full"
                                  src="/favicon.ico"
                                  alt="Rounded avatar"
                                  width={100}
                                  height={100}
                                />
                              </div>
                              <div>
                                <p>
                                  {edge.node.user.firstName}{' '}
                                  {edge.node.user.lastName}
                                </p>
                                <p>{edge.node.user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <AttendanceButton
                              className="h-[40px] justify-center"
                              userAttendanceState={edge.node.actualAttendance}
                              updateAttendance={(e) =>
                                handleAttendanceChange(e, edge.node.user.id)
                              }
                            ></AttendanceButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          ''
        )}
      </td>
      <td className="py-4 pl-4 text-left">
        {DateTime.fromISO(session.startTime).toLocaleString(
          DateTime.TIME_SIMPLE
        )}
      </td>
      <td className="py-4 pl-4 text-left">
        {DateTime.fromISO(session.endTime).toLocaleString(DateTime.TIME_SIMPLE)}
      </td>
      <td
        className={classNames('py-4 pl-4 text-left', {
          'text-neutral-400':
            session.volunteerSlotCount === 0 ||
            session.volunteerSlotCount == null,
        })}
      >
        {session.volunteerSlotCount || (
          <Chip scheme={'disabled'} number="Unlimited"></Chip>
        )}
      </td>
      <td className="py-4 pl-4 text-left xsm:pr-4 md:pr-0">
        <div className="flex gap-y-3 gap-x-2.5 xsm:flex-col md:flex-row ">
          <IconButton
            HeroIcon={() => <PencilIcon onClick={() => onEditClick(session)} />}
          />
          <IconButton
            HeroIcon={() => (
              <ClipboardDocumentCheckIcon
                onClick={() => {
                  setAttendanceModal(true);
                }}
              />
            )}
          />
        </div>
      </td>
    </tr>
  );
};

export default SessionRow;
