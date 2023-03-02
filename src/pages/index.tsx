import { useQuery } from '@apollo/client';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { DateTime } from 'luxon';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CourseDateFiltering } from '../../gen/graphql/operations';
import Button from '../../src/components/Button';
import CustomLink from '../../src/components/Link';
import Card from '../components/Card';
import ByteLogo from '../components/icons/ByteLogo';
import FacebookLogo from '../components/icons/FacebookLogo';
import InstagramLogo from '../components/icons/InstagramLogo';
import NavLink from '../components/NavLink';
import * as CoursesQuery from '../graphql/frontend/queries/CoursesQuery';

const LandingPage: NextPage = function () {
  const today = new Date();
  const year = today.getFullYear();

  const { data } = useQuery<CoursesQuery.Data, CoursesQuery.Variables>(
    CoursesQuery.Query,
    {
      variables: {
        filter: {
          date: CourseDateFiltering.Upcoming,
        },
      },
    }
  );

  const courses = data?.courses.edges;

  return (
    <div>
      <Head>
        <title>Byte&apos;s Volunteering Management System</title>
        <meta name="description" content="Integrated with Byte.sg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* jumbotron */}
      <div
        className="none relative overflow-hidden rounded-b-[50px] pt-3 md:block"
        style={{ backgroundColor: '#F1F4FB' }}
      >
        {/* nav */}
        <nav className="rounded border-gray-200 px-2 py-2.5 sm:px-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <a href="https://flowbite.com/" className="flex items-center">
              <ByteLogo className="mr-3 h-6 sm:h-9" alt="Byte Logo" />
            </a>
            <div className="flex gap-2 md:order-2">
              <Button
                className="flex gap-2"
                size="lg"
                label="Back to Byte.sg"
                variant="secondary"
                href="https://www.byte.sg/"
              >
                <ArrowLeftIcon width="24" />
              </Button>
              <Button size="lg" label="Sign in" href="/login"></Button>
            </div>
          </div>
        </nav>
        <div className="mx-auto block w-3/4 md:grid md:grid-cols-2">
          <div className="my-auto">
            <h1 className="my-14 w-1/2">
              Byte&apos;s Volunteering Management System
            </h1>
            <div className="flex gap-2 md:order-2">
              <Button size="lg" label="Get Started" href="/signup"></Button>
              <Button
                size="lg"
                label="Find out more"
                variant="secondary"
                href="https://www.byte.sg/programs"
              ></Button>
            </div>
          </div>
          <div>
            <Image
              className="pointer-events-none absolute xsm:-right-[10px] xsm:bottom-[10px] lg:bottom-[50px] lg:-right-32"
              width="1224"
              height="1147"
              src="/ellipse-1.png"
              alt="translucent blue overlay"
            />
            <Image
              className="z-1 relative xsm:pt-10"
              width="590"
              height="606"
              src="/jumbotron.png"
              alt="man carrying phone"
            />
          </div>
        </div>
      </div>
      {/* section */}
      <div className="mx-auto my-28 w-3/4">
        <h2 className="mb-16 text-center">
          <span className="font-bold">Discover Causes</span> (Courses) Near You
        </h2>
        <div className="block gap-6 md:grid md:grid-cols-3">
          {courses?.map((course) => (
            <div key={course.node.id}>
              <NavLink href={`course/${course.node.id}`}>
                <Card
                  title={course.node.name}
                  coverImage={course.node.coverImage}
                  className="h-full"
                >
                  <div className="px-4 pb-4">
                    <p className="font-sm text-gray-600">
                      {course.node.defaultLocation?.name}
                    </p>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1 text-left text-xs text-gray-400">
                        From{' '}
                        {DateTime.fromISO(
                          `${course.node.firstSessionStartDate}`
                        ).toLocaleString(DateTime.DATE_MED)}
                      </p>
                      <p className="col-span-1 text-right text-xs text-gray-400">
                        {course.node.sessions.totalCount} sessions
                      </p>
                    </div>
                  </div>
                </Card>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      {/* section */}
      <div className="mx-auto mb-28 w-3/4">
        <h2 className="mb-16 text-center xsm:mb-10">Enjoy Our Features</h2>
        <div className="block gap-4  lg:grid lg:grid-cols-8">
          <div className="col-span-2 my-auto block grid xsm:gap-5 xsm:text-center lg:grid-rows-3 lg:gap-14 lg:text-left">
            <div>
              <h6 className="text-brand-main">Manage Volunteers</h6>
              <p className="subtitle1 text-slate-500">
                Committee Members can manage volunteers by overseeing their
                contributions in specific programs.
              </p>
            </div>
            <div>
              <h6 className="text-brand-main">Manage Courses</h6>
              <p className="subtitle1 text-slate-500">
                Committee Members can create and manage courses for volunteers
                to engage in.
              </p>
            </div>
            <div>
              <h6 className="text-brand-main">Calculate Hours</h6>
              <p className="subtitle1 text-slate-500">
                Volunteers can see their accumulated hours in their profile
                dashboard.
              </p>
            </div>
          </div>
          <div className="col-span-4 col-start-3 grid place-content-center xsm:my-5">
            <Image
              src="/screens.png"
              width="600"
              height="500"
              alt="mobile and computer screens"
            />
          </div>
          <div className="col-span-2 my-auto block grid gap-14 pl-3 xsm:gap-5 xsm:text-center md:grid-rows-3 lg:text-left">
            <div>
              <h6 className="text-brand-main">View Courses by Location</h6>
              <p className="subtitle1 text-slate-500 ">
                Volunteers can view courses near them by filtering courses based
                on location.
              </p>
            </div>
            <div>
              <h6 className="text-brand-main">Attendance Taking</h6>
              <p className="subtitle1 text-slate-500">
                Committee Members can take attendance of volunteers in the
                course management system.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* section */}
      <div
        className="none relative overflow-hidden lg:block lg:max-h-96"
        style={{ backgroundColor: '#F1F4FB' }}
      >
        <Image
          className="pointer-events-none absolute xsm:-top-[200px] lg:-left-[100px] lg:-top-[150px]"
          src="/ellipse-1.png"
          width="900"
          height="600"
          alt="translucent blue ellipse"
        />
        <div className="mx-auto block w-3/4 overflow-hidden md:grid md:grid-cols-2">
          <div className="xsm:my-10 xsm:text-center lg:my-28 lg:text-left">
            <h2 className="mb-7 font-bold">Join our Community now!</h2>
            <Button size="lg" label="Get Started"></Button>
          </div>
          <div className="md:relative md:max-h-fit">
            <Image
              className="md:absolute md:top-10"
              width="796"
              height="430"
              src="/community.png"
              alt="Community"
            />
          </div>
        </div>
      </div>
      {/* footer */}
      <div
        className="none  block md:block"
        style={{ backgroundColor: '#0B2045' }}
      >
        <div className="mx-auto w-3/4 py-10 text-white xsm:text-center md:grid md:grid-cols-4 md:text-left">
          <div className="col-span-3 grid gap-5 xsm:my-8 md:grid-rows-2">
            <div>
              <p className="font-bold">BYTE.sg</p>
              <p>
                <Link href="https://www.byte.sg/" className="text-white">
                  Home
                </Link>{' '}
                |{' '}
                <Link href="https://www.byte.sg/about" className="text-white">
                  About
                </Link>{' '}
                |{' '}
                <Link
                  href="https://www.byte.sg/programs"
                  className="text-white"
                >
                  Programs
                </Link>{' '}
                |{' '}
                <Link href="https://www.byte.sg/gallery" className="text-white">
                  Gallery
                </Link>{' '}
                |{' '}
                <Link href="https://www.byte.sg/about-1" className="text-white">
                  Partners
                </Link>
              </p>
            </div>
            <div>
              <p className="font-bold">Management System</p>
              <Link href="https://www.byte.sg/about-1" className="text-white">
                Home
              </Link>
            </div>
          </div>
          <div className="my-auto grid xsm:place-content-center xsm:gap-3 xsm:text-center md:grid-rows-3 md:gap-1.5 md:text-right">
            <div className="flex flex-row gap-5 xsm:justify-center md:justify-end">
              <Link
                href="https://facebook.com/byte.sg.community"
                className="text-white"
              >
                <FacebookLogo />
              </Link>
              <Link
                href="https://www.instagram.com/byte.sg.community/"
                className="text-white"
              >
                <InstagramLogo />
              </Link>
            </div>
            <p>Copyright © {year} BYTE.sg</p>
            <p>
              <Link
                href="https://www.byte.sg/blank-page-1"
                className="text-white"
              >
                Terms of Service
              </Link>{' '}
              |{' '}
              <Link
                href="https://www.byte.sg/blank-page"
                className="text-white"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
