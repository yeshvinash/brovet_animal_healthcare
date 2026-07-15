import React, { useEffect } from 'react';
import { Icons } from './Icons';
import { Button } from './Button';

// ==========================================
// 1. BUTTON (re-export Brovet themed Button)
// ==========================================
export { Button };

// ==========================================
// 2. FORM ELEMENTS: INPUT, TEXTAREA, SELECT
// ==========================================
export const Input = ({ 
  label, 
  id, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  error, 
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-neutral-dark mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3.5 py-2.5 text-sm text-neutral-dark bg-white border rounded-md shadow-2xs transition-colors duration-150 placeholder:text-neutral-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? 'border-red-500 focus:ring-red-400' : 'border-neutral-border focus:ring-primary'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export const Textarea = ({ 
  label, 
  id, 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  error, 
  rows = 4, 
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-neutral-dark mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`w-full px-3.5 py-2.5 text-sm text-neutral-dark bg-white border rounded-md shadow-2xs transition-colors duration-150 placeholder:text-neutral-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? 'border-red-500 focus:ring-red-400' : 'border-neutral-border focus:ring-primary'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

// ==========================================
// 2b. SELECT (re-export Brovet themed Select)
// ==========================================
export { Select } from './Select';


// ==========================================
// 3. MODAL
// ==========================================
export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-neutral-border overflow-hidden fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-border bg-neutral-light">
          <h3 id="modal-title" className="text-md font-bold text-neutral-dark">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-muted hover:text-neutral-dark hover:bg-neutral-border rounded-md transition-colors"
            aria-label="Close dialog"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. ACCORDION (re-export Brovet themed Accordion)
// ==========================================
export {
  SimpleAccordionItem as AccordionItem,
  Accordion,
  AccordionPanel,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

// ==========================================
// 5. TABS (re-export Brovet themed Tabs)
// ==========================================
export { SimpleTabs as Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

// ==========================================
// 5b. BADGE (re-export Brovet themed Badge)
// ==========================================
export { Badge } from './Badge';

// ==========================================
// 5c. TOOLTIP (re-export Brovet themed Tooltip)
// ==========================================
export {
  SimpleTooltip as Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './Tooltip';

// ==========================================
// 5d. TABLE / DATATABLE
// ==========================================
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './Table';
export { DataTable } from './DataTable';

// ==========================================
// 5e. DROPDOWN
// ==========================================
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './Dropdown';

// ==========================================
// 5f. CALENDAR / DATE PICKER
// ==========================================
export { Calendar, DatePicker } from './Calendar';


// ==========================================
// 6. BREADCRUMBS (re-export Brovet themed Breadcrumb)
// ==========================================
export {
  SimpleBreadcrumbs as Breadcrumbs,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './Breadcrumb';


// ==========================================
// 7. PAGINATION (re-export Brovet themed Pagination)
// ==========================================
export { SimplePagination as Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from './Pagination';

// ==========================================
// 8. LOADER / SKELETON
// ==========================================
export const Loader = ({ className = "w-8 h-8", color = "text-primary" }) => {
  return (
    <div className="flex items-center justify-center p-6">
      <svg className={`animate-spin ${className} ${color}`} fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  );
};

export const Skeleton = ({ className = "h-4 w-full" }) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-md ${className}`} />
  );
};

// ==========================================
// 9. ALERTS
// ==========================================
export const Alert = ({ type = 'success', message, onClose, className = '' }) => {
  const styles = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200'
  };

  const icons = {
    success: <Icons.CheckCircle className="w-5 h-5 text-emerald-600" />,
    error: <Icons.AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Icons.AlertCircle className="w-5 h-5 text-blue-600" />,
    warning: <Icons.AlertCircle className="w-5 h-5 text-amber-600" />
  };

  return (
    <div className={`flex items-center justify-between p-4 border rounded-md shadow-2xs ${styles[type]} ${className} fade-in`}>
      <div className="flex items-center gap-3">
        {icons[type]}
        <span className="text-sm font-semibold leading-tight">{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="p-1 hover:bg-black/5 rounded transition-colors">
          <Icons.X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// ==========================================
// 10. EMPTY STATE
// ==========================================
export const EmptyState = ({ title = "No data found", description, actionText, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-neutral-light border border-dashed border-neutral-border rounded-xl">
      <Icons.FileText className="w-12 h-12 text-primary/35 mb-4" />
      <h4 className="text-base font-bold text-neutral-dark mb-1">{title}</h4>
      {description && <p className="text-sm text-neutral-body max-w-sm mb-4 leading-relaxed">{description}</p>}
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>{actionText}</Button>
      )}
    </div>
  );
};
