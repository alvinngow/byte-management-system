import { NextPage } from 'next';
import Image from 'next/image';

import NavBar from '../../../components/NavBar';
import NavHeader from '../../../components/NavHeader';
import AppLayout from '../../../layouts/AppLayout';

const ClassPage: React.FC = function () {
  return (
    <AppLayout>
      <NavHeader />
      <div className="flex my-6 mx-auto w-4/5">
        <div className="flex flex-col basis-4/5">
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
        <button className="basis-1/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          + ADD CLASS
        </button>
      </div>
      <div className="flex mx-auto w-4/5">
        <table className="table-auto border border-slate-300">
          <thead>
            <tr>
              <th className="border border-slate-300 py-4 text-left pl-4">
                ID
              </th>
              <th className="border border-slate-300 py-4 text-left pl-4">
                Title
              </th>
              <th className="border border-slate-300 py-4 text-left pl-4">
                Location
              </th>
              <th className="border border-slate-300 py-4 text-left pl-4">
                Trainer
              </th>
              <th className="border border-slate-300 py-4 text-left pl-4">
                Date
              </th>
              <th className="border border-slate-300 py-4 text-left pl-4">
                Student Attendees
              </th>
              <th className="border border-slate-300 py-4 text-left pl-4">
                Volunteer Attendees
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #1 ID placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #1 Title placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #1 Location placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #1 Trainer placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #1 Date placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #1 Student Attendees placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #1 Volunteer Attendees placeholder
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #2 ID placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #2 Title placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #2 Location placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #2 Trainer placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #2 Date placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #2 Student Attendees placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #2 Volunteer Attendees placeholder
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #3 ID placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #3 Title placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #3 Location placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #3 Trainer placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #3 Date placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
                #3 Student Attendees placeholder
              </td>
              <td className="border border-slate-300 py-4 text-left pl-4">
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
