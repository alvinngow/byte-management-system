import {
  ArrowsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Tab from '../../components/TwoStateTab';
import VolunteerNavHeader from '../../components/VolunteerNavHeader';
import VolunteerEmptyState from '../../components/VolunteersEmptyState';
import useCurrentUser from '../../hooks/useCurrentUser';

const CourseDetailPage: React.FC = function () {
  const router = useRouter();
  const { id } = router.query;
  const { me } = useCurrentUser();

  const volInstructionsVisible = React.useMemo(() => {
    var tabVisibility = false;
    if (me == null) {
      return;
    }
    if (me.role == 'user') {
      tabVisibility = true;
    }
    return tabVisibility;
  }, [me]);

  const [linkSelected, setLinkSelected] = React.useState<
    'Apply' | 'Description' | 'Volunteer Instructions'
  >('Apply');

  const [volEmptyState, setVolEmptyState] = React.useState('true');

  const [tab, setTab] = React.useState('Apply');
  return (
    <>
      <VolunteerNavHeader />
      <h6 className="my-9 mx-5 w-auto text-gray-600 sm:mx-auto sm:w-[80vw]">
        <BackButton href="/discover-courses" text="Back to Discover Classes" />
      </h6>
      <div className="relative mx-5 mb-9 h-[30vh] w-auto sm:mx-auto sm:w-[80vw]">
        <Image
          src="/default-cover-image.jpg"
          alt="cover picture"
          fill
          className="rounded-3xl"
        />
      </div>
      <div className="mx-5 flex w-auto flex-col sm:mx-auto sm:w-[80vw] lg:flex-row">
        <div className="w-full lg:mr-14 lg:w-8/12">
          <h6 className="mb-6">From 26 Nov - 1 Dec</h6>
          <h2 className="mb-6">Volunteer for Teaching Students Art 2022</h2>
          <div className="subtitle1 mb-5">
            Lorem ipsum dolor sit amet consectetur. Quis ultrices massa aliquet
            nunc. Magna urna faucibus eleifend faucibus nam nec.
          </div>
          <div>
            <div className="flex gap-4">
              <Tab
                hasIcon={false}
                selectedID={tab}
                tabID="Apply"
                onClick={() => {
                  setTab('Apply');
                  setLinkSelected('Apply');
                }}
                text="Apply"
                underline
                className="uppercase"
              />
              <Tab
                hasIcon={false}
                selectedID={tab}
                tabID="Description"
                onClick={() => {
                  setTab('Description');
                  setLinkSelected('Description');
                }}
                text="Description"
                underline
                className="uppercase"
              />
              {volInstructionsVisible && (
                <Tab
                  hasIcon={false}
                  selectedID={tab}
                  tabID="Instructions"
                  onClick={() => {
                    setTab('Instructions');
                    setLinkSelected('Volunteer Instructions');
                  }}
                  text="Instructions"
                  underline
                  className="uppercase"
                />
              )}
            </div>
            {linkSelected === 'Apply' && (
              <div className="border-full mb-12 block w-full overflow-x-auto rounded-lg border bg-white  shadow-lg">
                <table className="md:w-full">
                  <thead>
                    <tr>
                      <th className="border-b border-slate-300 py-4 pl-4 text-left">
                        <div className="subtitle2 flex items-center gap-1.5">
                          <span>Date</span>
                          <span>
                            <ArrowsUpDownIcon className="h-5 w-5 text-gray-400" />
                          </span>
                        </div>
                      </th>
                      <th className="border-b border-slate-300 py-4 pl-4 text-left">
                        <div className="subtitle2 flex items-center gap-1.5">
                          <span>Start Time</span>
                          <span>
                            <ArrowsUpDownIcon className="h-5 w-5 text-gray-400" />
                          </span>
                        </div>
                      </th>
                      <th className="border-b border-slate-300 py-4 pl-4 text-left">
                        <div className="subtitle2 flex items-center gap-1.5">
                          <span>End Time</span>
                          <span>
                            <ArrowsUpDownIcon className="h-5 w-5 text-gray-400" />
                          </span>
                        </div>
                      </th>
                      <th className="border-b border-slate-300 py-4 pl-4 text-left">
                        <div className="subtitle2 flex items-center gap-1.5">
                          <span>Available Slots</span>
                          <span>
                            <ArrowsUpDownIcon className="h-5 w-5 text-gray-400" />
                          </span>
                        </div>
                      </th>
                      <th className="border-b border-slate-300 py-4 pl-4 text-left" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        10 Jan 2023
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        4:00PM
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        5:00PM
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        1
                      </td>
                      <td className="border-b border-slate-300 py-4 pl-4 text-center">
                        <Button size="sm" label="Apply" />
                      </td>
                    </tr>
                    <tr>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        20 Jan 2023
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        4:00PM
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        5:00PM
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        1
                      </td>
                      <td className="border-b border-slate-300 py-4 pl-4 text-center">
                        <Button size="sm" label="Apply" disabled={true} />
                      </td>
                    </tr>
                    <tr>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        10 Feb 2023
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        4:00PM
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        5:00PM
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        1
                      </td>
                      <td className="border-b border-slate-300 py-4 pl-4 text-center">
                        <Button size="sm" label="Applied" variant="secondary" />
                      </td>
                    </tr>
                    <tr>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        20 Feb 2023
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        4:00PM
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        5:00PM
                      </td>
                      <td className="body2 border-b border-slate-300 py-4 pl-4 text-left">
                        1
                      </td>
                      <td className="border-b border-slate-300 py-4 pl-4 text-center">
                        <Button size="sm" label="Applied" variant="secondary" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex items-center justify-end gap-6">
                  <div className="flex gap-2">
                    <span>Rows per page:</span>
                    <span>10</span>
                  </div>
                  <div>1-5 of 13</div>
                  <div className="flex">
                    <div className="p-3">
                      <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="p-3">
                      <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {linkSelected === 'Description' && (
              <div className="mt-2.5 mb-5 py-2.5">
                <h6>Course {id} description</h6>
              </div>
            )}
            {linkSelected === 'Volunteer Instructions' &&
              volEmptyState === 'false' && (
                <div className="mt-2.5 mb-5 py-2.5">
                  <h6>Volunteer Instructions for Course {id}</h6>
                </div>
              )}
            {linkSelected === 'Volunteer Instructions' &&
              volEmptyState === 'true' && (
                <div className="mt-10 flex items-center justify-center py-2.5 text-center">
                  <div>
                    <VolunteerEmptyState />
                    <h6 className="mt-2.5">There&apos;s no instructions</h6>
                    <div className="text-secondary mt-2.5 mb-12">
                      For more instructions, do contact the trainer. <br />
                      Contact details can be found in this page.
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className="w-full lg:w-4/12">
          <div className="border-full mb-12 block w-full rounded-lg border bg-white p-10 shadow-lg">
            <div className="subtitle1 mb-2.5 uppercase">location</div>
            <div className="mb-2.5">Placeholder</div>
            <div className="body1 mb-8">
              31, Toh Tuck Garden, 22 Toh Tuck Crescent, Singapore 596938
            </div>
            <div className="subtitle1 mb-2.5 uppercase">contact details</div>
            <div className="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
              Ut et massa mi. <br />
              Aliquam in hendrerit urna.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
