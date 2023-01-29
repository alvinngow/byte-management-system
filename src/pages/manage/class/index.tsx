import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import Image from 'next/image';

import NavBar from '../../../components/NavBar';
import NavHeader from '../../../components/NavHeader';
import AppLayout from '../../../layouts/AppLayout';

const ClassPage: React.FC = function () {
  return (
    <AppLayout>
      <NavHeader />
      <div className="my-6 mx-auto flex w-4/5 items-center justify-between">
        <h6 className="font-bold">Classes</h6>
        <button className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          + ADD CLASS
        </button>
      </div>
      <div className="mx-auto flex w-80 overflow-x-auto sm:w-[30rem] md:w-min lg:w-4/5">
        <table className="border border-slate-300 md:w-full">
          <thead>
            <tr>
              <th className="border-b border-slate-300 py-4 pl-4 text-left">
                ID
              </th>
              <th className="border-b border-slate-300 py-4 pl-4 text-left">
                Title
              </th>
              <th className="border-b border-slate-300 py-4 pl-4 text-left">
                Location
              </th>
              <th className="border-b border-slate-300 py-4 pl-4 text-left">
                Trainer
              </th>
              <th className="border-b border-slate-300 py-4 pl-4 text-left">
                Date
              </th>
              <th className="border-b border-slate-300 py-4 pl-4 text-left">
                Student Attendees
              </th>
              <th className="border-b border-slate-300 py-4 pl-4 text-left">
                Volunteer Attendees
              </th>
              <th className="border-b border-slate-300 py-4 pl-4 text-left" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                1
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                Learn Music Production From Scratch
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                Sembawang CC
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                John Doe
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                26 Nov 2023
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                <div className="flex gap-2.5">
                  <PencilIcon
                    style={{ color: '#6B7280' }}
                    className="h-6 w-6"
                  />
                  <TrashIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                2
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                The Complete Stock Trading Course 2023
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                Ngee Ann Polytechnic
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                John Doe
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                26 Nov 2023
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                <div className="flex gap-2.5">
                  <PencilIcon
                    style={{ color: '#6B7280' }}
                    className="h-6 w-6"
                  />
                  <TrashIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                3
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                Live Coding Masterclass: Beginners To Advanced
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                Singapore Management University
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                John Doe
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                26 Nov 2023
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                <div className="flex gap-2.5">
                  <PencilIcon
                    style={{ color: '#6B7280' }}
                    className="h-6 w-6"
                  />
                  <TrashIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                How To Become A Gardening Pro In 30 Days
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                Singapore Management University
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                John Doe
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                26 Nov 2023
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                <div className="flex gap-2.5">
                  <PencilIcon
                    style={{ color: '#6B7280' }}
                    className="h-6 w-6"
                  />
                  <TrashIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                5
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                Microsoft Excel Ninja Course
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                Singapore Management University
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                John Doe
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                26 Nov 2023
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                <div className="flex gap-2.5">
                  <PencilIcon
                    style={{ color: '#6B7280' }}
                    className="h-6 w-6"
                  />
                  <TrashIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                6
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                Learn Music Production From Scratch
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                Singapore Management University
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                John Doe
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                26 Nov 2023
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                4
              </td>
              <td className="border-b border-slate-300 py-4 pl-4 text-left">
                <div className="flex gap-2.5">
                  <PencilIcon
                    style={{ color: '#6B7280' }}
                    className="h-6 w-6"
                  />
                  <TrashIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-4 pl-4 text-left">7</td>
              <td className="py-4 pl-4 text-left">
                The Complete Stock Trading Course 2023
              </td>
              <td className="py-4 pl-4 text-left">
                Singapore Management University
              </td>
              <td className="py-4 pl-4 text-left">John Doe</td>
              <td className="py-4 pl-4 text-left">26 Nov 2023</td>
              <td className="py-4 pl-4 text-left">4</td>
              <td className="py-4 pl-4 text-left">4</td>
              <td className="py-4 pl-4 text-left">
                <div className="flex gap-2.5">
                  <PencilIcon
                    style={{ color: '#6B7280' }}
                    className="h-6 w-6"
                  />
                  <TrashIcon style={{ color: '#6B7280' }} className="h-6 w-6" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default ClassPage;
