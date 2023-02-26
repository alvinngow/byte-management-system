import { ArrowUpIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { DateTime, Duration } from 'luxon';
import React from 'react';

import Chip from '../Chip';

interface Props extends React.PropsWithChildren {
  className?: string;
  label: string;
  currentData: string;
  pastData?: string;
  pastDataLabel?: string;
  change: number | null;
}

/**
 * This React component is similar to a HTML <a> tag,
 * but it is intended for client-side redirects.
 */
const ClassOverviewCard: React.FC<Props> = function (props) {
  const {
    className,
    label,
    currentData,
    pastData,
    pastDataLabel,
    children,
    change,
  } = props;

  return (
    <div className="mb-5 pr-4">
      <div
        className={classNames(
          'mb-2-5 col-span-1 ml-3 text-left font-medium text-gray-900',
          className
        )}
      >
        {/* upcoming courses */}
        <div className="flex">
          <div className="text-secondary mr-2 h-6 w-6">{children}</div>
          <span className="text-secondary mb-3 inline-flex">{label}</span>
        </div>

        {/* number */}
        <div className="relative inline-flex w-full xsm:pr-6 md:pr-0">
          <h3 className="mr-auto inline">{currentData}</h3>
          {change != null && (
            <div className="justify-end">
              <Chip
                scheme={change > 0 ? 'success' : 'danger'}
                className="text-secondary caption ml-5 whitespace-nowrap"
                text=""
                number={change.toString()}
                Icon={ArrowUpIcon}
              />
            </div>
          )}
        </div>

        {/* ignore first */}
        <span className="mb-3 inline-flex text-gray-500">{pastData}</span>
        <p className="mr-auto text-3xl">{pastDataLabel}</p>
      </div>
    </div>
  );
};
export default ClassOverviewCard;
