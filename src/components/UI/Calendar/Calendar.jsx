import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Icons } from '../Icons';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const isSameDay = (a, b) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const isBefore = (a, b) => startOfDay(a).getTime() < startOfDay(b).getTime();
const isAfter = (a, b) => startOfDay(a).getTime() > startOfDay(b).getTime();

const formatDisplay = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatISO = (date) => {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const parseISO = (value) => {
  if (!value) return null;
  if (value instanceof Date) return startOfDay(value);
  const [y, m, d] = String(value).split('-').map(Number);
  if (!y || !m || !d) return null;
  return startOfDay(new Date(y, m - 1, d));
};

function buildMonthCells(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = startPad - 1; i >= 0; i -= 1) {
    cells.push({
      date: new Date(year, month - 1, prevDays - i),
      outside: true,
    });
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({ date: new Date(year, month, d), outside: false });
  }
  while (cells.length % 7 !== 0) {
    const next = cells.length - (startPad + daysInMonth) + 1;
    cells.push({ date: new Date(year, month + 1, next), outside: true });
  }
  return cells;
}

/**
 * Brovet Calendar — month grid (no react-day-picker).
 *
 *   <Calendar
 *     mode="single"
 *     selected={date}
 *     onSelect={setDate}
 *     disabled={{ before: new Date() }}
 *   />
 */
function Calendar({
  className,
  mode = 'single',
  selected,
  onSelect,
  month: controlledMonth,
  onMonthChange,
  disabled,
  numberOfMonths = 1,
  ...props
}) {
  const today = React.useMemo(() => startOfDay(new Date()), []);
  const [internalMonth, setInternalMonth] = React.useState(() =>
    startOfDay(selected instanceof Date ? selected : new Date())
  );

  const viewMonth = controlledMonth ? startOfDay(controlledMonth) : internalMonth;

  const setViewMonth = (next) => {
    if (controlledMonth === undefined) setInternalMonth(next);
    onMonthChange?.(next);
  };

  const selectedDate =
    mode === 'single'
      ? selected instanceof Date
        ? startOfDay(selected)
        : parseISO(selected)
      : null;

  const isDisabled = (date) => {
    if (!disabled) return false;
    if (typeof disabled === 'function') return disabled(date);
    if (disabled.before && isBefore(date, disabled.before)) return true;
    if (disabled.after && isAfter(date, disabled.after)) return true;
    if (Array.isArray(disabled.dates)) {
      return disabled.dates.some((d) => isSameDay(parseISO(d) || d, date));
    }
    return false;
  };

  const months = Array.from({ length: numberOfMonths }, (_, i) => {
    const m = new Date(viewMonth);
    m.setMonth(m.getMonth() + i);
    return m;
  });

  const goPrev = () => {
    const next = new Date(viewMonth);
    next.setMonth(next.getMonth() - 1);
    setViewMonth(startOfDay(next));
  };

  const goNext = () => {
    const next = new Date(viewMonth);
    next.setMonth(next.getMonth() + 1);
    setViewMonth(startOfDay(next));
  };

  return (
    <div
      data-slot="calendar"
      className={cn(
        'w-fit rounded-xl border border-neutral-border bg-white p-3 shadow-premium',
        className
      )}
      {...props}
    >
      <div className={cn('flex gap-4', numberOfMonths > 1 ? 'flex-col sm:flex-row' : 'flex-col')}>
        {months.map((monthDate, monthIdx) => {
          const cells = buildMonthCells(monthDate);
          const label = monthDate.toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric',
          });

          return (
            <div key={`${monthDate.getFullYear()}-${monthDate.getMonth()}`} className="flex flex-col gap-3">
              <div className="relative flex items-center justify-center pt-1">
                {monthIdx === 0 && (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-0 inline-flex size-8 items-center justify-center rounded-md text-neutral-muted transition-colors hover:bg-neutral-light hover:text-primary"
                    aria-label="Previous month"
                  >
                    <Icons.ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                <span className="text-sm font-bold text-primary">{label}</span>
                {monthIdx === months.length - 1 && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-0 inline-flex size-8 items-center justify-center rounded-md text-neutral-muted transition-colors hover:bg-neutral-light hover:text-primary"
                    aria-label="Next month"
                  >
                    <Icons.ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-7 gap-0.5">
                {WEEKDAYS.map((d) => (
                  <div
                    key={d}
                    className="flex h-8 w-9 items-center justify-center text-2xs font-bold uppercase tracking-wider text-neutral-muted"
                  >
                    {d}
                  </div>
                ))}

                {cells.map(({ date, outside }) => {
                  const disabledDay = isDisabled(date);
                  const selectedDay = selectedDate && isSameDay(date, selectedDate);
                  const todayDay = isSameDay(date, today);

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      disabled={disabledDay}
                      onClick={() => {
                        if (disabledDay) return;
                        onSelect?.(date);
                      }}
                      className={cn(
                        'relative flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors',
                        !disabledDay && 'hover:bg-neutral-light hover:text-primary',
                        outside && 'text-neutral-border',
                        !outside && !selectedDay && 'text-neutral-dark',
                        todayDay && !selectedDay && 'font-bold text-primary ring-1 ring-primary/20',
                        selectedDay && 'bg-primary font-semibold text-white hover:bg-primary-hover hover:text-white',
                        disabledDay && 'cursor-not-allowed text-neutral-border opacity-50'
                      )}
                      aria-pressed={selectedDay || undefined}
                      aria-current={todayDay ? 'date' : undefined}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Calendar.displayName = 'Calendar';

/**
 * Brovet DatePicker — form-friendly field that opens Calendar.
 *
 *   <DatePicker
 *     label="Required by"
 *     value={isoString}
 *     onChange={(iso) => setValue(iso)}
 *   />
 */
function DatePicker({
  label,
  id,
  value,
  onChange,
  required = false,
  error,
  placeholder = 'Select a date',
  className = '',
  disabledDates,
  minDate,
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);
  const selected = parseISO(value);

  React.useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const disabled = React.useMemo(() => {
    if (typeof disabledDates === 'function' || disabledDates?.before || disabledDates?.after) {
      return disabledDates;
    }
    return {
      before: minDate ? startOfDay(minDate) : startOfDay(new Date()),
      ...(disabledDates || {}),
    };
  }, [disabledDates, minDate]);

  return (
    <div ref={rootRef} className={cn('relative w-full', className)} data-slot="date-picker">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-neutral-dark">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <button
        type="button"
        id={id}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-md border bg-white px-3.5 py-2.5 text-left text-sm shadow-2xs transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          error ? 'border-red-500' : 'border-neutral-border',
          selected ? 'text-neutral-dark' : 'text-neutral-muted'
        )}
      >
        <span className="inline-flex items-center gap-2">
          <Icons.Calendar className="h-4 w-4 text-primary" />
          {selected ? formatDisplay(selected) : placeholder}
        </span>
        <Icons.ChevronDown className="h-4 w-4 text-neutral-muted" />
      </button>

      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}

      {open && (
        <div className="absolute z-50 mt-2">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => {
              onChange?.(formatISO(date));
              setOpen(false);
            }}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}

export { Calendar, DatePicker, formatDisplay, formatISO, parseISO };
