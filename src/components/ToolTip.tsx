import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React from 'react';

interface ToolTipProps {
  buttonText?: string;
  toolTipText: string;
}

const ToolTip: React.FC<React.PropsWithChildren<ToolTipProps>> = function (
  props
) {
  const { children, buttonText, toolTipText } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const arrowRef = React.useRef(null);

  const {
    x,
    y,
    refs,
    strategy,
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    placement,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right',
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  // Event listeners to change the open state
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: 'tooltip' });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const staticSide: any = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]];

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()} className="flex">
        {buttonText}
        {children}
      </button>
      <FloatingPortal>
        {isOpen && (
          <div
            className="Tooltip body2 text-gray-100"
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'fit-content',
              maxWidth: '190px',
              whiteSpace: 'normal',
              padding: '15px 16px',
              borderRadius: '10px',
              background: 'rgb(75 85 99)',
            }}
            {...getFloatingProps()}
          >
            {toolTipText}
            <div
              ref={arrowRef}
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                background: 'rgb(75 85 99)',
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
                [staticSide]: '-5px',
                transform: 'rotate(45deg)',
              }}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default ToolTip;
