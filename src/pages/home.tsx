import { NextPage } from 'next';

import AppLayout from '../layouts/AppLayout';

const HomePage: NextPage = function () {
  return (
    <AppLayout>
      <div>
        {/* nav bar */}
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
          <div className="container flex flex-wrap mx-auto">
            <a href="https://flowbite.com/" className="flex place-items-start">
              {/* change to the BYTE logo when ready */}
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-6 mr-3 sm:h-9"
                alt="Byte Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                Byte
              </span>
            </a>

            <div
              className="items-start justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col p-4 px-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                <li>
                  <a
                    href="classes/detail/[id]"
                    className="pt-3 pb-3 pl-3 pr-3 text-gray-700 rounded-lg hover:bg-gray-200 md:hover:text-blue-500"
                    aria-current="page"
                  >
                    DISCOVER CAUSES
                  </a>
                </li>
                <li>
                  <a
                    href="/classes"
                    className="pt-3 pb-3 pl-3 pr-3 text-gray-700 rounded-lg hover:bg-gray-200 md:hover:text-blue-500"
                  >
                    MY SESSIONS
                  </a>
                </li>
                <li>
                  <a
                    href="/classes"
                    className="block py-2 px-4 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-200 md:hover:text-blue-500 md:p-0"
                  >
                    setting icon
                  </a>
                </li>
                <li>
                  <a
                    href="/classes"
                    className="block py-2 px-4 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-200 md:hover:text-blue-500 md:p-0"
                  >
                    bell icon
                  </a>
                </li>
                <li>
                  <a
                    href="/classes"
                    className="block py-2 px-4 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-200 md:hover:text-blue-500 md:p-0"
                  >
                    {/* AVATAR USER ICON */}
                    <button
                      id="dropdownUserAvatarButton"
                      data-dropdown-toggle="dropdownAvatar"
                      className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
        <h1 className="text-3xl mb-6 flex p-4 px-12 mt-4">
          <span>
            <b>Discover Causes</b> (Courses) That Matter To You
          </span>
        </h1>
        {/* start of seearch bar */}
        <form className="pl-12 pr-12 mb-8">
          <label htmlFor="default-search"></label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="eg: Art Course"
              required
            />
          </div>
        </form>
        {/* start of dropdown filters */}
        <div className="pl-12 pr-12 mb-8 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Skills</p>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-gray-500 text-sm py-2.5 text-center inline-flex items-center border-b-2 border-solid border-b-neutral-400"
              type="button"
            >
              All{' '}
              <svg
                className="w-4 h-4 ml-2"
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
              className="text-gray-500 text-sm py-2.5 text-center inline-flex items-center border-b-2 border-solid border-b-neutral-400"
              type="button"
            >
              All{' '}
              <svg
                className="w-4 h-4 ml-2"
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
        <div className="pl-12 pr-12 mb-8 grid grid-cols-4 gap-4 md:shrink-0">
          <div className="max-w-sm border-gray-200 rounded-lg shadow">
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
                <p className="text-xs text-gray-400 col-span-1 text-left">
                  From 15 Jan 2023
                </p>
                <p className="text-xs text-gray-400 col-span-1 text-right">
                  7 Sessions
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-sm border-gray-200 rounded-lg shadow">
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
                <p className="text-xs text-gray-400 col-span-1 text-left">
                  From 15 Jan 2023
                </p>
                <p className="text-xs text-gray-400 col-span-1 text-right">
                  7 Sessions
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-sm border-gray-200 rounded-lg shadow">
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
                <p className="text-xs text-gray-400 col-span-1 text-left">
                  From 15 Jan 2023
                </p>
                <p className="text-xs text-gray-400 col-span-1 text-right">
                  7 Sessions
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-sm border-gray-200 rounded-lg shadow">
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
                <p className="text-xs text-gray-400 col-span-1 text-left">
                  From 15 Jan 2023
                </p>
                <p className="text-xs text-gray-400 col-span-1 text-right">
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
