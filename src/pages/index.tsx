import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Card } from 'flowbite-react';
import Image from 'next/image';

import Button from '../../src/components/Button';

export default function Home() {
  return (
    <div>
      {/* jumbotron */}
      <div
        className="none relative overflow-hidden rounded-b-[50px] md:block"
        style={{ backgroundColor: '#F1F4FB' }}
      >
        {/* nav */}
        <nav className="rounded border-gray-200 px-2 py-2.5 sm:px-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <a href="https://flowbite.com/" className="flex items-center">
              <Image
                src="/star.png"
                width="30"
                height="100"
                className="mr-3 h-6 sm:h-9"
                alt="Byte Logo"
              />
            </a>
            <div className="flex gap-2 md:order-2">
              <Button className="flex gap-2" label="Back to Byte.sg">
                <ArrowLeftIcon width="24" />
              </Button>
              <Button label="Sign in"></Button>
            </div>
          </div>
        </nav>
        <div className="mx-auto block w-3/4 md:grid md:grid-cols-2">
          <div className="my-auto">
            <h1 className="my-14 w-1/2 text-6xl font-bold">
              Byte&apos;s Volunteering Management System
            </h1>
            <div className="flex gap-2 md:order-2">
              <Button label="Get Started"></Button>
              <Button label="Contact us"></Button>
            </div>
          </div>
          <div>
            <Image
              className="absolute bottom-[50px] -right-32"
              width="1224"
              height="1147"
              src="/ellipse-1.png"
              alt="translucent blue overlay"
            />
            <Image
              className="z-1 relative"
              width="714"
              height="733"
              src="/jumbotron.png"
              alt="man carrying phone"
            />
          </div>
        </div>
      </div>
      {/* section */}
      <div className="mx-auto my-28 w-3/4">
        <h1 className="mb-16 text-center text-4xl">
          <strong>Discover Causes</strong> (Courses) Near You
        </h1>
        <div className="block gap-6 md:grid md:grid-cols-4">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
      {/* section */}
      <div className="mx-auto mb-28 w-3/4">
        <h1 className="mb-16 text-center text-4xl">Enjoy Our Features</h1>
        <div className="block gap-4 md:grid md:grid-cols-8">
          <div className="col-span-2 my-auto block gap-14 md:grid md:grid-rows-3">
            <div>
              <h6>Manage Volunteers</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur. Congue ut mi amet non
                elementum in.
              </p>
            </div>
            <div>
              <h6>Manage Volunteers</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur. Congue ut mi amet non
                elementum in.
              </p>
            </div>
            <div>
              <h6>Manage Volunteers</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur. Congue ut mi amet non
                elementum in.
              </p>
            </div>
          </div>
          <div className="col-span-4 col-start-3">
            <Image
              src="/screens.png"
              width="780"
              height="576"
              alt="mobile and computer screens"
            />
          </div>
          <div className="col-span-2 my-auto block gap-14 pl-3 md:grid md:grid-rows-3">
            <div>
              <h6>Manage Volunteers</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur. Congue ut mi amet non
                elementum in.
              </p>
            </div>
            <div>
              <h6>Manage Volunteers</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur. Congue ut mi amet non
                elementum in.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* section */}
      <div
        className="none relative max-h-96 overflow-hidden md:block"
        style={{ backgroundColor: '#F1F4FB' }}
      >
        <Image
          className="absolute -left-[100px] -top-[150px]"
          src="/ellipse-1.png"
          width="900"
          height="600"
          alt="translucent blue ellipse"
        />
        <div className="mx-auto block w-3/4 overflow-hidden md:grid md:grid-cols-2">
          <div className="my-28 gap-8 md:grid md:grid-rows-2">
            <h1 className="text-4xl font-bold">Join our Community now!</h1>
            <Button label="Get Started"></Button>
          </div>
          <div className="relative max-h-fit">
            <Image
              className="absolute top-10"
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
        <div className="mx-auto w-3/4 py-10 text-white md:grid md:grid-cols-4">
          <div className="col-span-3 gap-5 md:grid md:grid-rows-2">
            <div>
              <p className="font-bold">BYTE.sg</p>
              <p>Home | About | Programs | Gallery | Articles | Partners</p>
            </div>
            <div>
              <p className="font-bold">Management System</p>
              <p>Home</p>
            </div>
          </div>
          <div className="my-auto gap-1.5 md:grid md:grid-rows-3">
            <div className="flex flex-row justify-end gap-5">
              <p>Facebook</p>
              <p>Insta</p>
            </div>
            <p className="text-right">Copyright © 2023 BYTE.sg</p>
            <p className="text-right">Terms of Service | Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
