import { cn } from '../../../utils/cn';
import { Icons } from '../Icons';

/**
 * Brovet Select — Shared-compatible form select.
 *
 *   <Select
 *     label="Category"
 *     id="category"
 *     options={['A', 'B']} // or [{ value, label }]
 *     value={value}
 *     onChange={(e) => setValue(e.target.value)}
 *     placeholder="Select an option"
 *   />
 */
function Select({
  label,
  id,
  options = [],
  value,
  onChange,
  required = false,
  error,
  placeholder = 'Select an option',
  className = '',
  selectClassName = '',
  disabled = false,
  showPlaceholder = true,
  ...props
}) {
  return (
    <div className={cn('w-full', className)} data-slot="select">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-semibold text-neutral-dark"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          data-slot="select-trigger"
          aria-invalid={error ? true : undefined}
          className={cn(
            'w-full appearance-none rounded-md border bg-white px-3.5 py-2.5 pr-10',
            'text-sm text-neutral-dark shadow-2xs transition-colors duration-150',
            'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-red-500 focus:ring-red-400'
              : 'border-neutral-border focus:ring-primary',
            showPlaceholder && !value && 'text-neutral-muted',
            selectClassName
          )}
          {...props}
        >
          {showPlaceholder && <option value="">{placeholder}</option>}
          {options.map((opt, idx) => {
            const optValue = opt?.value !== undefined ? opt.value : opt;
            const optLabel = opt?.label !== undefined ? opt.label : opt;
            return (
              <option key={`${optValue}-${idx}`} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>

        <Icons.ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-muted"
          aria-hidden
        />
      </div>

      {error && (
        <p className="mt-1 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}

export { Select };
