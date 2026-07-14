import React, { useEffect } from 'react';
import { Icons } from './Icons';

// ==========================================
// 1. BUTTON
// ==========================================
export const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  onClick, 
  disabled = false, 
  className = '', 
  icon
}) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-dark focus:ring-primary shadow-sm hover:shadow-md",
    secondary: "bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary shadow-sm",
    outline: "border border-neutral-border text-neutral-dark hover:bg-neutral-light focus:ring-primary",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 shadow-sm",
    accent: "bg-accent text-white hover:bg-accent-hover focus:ring-accent shadow-sm",
    ghost: "text-neutral-body hover:bg-neutral-light hover:text-primary focus:ring-primary"
  };

  const sizes = "px-4 py-2 text-sm";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

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
        className={`w-full px-3.5 py-2.5 text-sm text-neutral-dark bg-white border rounded-md shadow-2xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
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
        className={`w-full px-3.5 py-2.5 text-sm text-neutral-dark bg-white border rounded-md shadow-2xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? 'border-red-500 focus:ring-red-400' : 'border-neutral-border focus:ring-primary'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export const Select = ({ 
  label, 
  id, 
  options = [], 
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
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3.5 py-2.5 text-sm text-neutral-dark bg-white border rounded-md shadow-2xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? 'border-red-500 focus:ring-red-400' : 'border-neutral-border focus:ring-primary'
        }`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value !== undefined ? opt.value : opt}>
            {opt.label !== undefined ? opt.label : opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

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
// 4. ACCORDION / FAQ ITEM
// ==========================================
export const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border border-neutral-border rounded-lg bg-white overflow-hidden shadow-2xs mb-3.5 transition-all duration-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-neutral-dark hover:bg-neutral-light transition-colors"
      >
        <span>{title}</span>
        {isOpen ? (
          <Icons.ChevronUp className="w-5 h-5 text-primary" />
        ) : (
          <Icons.ChevronDown className="w-5 h-5 text-neutral-muted" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-sm text-neutral-body border-t border-neutral-light leading-relaxed bg-slate-50/50">
          {children}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 5. TABS
// ==========================================
export const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`border-b border-neutral-border flex flex-wrap -mb-px ${className}`}>
      {tabs.map((tab, idx) => {
        const id = tab.id || idx;
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-150 ${
              active
                ? 'border-primary text-primary font-bold bg-primary-light/35'
                : 'border-transparent text-neutral-muted hover:text-neutral-dark hover:border-neutral-border'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

// ==========================================
// 6. BREADCRUMBS
// ==========================================
export const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="flex items-center text-xs font-semibold text-neutral-muted space-x-1.5 uppercase tracking-wider py-4">
      <a href="/" className="hover:text-primary transition-colors flex items-center gap-1">Home</a>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <Icons.ChevronRight className="w-3 h-3 text-neutral-border" />
            {isLast ? (
              <span className="text-primary truncate max-w-[200px]">{item.label}</span>
            ) : (
              <a href={item.path} className="hover:text-primary transition-colors truncate max-w-[200px]">{item.label}</a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

// ==========================================
// 7. PAGINATION
// ==========================================
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-1 py-8">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-neutral-border rounded-md text-neutral-body hover:bg-neutral-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous Page"
      >
        <Icons.ChevronLeft className="w-4 h-4" />
      </button>

      {/* Pages */}
      {getPageNumbers().map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 text-sm font-semibold rounded-md transition-colors border ${
            currentPage === p
              ? 'bg-primary text-white border-primary shadow-xs'
              : 'border-neutral-border text-neutral-body hover:bg-neutral-light'
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-neutral-border rounded-md text-neutral-body hover:bg-neutral-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next Page"
      >
        <Icons.ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

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
      <Icons.FileText className="w-12 h-12 text-neutral-muted mb-4 opacity-50" />
      <h4 className="text-base font-bold text-neutral-dark mb-1">{title}</h4>
      {description && <p className="text-sm text-neutral-muted max-w-sm mb-4 leading-relaxed">{description}</p>}
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>{actionText}</Button>
      )}
    </div>
  );
};
