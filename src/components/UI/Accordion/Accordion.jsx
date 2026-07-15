import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Icons } from '../Icons';

const AccordionContext = React.createContext(null);
const AccordionItemContext = React.createContext(null);

const useAccordionContext = () => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) {
    throw new Error('Accordion compound components must be used within <Accordion>');
  }
  return ctx;
};

const useAccordionItemContext = () => {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error('AccordionTrigger and AccordionContent must be used within <AccordionPanel>');
  }
  return ctx;
};

/**
 * Brovet Accordion — compound + simple API.
 *
 * Compound:
 *   <Accordion value={v} onValueChange={setV}>
 *     <AccordionPanel value="a">
 *       <AccordionTrigger>Title</AccordionTrigger>
 *       <AccordionContent>Body</AccordionContent>
 *     </AccordionPanel>
 *   </Accordion>
 *
 * Simple (legacy Shared API):
 *   <SimpleAccordionItem title="Q?" isOpen={open} onToggle={fn}>Answer</SimpleAccordionItem>
 */
function Accordion({
  className,
  type = 'single',
  collapsible = true,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? (type === 'multiple' ? [] : null)
  );
  const activeValue = value !== undefined ? value : internalValue;

  const setValue = React.useCallback(
    (itemValue) => {
      let next;

      if (type === 'multiple') {
        const current = Array.isArray(activeValue) ? activeValue : [];
        next = current.includes(itemValue)
          ? current.filter((v) => v !== itemValue)
          : [...current, itemValue];
      } else if (activeValue === itemValue && collapsible) {
        next = null;
      } else {
        next = itemValue;
      }

      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    },
    [activeValue, collapsible, onValueChange, type, value]
  );

  const isOpen = React.useCallback(
    (itemValue) => {
      if (type === 'multiple') {
        return Array.isArray(activeValue) && activeValue.includes(itemValue);
      }
      return activeValue === itemValue;
    },
    [activeValue, type]
  );

  const ctx = React.useMemo(
    () => ({ type, isOpen, setValue }),
    [isOpen, setValue, type]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div
        data-slot="accordion"
        className={cn('flex w-full flex-col gap-3.5', className)}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionPanel({
  className,
  value,
  disabled = false,
  children,
  ...props
}) {
  const { isOpen, setValue } = useAccordionContext();
  const open = value != null && isOpen(value);

  const ctx = React.useMemo(
    () => ({
      value,
      open,
      disabled,
      toggle: () => {
        if (!disabled && value != null) setValue(value);
      },
    }),
    [disabled, open, setValue, value]
  );

  return (
    <AccordionItemContext.Provider value={ctx}>
      <div
        data-slot="accordion-item"
        data-state={open ? 'open' : 'closed'}
        className={cn(
          'overflow-hidden rounded-lg border border-neutral-border bg-white shadow-2xs transition-all duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

function AccordionTrigger({ className, children, ...props }) {
  const { open, disabled, toggle } = useAccordionItemContext();

  return (
    <button
      type="button"
      data-slot="accordion-trigger"
      aria-expanded={open}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        'flex w-full items-center justify-between gap-3 px-5 py-4 text-left',
        'text-sm font-semibold text-neutral-dark transition-colors',
        'hover:bg-neutral-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <Icons.ChevronDown
        className={cn(
          'h-5 w-5 shrink-0 transition-transform duration-200',
          open ? 'rotate-180 text-primary' : 'text-neutral-muted'
        )}
      />
    </button>
  );
}

function AccordionContent({ className, children, ...props }) {
  const { open } = useAccordionItemContext();

  if (!open) return null;

  return (
    <div
      data-slot="accordion-content"
      className={cn(
        'border-t border-neutral-light bg-slate-50/50 px-5 pb-5 pt-3',
        'text-sm leading-relaxed text-neutral-body',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SimpleAccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
  className,
  contentClassName,
}) {
  return (
    <div
      data-slot="accordion-item"
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(
        'overflow-hidden rounded-lg border border-neutral-border bg-white shadow-2xs transition-all duration-200',
        className
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className={cn(
          'flex w-full items-center justify-between gap-3 px-5 py-4 text-left',
          'text-sm font-semibold text-neutral-dark transition-colors hover:bg-neutral-light',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset'
        )}
      >
        <span className="flex-1">{title}</span>
        <Icons.ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 transition-transform duration-200',
            isOpen ? 'rotate-180 text-primary' : 'text-neutral-muted'
          )}
        />
      </button>
      {isOpen && (
        <div
          data-slot="accordion-content"
          className={cn(
            'border-t border-neutral-light bg-slate-50/50 px-5 pb-5 pt-3',
            'text-sm leading-relaxed text-neutral-body',
            contentClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export {
  Accordion,
  AccordionPanel,
  AccordionTrigger,
  AccordionContent,
  SimpleAccordionItem,
  SimpleAccordionItem as AccordionItem,
};
