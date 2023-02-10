import { DateTime } from 'luxon';
import React, { useRef } from 'react';

interface Props {
  showModal: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const TimeSlotsModal: React.FC<Props> = function (props) {
  const ref = useRef<HTMLInputElement>(null);
  const { showModal, onClose } = props;

  const tomorrow = DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd');

  if (!showModal) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div
        className="mb:w-1/2 2xl:w-1/4 w-full rounded-xl bg-white sm:w-2/3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-12 flex flex-col gap-4 px-14 pt-14">
          <p className="text-center text-3xl font-semibold">Add Time Slot</p>
          <div>
            <p className="text-zinc-300">Date</p>
            <div className="py-3">
              {/* NOTE: (kryeoh): A hacky workaround to displaying placeholder text for input date fields */}
              <input
                className="w-full border-b-2"
                type="text"
                placeholder={tomorrow}
                ref={ref}
                onFocus={() => (ref.current!.type = 'date')}
              ></input>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-zinc-300">Start Time</p>
              <input className="w-full border-b-2" type="time" />
            </div>
            <div>
              <p className="text-zinc-300">End Time</p>
              <input className="w-full border-b-2" type="time" />
            </div>
          </div>
          <div>
            <p className="text-zinc-300">Volunteer Slots (No of Pax)</p>
            <input
              className="w-full border-b-2"
              type="number"
              placeholder="0"
              min="0"
            />
          </div>
        </div>
        <div className="flex justify-center pb-14">
          <button
            onClick={onClose}
            className="mr-2.5 basis-1/4 rounded-full bg-zinc-100 py-2 px-4 font-bold text-slate-500 hover:bg-zinc-200"
          >
            CANCEL
          </button>
          <button
            onClick={onClose}
            className="basis-1/4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotsModal;
