import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Icons } from '../Icons';

const DropdownContext = React.createContext(null);

const useDropdownContext = () => {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) {
    throw new Error('Dropdown components must be used within <DropdownMenu>');
  }
  return ctx;
};

/**
 * Brovet Dropdown Menu — compound API (no radix/lucide).
 *
 *   <DropdownMenu>
 *     <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *     <DropdownMenuContent align="end">
 *       <DropdownMenuLabel>Account</DropdownMenuLabel>
 *       <DropdownMenuSeparator />
 *       <DropdownMenuItem onSelect={fn}>Profile</DropdownMenuItem>
 *       <DropdownMenuItem asChild>
 *         <Link to="/path">Page</Link>
 *       </DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 */
function DropdownMenu({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  ...props
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const rootRef = React.useRef(null);

  const setOpen = React.useCallback(
    (next) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange]
  );

  React.useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, setOpen]);

  const ctx = React.useMemo(
    () => ({
      open,
      setOpen,
      toggle: () => setOpen(!open),
      close: () => setOpen(false),
    }),
    [open, setOpen]
  );

  return (
    <DropdownContext.Provider value={ctx}>
      <div
        ref={rootRef}
        data-slot="dropdown-menu"
        data-state={open ? 'open' : 'closed'}
        className={cn('relative inline-flex', className)}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownMenuTrigger({
  className,
  asChild = false,
  children,
  ...props
}) {
  const { open, toggle } = useDropdownContext();

  const triggerProps = {
    type: 'button',
    'data-slot': 'dropdown-menu-trigger',
    'data-state': open ? 'open' : 'closed',
    'aria-expanded': open,
    'aria-haspopup': 'menu',
    onClick: (e) => {
      e.stopPropagation();
      props.onClick?.(e);
      toggle();
    },
    className,
    ...props,
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...triggerProps,
      className: cn(children.props.className, className),
      onClick: (e) => {
        children.props.onClick?.(e);
        triggerProps.onClick(e);
      },
    });
  }

  return (
    <button {...triggerProps} className={cn('inline-flex items-center', className)}>
      {children}
    </button>
  );
}

function DropdownMenuContent({
  className,
  align = 'end',
  side = 'bottom',
  children,
  ...props
}) {
  const { open } = useDropdownContext();

  if (!open) return null;

  const alignClass =
    align === 'start'
      ? 'left-0'
      : align === 'center'
        ? 'left-1/2 -translate-x-1/2'
        : 'right-0';

  const sideClass = side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';

  return (
    <div
      role="menu"
      data-slot="dropdown-menu-content"
      data-align={align}
      data-side={side}
      className={cn(
        'absolute z-50 min-w-[11rem] overflow-hidden rounded-lg border border-neutral-border',
        'bg-white py-1 text-neutral-body shadow-premium',
        'origin-top-right fade-in',
        sideClass,
        alignClass,
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuGroup({ className, ...props }) {
  return (
    <div data-slot="dropdown-menu-group" className={cn('py-1', className)} {...props} />
  );
}

function DropdownMenuLabel({ className, ...props }) {
  return (
    <div
      data-slot="dropdown-menu-label"
      className={cn(
        'px-3 py-2 text-xs font-bold uppercase tracking-wider text-neutral-muted',
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  variant = 'default',
  asChild = false,
  disabled = false,
  onSelect,
  children,
  ...props
}) {
  const { close } = useDropdownContext();

  const itemClass = cn(
    'relative flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm outline-none select-none transition-colors',
    'focus:bg-neutral-light focus:text-primary',
    disabled && 'pointer-events-none opacity-50',
    variant === 'destructive'
      ? 'font-semibold text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700'
      : 'text-neutral-body hover:bg-neutral-light hover:text-primary',
    className
  );

  const handleSelect = (e) => {
    if (disabled) return;
    onSelect?.(e);
    props.onClick?.(e);
    close();
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      role: 'menuitem',
      'data-slot': 'dropdown-menu-item',
      'data-variant': variant,
      className: cn(itemClass, children.props.className),
      onClick: (e) => {
        children.props.onClick?.(e);
        handleSelect(e);
      },
    });
  }

  return (
    <button
      type="button"
      role="menuitem"
      data-slot="dropdown-menu-item"
      data-variant={variant}
      disabled={disabled}
      className={itemClass}
      onClick={handleSelect}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuSeparator({ className, ...props }) {
  return (
    <div
      role="separator"
      data-slot="dropdown-menu-separator"
      className={cn('-mx-0 my-1 h-px bg-neutral-border', className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ className, ...props }) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn('ml-auto text-xs tracking-widest text-neutral-muted', className)}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  checked = false,
  children,
  onCheckedChange,
  ...props
}) {
  return (
    <DropdownMenuItem
      className={cn('pr-8', className)}
      onSelect={() => onCheckedChange?.(!checked)}
      {...props}
    >
      {children}
      {checked && (
        <Icons.Check className="absolute right-2 h-4 w-4 text-primary" />
      )}
    </DropdownMenuItem>
  );
}

function DropdownMenuRadioGroup({ value, onValueChange, children, className, ...props }) {
  return (
    <div
      role="radiogroup"
      data-slot="dropdown-menu-radio-group"
      className={cn(className)}
      data-value={value}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          checked: child.props.value === value,
          onSelect: () => onValueChange?.(child.props.value),
        });
      })}
    </div>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  checked,
  value,
  onSelect,
  ...props
}) {
  return (
    <DropdownMenuItem
      className={cn('pr-8', className)}
      onSelect={onSelect}
      data-value={value}
      {...props}
    >
      {children}
      {checked && (
        <Icons.Check className="absolute right-2 h-4 w-4 text-primary" />
      )}
    </DropdownMenuItem>
  );
}

/* Portal no-op kept for API compatibility */
function DropdownMenuPortal({ children }) {
  return children;
}

function DropdownMenuSub({ children, className, ...props }) {
  return (
    <div data-slot="dropdown-menu-sub" className={cn(className)} {...props}>
      {children}
    </div>
  );
}

function DropdownMenuSubTrigger({ className, children, ...props }) {
  return (
    <div
      data-slot="dropdown-menu-sub-trigger"
      className={cn(
        'flex cursor-default items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-body',
        className
      )}
      {...props}
    >
      {children}
      <Icons.ChevronRight className="ml-auto h-4 w-4 text-neutral-muted" />
    </div>
  );
}

function DropdownMenuSubContent({ className, children, ...props }) {
  return (
    <div
      data-slot="dropdown-menu-sub-content"
      className={cn(
        'min-w-[10rem] rounded-lg border border-neutral-border bg-white p-1 shadow-premium',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
