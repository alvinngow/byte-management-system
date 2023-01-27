import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  DocumentArrowUpIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';

import NavLink from './NavLink';

const ClassInfo: React.FC = function () {
  interface Button {
    name: string;
    isrc: React.ElementType;
  }

  interface InputField {
    label: string;
    placeholder: string;
    id: string;
  }

  const RenderButtons: Button[] = [
    {
      name: 'Class Information',
      isrc: ClipboardDocumentListIcon,
    },
    {
      name: 'Timeslots',
      isrc: CalendarDaysIcon,
    },
    {
      name: 'Volunteer Attendees',
      isrc: UserIcon,
    },
  ];

  const InputFields: InputField[] = [
    {
      label: 'Title',
      placeholder: 'eg. Live Coding Masterclass: Beginners To Advanced',
      id: 'title',
    },
    {
      label: 'Subtitle (optional)',
      placeholder: 'Short description about the course',
      id: 'subtitle',
    },
    {
      label: 'About',
      placeholder: 'Detailed description about the course',
      id: 'about',
    },
    {
      label: 'Description',
      placeholder: 'Course modules, class size, attire required etc.',
      id: 'description',
    },
    {
      label: 'Location',
      placeholder: 'Where will course be held',
      id: 'location',
    },
    {
      label: 'Trainer',
      placeholder: "Input trainer's name",
      id: 'trainer',
    },
  ];

  const [activeTab, setActiveTab] = useState<
    'Class Information' | 'Timeslots' | 'Volunteer Attendees'
  >('Class Information');

  const [classImg, setImg] = useState('null');

  function UploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    event.persist();

    if (event.currentTarget.files![0] !== null) {
      const file = event.currentTarget.files![0];
      const fileURL = URL.createObjectURL(file);
      if (file.size > 3145728) {
        alert('File is too big!');
        (document.getElementById('file') as HTMLInputElement)!.value = '';
        return;
      } else {
        var img = document.createElement('img');
        img.onload = function () {
          if (img.naturalWidth > 1500 || img.naturalHeight > 1000) {
            alert(
              'Image dimensions: ' +
                img.naturalWidth +
                'x' +
                img.naturalHeight +
                ' is too big.\nRequired dimensions: 1500x1000'
            );
            (document.getElementById('file') as HTMLInputElement)!.value = '';
            return;
          } else {
            document.getElementById('fileName')!.textContent = file.name;
            document.getElementById('fileSize')!.textContent =
              String((file.size * 0.000001).toPrecision(2)) + 'mb';
            setImg(fileURL);
          }
        };
        img.src = fileURL;
      }
    }
  }

  function DeleteFile() {
    (document.getElementById('file') as HTMLInputElement)!.value = '';
    document.getElementById('fileName')!.textContent = 'No file uploaded';
    document.getElementById('fileSize')!.textContent = '0mb';
    setImg('null');
  }

  return (
    <div className="mb-10 h-max rounded border px-5 pt-2 shadow-md shadow-gray-400">
      <p className="font-semibold">Class Information</p>
      {InputFields.map((field) => (
        <div key={field.label}>
          <label
            htmlFor={field.id}
            className="block pt-4 text-sm text-gray-400"
          >
            {field.label}
          </label>
          {field.id === 'trainer' ? (
            <>
              <div className="relative pt-3">
                <input
                  type="text"
                  id={field.id}
                  className="inline w-full border-b-2 bg-white pl-10 outline-none"
                  placeholder={field.placeholder}
                />
                <button className="absolute bottom-1 left-0 inline-block h-9 w-9 rounded-full bg-gray-400"></button>
              </div>
            </>
          ) : field.id === 'description' ? (
            <textarea
              id={field.id}
              className="w-full whitespace-pre-line border-b-2 bg-white pt-2 outline-none"
              placeholder={field.placeholder}
            ></textarea>
          ) : (
            <input
              type="text"
              id={field.id}
              className="w-full border-b-2 bg-white pt-2 outline-none"
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
      <p className="pt-4 text-lg font-semibold">Cover</p>
      <div className="mx-auto w-full rounded-md border-2 border-dashed py-4">
        <label htmlFor="file" className="block text-center">
          <DocumentArrowUpIcon className="mx-auto h-7 w-7 rounded-full bg-gray-200 p-1 hover:bg-gray-400" />
          <span className="font-semibold">
            <span className="text-blue-400 underline">
              Click to upload&#160;
            </span>
          </span>
          <input
            onChange={UploadFile}
            type="file"
            id="file"
            className="hidden"
            accept="image/svg, image/jpeg, image/png, image/gif"
          />
        </label>
        <span className="block text-center text-gray-400">
          SVG, PNG, JPG or GIF (max. 3MB)
        </span>
      </div>
      <div className="mt-10">
        <DocumentArrowUpIcon className="mb-7 inline h-7 w-7 rounded-full bg-gray-200 p-1" />
        <div className="inline-block pl-3">
          <span id="fileName" className="inline-block max-w-lg truncate">
            No file uploaded
          </span>
          <br></br>
          <span id="fileSize" className="text-gray-400">
            0mb
          </span>
          {classImg !== 'null' ? (
            <span className="pl-3 text-gray-400">Complete</span>
          ) : (
            <></>
          )}
        </div>
        <button onClick={DeleteFile} className="float-right mt-3 inline">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      {classImg === 'null' ? (
        <></>
      ) : (
        <div className="mt-3">
          <p className="font-semibold">Preview</p>
          <div className="placeholderBG relative mx-auto mt-2 flex aspect-[3/2] justify-center rounded-md">
            <Image
              src={classImg}
              alt="icon placeholder"
              fill={true}
              id="classImg"
              className="rounded-md object-cover"
            />
          </div>
        </div>
      )}
      <div className="my-6">
        <button className="rounded-full bg-blue-500 py-2 px-5 text-sm font-semibold uppercase text-gray-100">
          Add Course
        </button>
        <button className="ml-3 rounded-full border border-gray-300 py-2 px-5 text-sm font-semibold uppercase text-gray-400">
          <NavLink href={'./'}>Cancel</NavLink>
        </button>
      </div>
    </div>
  );
};

export default ClassInfo;
