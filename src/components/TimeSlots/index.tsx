import React from 'react';

import TimeSlotsEmptyStateIcon from './components/TimeSlotsEmptyStateIcon';
import TimeSlotsModal from './components/TimeSlotsModal';

const TimeSlots: React.FC = function () {
  const [showModal, setShowModal] = React.useState(false);
  const emptyState = false;
  return (
    <div className="mb-10 h-max rounded border px-5 pt-2 shadow-md shadow-gray-400">
      <div className="flex items-center justify-between">
        <p>Timeslots</p>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          ADD TIME SLOT
        </button>
        <TimeSlotsModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
      {emptyState ? (
        <div className="m-auto flex flex-col">
          <div className="m-auto mt-10">
            <TimeSlotsEmptyStateIcon />
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
          <table className="m-auto my-5 border border-slate-300">
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #1 Date placeholder
                </td>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #1 Start Time placeholder
                </td>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #1 End Time placeholder
                </td>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #1 Volunteer Slots placeholder
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #2 Date placeholder
                </td>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #2 Start Time placeholder
                </td>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #2 End Time placeholder
                </td>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #2 Volunteer Slots placeholder
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #3 Date placeholder
                </td>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #3 Start Time placeholder
                </td>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #3 End Time placeholder
                </td>
                <td className="border border-slate-300 py-4 pl-4 text-left">
                  #3 Volunteer Slots placeholder
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
