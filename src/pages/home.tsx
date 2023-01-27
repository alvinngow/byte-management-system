import { NextPage } from 'next';

import AppLayout from '../layouts/AppLayout';

const HomePage: NextPage = function () {
  return (
    <AppLayout>
      <div>
        {/* nav bar */}
        <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
          <div className="container mx-auto flex flex-wrap">
            <a href="https://flowbite.com/" className="flex place-items-start">
              {/* change to the BYTE logo when ready */}
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Byte Logo"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold">
                Byte
              </span>
            </a>

            <div
              className="hidden w-full items-start justify-between md:order-1 md:flex md:w-auto"
              id="mobile-menu-2"
            >
              <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 px-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
                <li>
                  <a
                    href="classes/detail/[id]"
                    className="rounded-lg pt-3 pb-3 pl-3 pr-3 text-gray-700 hover:bg-gray-200 md:hover:text-blue-500"
                    aria-current="page"
                  >
                    DISCOVER CAUSES
                  </a>
                </li>
                <li>
                  <a
                    href="/classes"
                    className="rounded-lg pt-3 pb-3 pl-3 pr-3 text-gray-700 hover:bg-gray-200 md:hover:text-blue-500"
                  >
                    MY SESSIONS
                  </a>
                </li>
                <li>
                  <a
                    href="/classes"
                    className="block rounded py-2 px-4 pl-3 pr-4 text-gray-700 hover:bg-gray-200 md:p-0 md:hover:text-blue-500"
                  >
                    setting icon
                  </a>
                </li>
                <li>
                  <a
                    href="/classes"
                    className="block rounded py-2 px-4 pl-3 pr-4 text-gray-700 hover:bg-gray-200 md:p-0 md:hover:text-blue-500"
                  >
                    bell icon
                  </a>
                </li>
                <li>
                  <a
                    href="/classes"
                    className="block rounded py-2 px-4 pl-3 pr-4 text-gray-700 hover:bg-gray-200 md:p-0 md:hover:text-blue-500"
                  >
                    {/* AVATAR USER ICON */}
                    <button
                      id="dropdownUserAvatarButton"
                      data-dropdown-toggle="dropdownAvatar"
                      className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
                      type="button"
                    ></button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div>
        {/* body */}
        <h1 className="mb-6 mt-4 flex p-4 px-12 text-3xl">
          <span>
            <b>Discover Causes</b> (Courses) That Matter To You
          </span>
        </h1>
        {/* start of seearch bar */}
        <form className="mb-8 pl-12 pr-12">
          <label htmlFor="default-search"></label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="eg: Art Course"
              required
            />
          </div>
        </form>
        {/* start of dropdown filters */}
        <div className="mb-8 grid grid-cols-2 gap-4 pl-12 pr-12">
          <div>
            <p className="text-xs text-gray-500">Skills</p>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="inline-flex items-center border-b-2 border-solid border-b-neutral-400 py-2.5 text-center text-sm text-gray-500"
              type="button"
            >
              All{' '}
              <svg
                className="ml-2 h-4 w-4"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="inline-flex items-center border-b-2 border-solid border-b-neutral-400 py-2.5 text-center text-sm text-gray-500"
              type="button"
            >
              All{' '}
              <svg
                className="ml-2 h-4 w-4"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* start of cards */}
        <div className="mb-8 grid grid-cols-4 gap-4 pl-12 pr-12 md:shrink-0">
          <div className="max-w-sm rounded-lg border-gray-200 shadow">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://www.helpguide.org/wp-content/uploads/king-charles-spaniel-resting-head.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-blue-500 dark:text-white">
                  Digital Art Tech Module 2023
                </h5>
              </a>
              <p className="font-sm text-gray-600">APosh BizHub (Yishun)</p>
              <div className="grid grid-cols-2">
                <p className="col-span-1 text-left text-xs text-gray-400">
                  From 15 Jan 2023
                </p>
                <p className="col-span-1 text-right text-xs text-gray-400">
                  7 Sessions
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-sm rounded-lg border-gray-200 shadow">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://www.helpguide.org/wp-content/uploads/king-charles-spaniel-resting-head.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-blue-500 dark:text-white">
                  Digital Art Tech Module 2023
                </h5>
              </a>
              <p className="font-sm text-gray-600">APosh BizHub (Yishun)</p>
              <div className="grid grid-cols-2">
                <p className="col-span-1 text-left text-xs text-gray-400">
                  From 15 Jan 2023
                </p>
                <p className="col-span-1 text-right text-xs text-gray-400">
                  7 Sessions
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-sm rounded-lg border-gray-200 shadow">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://www.helpguide.org/wp-content/uploads/king-charles-spaniel-resting-head.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-blue-500 dark:text-white">
                  Digital Art Tech Module 2023
                </h5>
              </a>
              <p className="font-sm text-gray-600">APosh BizHub (Yishun)</p>
              <div className="grid grid-cols-2">
                <p className="col-span-1 text-left text-xs text-gray-400">
                  From 15 Jan 2023
                </p>
                <p className="col-span-1 text-right text-xs text-gray-400">
                  7 Sessions
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-sm rounded-lg border-gray-200 shadow">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://www.helpguide.org/wp-content/uploads/king-charles-spaniel-resting-head.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-blue-500 dark:text-white">
                  Digital Art Tech Module 2023
                </h5>
              </a>
              <p className="font-sm text-gray-600">APosh BizHub (Yishun)</p>
              <div className="grid grid-cols-2">
                <p className="col-span-1 text-left text-xs text-gray-400">
                  From 15 Jan 2023
                </p>
                <p className="col-span-1 text-right text-xs text-gray-400">
                  7 Sessions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
