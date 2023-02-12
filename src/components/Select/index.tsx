import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import React, { useState } from 'react';

export interface SelectItem {
  label: string;
  value: string;
}

interface Props
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  items: SelectItem[];
  label: string;
  value: string | null;
  onChange: (value: string) => void;
}

const Select: React.FC<Props> = function (props) {
  const { items, value, label, className, onChange, ...otherProps } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const { x, y, strategy, refs, reference, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const selectedItemIndex = React.useMemo(() => {
    return items.findIndex((item) => item.value === value);
  }, [items, value]);

  const selectedItem = React.useMemo(() => {
    return items[selectedItemIndex] ?? null;
  }, [items, selectedItemIndex]);

  const [focusedIndex, setFocusedIndex] = useState(-1);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFocusedIndex(selectedItemIndex);
  }, [isOpen, selectedItemIndex]);

  const handleKeyDown = React.useCallback<React.KeyboardEventHandler>(
    (e) => {
      switch (e.key) {
        case 'ArrowUp': {
          setFocusedIndex((prevState) => Math.max(-1, prevState - 1));
          break;
        }
        case 'ArrowDown': {
          setFocusedIndex((prevState) =>
            Math.min(prevState + 1, items.length - 1)
          );
          break;
        }
        case 'Enter': {
          onChange(items[focusedIndex].value);
          setIsOpen(false);
          break;
        }
      }
    },
    [focusedIndex, items, onChange]
  );

  return (
    <>
      <button
        ref={refs.setReference}
        className={classNames(className, 'flex flex-col')}
        {...otherProps}
        {...getReferenceProps()}
      >
        <div className="flex w-full flex-col">
          <span className="mb-1 self-start text-xs text-gray-400">{label}</span>
          <div className="border-b-primary-color flex items-center justify-between border-b-2">
            <span
              className={classNames('text-md mb-1', {
                'bg-gray-600': selectedItem == null,
              })}
            >
              {selectedItem?.label ?? 'Not selected'}
            </span>
            {isOpen ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            className="flex w-full flex-col gap-y-0.5 overflow-hidden rounded-b-lg bg-gray-300 shadow-lg"
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            onKeyDown={handleKeyDown}
            {...getFloatingProps()}
          >
            {items.map((item, index) => (
              <span
                key={item.value}
                className={classNames('text-md bg-white px-2 py-2', {
                  'bg-gray-200': index === focusedIndex,
                })}
                onClick={() => {
                  onChange(item.value);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                {item.label}
              </span>
            ))}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};

export default Select;