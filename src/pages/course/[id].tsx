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
import VolunteerNavHeader from '../../components/VolunteerNavHeader';

const CourseDetailPage: React.FC = function () {
  const router = useRouter();
  const { id } = router.query;

  const [linkSelected, setLinkSelected] = React.useState<
    'Apply' | 'Description' | 'Volunteer Instructions'
  >('Apply');
  return (
    <>
      <VolunteerNavHeader />
      <h6 className="mx-auto my-9 w-[80vw] text-gray-600">
        <BackButton href="/discover-courses" text="Back to Discover Classes" />
      </h6>
      <div className="relative mx-auto mb-9 h-[30vh] w-[80vw]">
        <Image
          src="/default-cover-image.jpg"
          alt="cover picture"
          fill
          className="rounded-3xl"
        />
      </div>
      <div className="mx-auto flex w-[80vw]">
        <div className="mr-14 w-8/12">
          <h6 className="mb-6">From 26 Nov - 1 Dec</h6>
          <h2 className="mb-6">Volunteer for Teaching Students Art 2022</h2>
          <div className="subtitle1 mb-5">
            Lorem ipsum dolor sit amet consectetur. Quis ultrices massa aliquet
            nunc. Magna urna faucibus eleifend faucibus nam nec.
          </div>
          <div>
            <div className="flex gap-4">
              <div
                onClick={() => setLinkSelected('Apply')}
                className={classNames(
                  {
                    'border-b-2 border-brand-main text-brand-main':
                      linkSelected === 'Apply',
                    'text-gray-500': linkSelected !== 'Apply',
                  },
                  'cursor-default px-4 py-5 group-hover:text-brand-main'
                )}
              >
                Apply
              </div>
              <div
                onClick={() => setLinkSelected('Description')}
                className={classNames(
                  {
                    'border-b-2 border-brand-main text-brand-main':
                      linkSelected === 'Description',
                    'text-gray-500': linkSelected !== 'Description',
                  },
                  'cursor-default px-4 py-5 group-hover:text-brand-main'
                )}
              >
                Description
              </div>
              <div
                onClick={() => setLinkSelected('Volunteer Instructions')}
                className={classNames(
                  {
                    'border-b-2 border-brand-main text-brand-main':
                      linkSelected === 'Volunteer Instructions',
                    'text-gray-500': linkSelected !== 'Volunteer Instructions',
                  },
                  'cursor-default px-4 py-5 group-hover:text-brand-main'
                )}
              >
                Instructions for volunteers
              </div>
            </div>
            <div className="border-full mb-12 block w-full rounded-lg border bg-white shadow-lg">
              {linkSelected === 'Apply' && (
                <>
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
                          <Button
                            size="sm"
                            label="Applied"
                            variant="secondary"
                          />
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
                          <Button
                            size="sm"
                            label="Applied"
                            variant="secondary"
                          />
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
                </>
              )}
              {linkSelected === 'Description' && (
                <h6>Course {id} description</h6>
              )}
              {linkSelected === 'Volunteer Instructions' && (
                <h6>Volunteer Instructions for Course {id}</h6>
              )}
            </div>
          </div>
        </div>
        <div className="w-4/12">
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
