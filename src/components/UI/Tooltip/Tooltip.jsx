import * as React from 'react';
import { cn } from '../../../utils/cn';

const TooltipContext = React.createContext(null);

const useTooltipContext = () => {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) {
    throw new Error('TooltipTrigger and TooltipContent must be used within <Tooltip>');
  }
  return ctx;
};

const sideClasses = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
};

const arrowClasses = {
  top: 'left-1/2 top-full -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-neutral-dark',
  bottom: 'left-1/2 bottom-full -translate-x-1/2 border-x-4 border-b-4 border-x-transparent border-b-neutral-dark',
  left: 'left-full top-1/2 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-neutral-dark',
  right: 'right-full top-1/2 -translate-y-1/2 border-y-4 border-r-4 border-y-transparent border-r-neutral-dark',
};

/**
 * Brovet Tooltip — compound + simple API.
 *
 * Compound:
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Hint text</TooltipContent>
 *   </Tooltip>
 *
 * Simple:
 *   <SimpleTooltip content="Hint"><span>MOQ</span></SimpleTooltip>
 */
function TooltipProvider({ children, delayDuration = 200, ...props }) {
  return (
    <div data-slot="tooltip-provider" data-delay={delayDuration} {...props}>
      {children}
    </div>
  );
}

function Tooltip({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration = 200,
  children,
  className,
  ...props
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const timeoutRef = React.useRef(null);

  const setOpen = React.useCallback(
    (next) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange]
  );

  const show = React.useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
  }, [delayDuration, setOpen]);

  const hide = React.useCallback(() => {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  }, [setOpen]);

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const ctx = React.useMemo(
    () => ({ open, show, hide }),
    [hide, open, show]
  );

  return (
    <TooltipContext.Provider value={ctx}>
      <span
        data-slot="tooltip"
        className={cn('relative inline-flex', className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}
      </span>
    </TooltipContext.Provider>
  );
}

function TooltipTrigger({ className, asChild = false, children, ...props }) {
  const { open } = useTooltipContext();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      'data-slot': 'tooltip-trigger',
      'data-state': open ? 'open' : 'closed',
      'aria-describedby': open ? 'tooltip-content' : undefined,
      ...props,
      className: cn(children.props.className, className),
    });
  }

  return (
    <span
      data-slot="tooltip-trigger"
      data-state={open ? 'open' : 'closed'}
      className={cn('inline-flex cursor-default', className)}
      {...props}
    >
      {children}
    </span>
  );
}

function TooltipContent({
  className,
  side = 'top',
  hideArrow = false,
  children,
  ...props
}) {
  const { open } = useTooltipContext();

  if (!open) return null;

  return (
    <span
      id="tooltip-content"
      role="tooltip"
      data-slot="tooltip-content"
      data-side={side}
      className={cn(
        'pointer-events-none absolute z-50 w-max max-w-xs',
        'rounded-md bg-neutral-dark px-2.5 py-1.5',
        'text-2xs font-medium leading-snug text-white shadow-lg',
        'animate-in fade-in-0 zoom-in-95',
        sideClasses[side] ?? sideClasses.top,
        className
      )}
      {...props}
    >
      {children}
      {!hideArrow && (
        <span
          aria-hidden
          data-slot="tooltip-arrow"
          className={cn('absolute size-0', arrowClasses[side] ?? arrowClasses.top)}
        />
      )}
    </span>
  );
}

function TooltipArrow({ className, side = 'top', ...props }) {
  return (
    <span
      aria-hidden
      data-slot="tooltip-arrow"
      className={cn('absolute size-0', arrowClasses[side] ?? arrowClasses.top, className)}
      {...props}
    />
  );
}

function SimpleTooltip({
  content,
  side = 'top',
  delayDuration = 200,
  hideArrow = false,
  className,
  contentClassName,
  children,
}) {
  if (!content) return children;

  return (
    <Tooltip className={className} delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} hideArrow={hideArrow} className={contentClassName}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
  SimpleTooltip,
};
