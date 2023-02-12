import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { HTMLAttributes, PropsWithChildren, useMemo } from 'react';

interface Prop extends HTMLAttributes<HTMLElement> {
  pillColor?: string;
}
const PillWithText: React.FC<PropsWithChildren<Prop>> = (
  prop: PropsWithChildren<Prop>
) => {
  const { pillColor = 'emerald', children } = prop;

  const genText = useMemo(() => {
    if (children) {
      const childrenString = children.toString();
      const splitArr = childrenString.split('-');
      return splitArr;
    }
    return ['0', 'No text'];
  }, [children]);

  const pillColorCalculated = useMemo(() => {
    return 'bg-' + pillColor + '-50 text-' + pillColor + '-500';
  }, [pillColor]);

  return (
    <>
      <div className="float-right inline-flex flex-wrap justify-center space-x-2">
        <div className="inline-flex">
          <span
            className={
              'align-center ml-auto inline-flex w-max cursor-pointer rounded-full py-2 pl-2 pr-3 text-sm font-semibold transition duration-300 ' +
              pillColorCalculated
            }
          >
            <ArrowUpIcon className="inline-flex h-4 w-4"></ArrowUpIcon>
            {genText[0]}
          </span>
          <span className="text-align inline-flex pt-1.5 pl-2">
            {genText[1]}
          </span>
        </div>
      </div>
    </>
  );
};

export default PillWithText;
