import { NextPage } from 'next';
import Image from 'next/image';

import NavBar from '../../../components/NavBar';
import NavHeader from '../../../components/NavHeader';
import AppLayout from '../../../layouts/AppLayout';

const ClassPage: React.FC = function () {
  return (
    <AppLayout>
      <NavHeader />
      <div className="my-6 mx-auto flex w-4/5">
        <div className="flex basis-4/5 flex-col">
          <h6 className="mb-2 font-bold">Classes</h6>
          <div className="flex">
            <Image
              className="h-4"
              src="/star.png"
              alt="icon placeholder"
              width={16}
              height={16}
            />
            <p className="mx-2">Home</p>
            <span className="mx-2">/</span>
            <span className="mx-2">...</span>
            <span className="mx-2">/</span>
            <Image
              className="h-4"
              src="/star.png"
              alt="icon placeholder"
              width={16}
              height={16}
            />
            <p className="mx-2">Classes</p>
          </div>
        </div>
        <button className="basis-1/5 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          + ADD CLASS
        </button>
      </div>
      <div className="mx-auto flex w-4/5">
        <table className="table-auto border border-slate-300">
          <thead>
            <tr>
              <th className="border border-slate-300 py-4 pl-4 text-left">
                ID
              </th>
              <th className="border border-slate-300 py-4 pl-4 text-left">
                Title
              </th>
              <th className="border border-slate-300 py-4 pl-4 text-left">
                Location
              </th>
              <th className="border border-slate-300 py-4 pl-4 text-left">
                Trainer
              </th>
              <th className="border border-slate-300 py-4 pl-4 text-left">
                Date
              </th>
              <th className="border border-slate-300 py-4 pl-4 text-left">
                Student Attendees
              </th>
              <th className="border border-slate-300 py-4 pl-4 text-left">
                Volunteer Attendees
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #1 ID placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #1 Title placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #1 Location placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #1 Trainer placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #1 Date placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #1 Student Attendees placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #1 Volunteer Attendees placeholder
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #2 ID placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #2 Title placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #2 Location placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #2 Trainer placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #2 Date placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #2 Student Attendees placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #2 Volunteer Attendees placeholder
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #3 ID placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #3 Title placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #3 Location placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #3 Trainer placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #3 Date placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #3 Student Attendees placeholder
              </td>
              <td className="border border-slate-300 py-4 pl-4 text-left">
                #3 Volunteer Attendees placeholder
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default ClassPage;
