import { ArrowUpIcon } from '@heroicons/react/24/outline';
// import Chip from 'Chip';
import classNames from 'classnames';
import React from 'react';

interface Props extends React.PropsWithChildren {
  className?: string;
  label: string;
  currentData: string;
  pastData?: string;
  pastDataLabel?: string;
}

/**
 * This React component is similar to a HTML <a> tag,
 * but it is intended for client-side redirects.
 */
const ClassOverviewCard: React.FC<Props> = function (props) {
  const { className, label, currentData, pastData, pastDataLabel, children } =
    props;

  return (
    <div
      className={classNames(
        'col-span-1 mr-2 mb-2 px-5 py-2.5 text-left font-medium text-gray-900',
        className
      )}
    >
      <div className="inline-flex">
        {children}
        <span className="mb-3 inline-flex text-gray-500">{label}</span>
      </div>

      <p className="mr-auto text-3xl">{currentData}</p>

      <span className="mb-3 inline-flex text-gray-500">{pastData}</span>
      <p className="mr-auto text-3xl">{pastDataLabel}</p>
      <div className="inline-flex flex-wrap justify-center space-x-2">
        <div className="inline-flex">
          <span className="align-center ml-auto inline-flex w-max cursor-pointer rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-500 transition duration-300">
            <ArrowUpIcon className="inline-flex h-4 w-4"></ArrowUpIcon>2{' '}
          </span>
          <span className="text-align inline-flex">hours this week</span>
        </div>
      </div>
    </div>
  );
};
export default ClassOverviewCard;
