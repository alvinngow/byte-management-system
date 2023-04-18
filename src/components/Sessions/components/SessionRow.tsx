import { useMutation, useQuery } from '@apollo/client';
import { Attendance } from '@bims/graphql/schema';
import { Session, SessionAttendeeSortKey } from '@bims/graphql/schema';
import {
  ClipboardDocumentCheckIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import Image from 'next/image';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as SessionAttendReport from '../../../graphql/frontend/mutations/SessionAttendReportMutation';
import * as SessionOverview from '../../../graphql/frontend/queries/MeSessionOverviewQuery';
import * as SessionAttendee from '../../../graphql/frontend/queries/SessionAttendeesQuery';
import AttendanceButton from '../../AttendanceButton';
import Avatar from '../../Avatar';
import Button from '../../Button';
import Chip from '../../Chip';
import IconButton from '../../IconButton';
import Modal from '../../Modal';
import NoResults from '../../NoResults';
import ToolTip from '../../ToolTip';

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

  const [sessionAttendeesSortKey, setSessionAttendeesSortKey] = React.useState<
    SessionAttendeeSortKey | undefined
  >(undefined);
  const [reverse, setReverse] = React.useState(false);

  const variables = React.useMemo<SessionAttendee.Variables>(() => {
    return {
      id: session.id,
      sortKey: sessionAttendeesSortKey,
      reverse,
    };
  }, [reverse, session.id, sessionAttendeesSortKey]);

  const { data, loading, error, refetch } = useQuery<
    SessionAttendee.Data,
    SessionAttendee.Variables
  >(SessionAttendee.Query, {
    variables,
  });

  React.useEffect(() => {
    refetch();
  }, [refetch, variables]);

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
        SessionOverview.Query,
      ],
    });
  };

  const isSessionPassed = React.useMemo(() => {
    const start = DateTime.fromISO(`${session.startDate}T${session.startTime}`);
    const end = DateTime.fromISO(`${session.endDate}T${session.endTime}`);

    return (
      start.diffNow('second').as('second') < 0 &&
      end.diffNow('second').as('second') < 0
    );
  }, [session.endDate, session.endTime, session.startDate, session.startTime]);

  return (
    <tr className="border border-x-0 border-y-gray-100">
      <td className="py-4 px-4 text-left xsm:whitespace-nowrap md:whitespace-normal">
        {DateTime.fromISO(session.startDate).toLocaleString(DateTime.DATE_MED)}
        {attendanceModal ? (
          <Modal
            onClose={() => setAttendanceModal(false)}
            modalTitle="Mark Attendance"
            minHeight={150}
            minWidth={150}
            className="mx-[20px]"
          >
            <div className="mb-10 flex flex-col px-5 pt-2">
              <div className="mt-5 mb-5 flex">
                <div className="snap-y overflow-y-auto scroll-smooth rounded-lg border-[1px] border-gray-100 text-left drop-shadow-sm xsm:h-[360px]">
                  <table className="text-secondary w-full">
                    <thead className="subtitle2 sticky -top-1 border-b bg-white">
                      <th className="pl-4 xsm:whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          Name{' '}
                          <div
                            className="inline"
                            onClick={() => {
                              setSessionAttendeesSortKey(
                                SessionAttendeeSortKey.FirstName
                              );
                              setReverse((prevState) => !prevState);
                            }}
                          >
                            <IconButton
                              HeroIcon={(props) => (
                                <ArrowsUpDownIcon className="h-5 w-5" />
                              )}
                            />
                          </div>
                        </div>
                      </th>
                      <th className="whitespace-nowrap px-6 py-4">
                        Mark Attendance
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          {data?.session?.attendees?.edges?.length === 0 && (
                            <NoResults />
                          )}
                        </td>
                      </tr>
                      {data?.session.attendees.edges.map((edge) => (
                        <tr key={edge.cursor} className="border-b bg-white">
                          <td>
                            <div className="my-2 grid grid-cols-[30%_70%]">
                              <div className="mr-0.5 p-2">
                                {edge && (
                                  <Avatar
                                    user={edge.node.user}
                                    className="h-10 w-10 shrink-0"
                                  />
                                )}
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
                            {isSessionPassed && (
                              <AttendanceButton
                                className="h-[34px] justify-center gap-2"
                                userAttendanceState={
                                  edge.node.actualAttendance ?? null
                                }
                                updateAttendance={(e) =>
                                  handleAttendanceChange(e, edge.node.user.id)
                                }
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                      <div className="shadow-inner"></div>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mx-auto">
                <div>
                  <Button
                    className=""
                    variant={'primary'}
                    onClick={() => setAttendanceModal(false)}
                  >
                    Done
                  </Button>
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
          <ToolTip toolTipText="Mark Attendance">
            <IconButton
              HeroIcon={() => (
                <ClipboardDocumentCheckIcon
                  onClick={() => {
                    setAttendanceModal(true);
                  }}
                />
              )}
            />
          </ToolTip>
        </div>
      </td>
    </tr>
  );
};

export default SessionRow;
