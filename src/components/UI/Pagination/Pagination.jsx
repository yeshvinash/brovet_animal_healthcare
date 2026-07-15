import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Icons } from '../Icons';

/**
 * Brovet Pagination — compound + simple API.
 *
 * Compound:
 *   <Pagination>
 *     <PaginationContent>
 *       <PaginationItem>
 *         <PaginationPrevious onClick={...} disabled={...} />
 *       </PaginationItem>
 *       <PaginationItem>
 *         <PaginationLink isActive onClick={...}>1</PaginationLink>
 *       </PaginationItem>
 *       <PaginationItem>
 *         <PaginationEllipsis />
 *       </PaginationItem>
 *       <PaginationItem>
 *         <PaginationNext onClick={...} disabled={...} />
 *       </PaginationItem>
 *     </PaginationContent>
 *   </Pagination>
 *
 * Simple (legacy Shared API):
 *   <SimplePagination currentPage={n} totalPages={n} onPageChange={fn} />
 */

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center py-8', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-wrap items-center justify-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }) {
  return <li data-slot="pagination-item" className={cn(className)} {...props} />;
}

function PaginationLink({
  className,
  isActive = false,
  disabled = false,
  size = 'icon',
  children,
  ...props
}) {
  return (
    <button
      type="button"
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive || undefined}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md border text-sm font-semibold transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        size === 'icon' && 'size-9',
        size === 'default' && 'h-9 min-w-9 px-3',
        isActive
          ? 'border-primary bg-primary text-white shadow-xs'
          : 'border-neutral-border bg-white text-neutral-body hover:border-primary/40 hover:bg-neutral-light hover:text-primary',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function PaginationPrevious({ className, text = 'Previous', ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <Icons.ChevronLeft className="h-4 w-4" />
      <span className="hidden sm:inline">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, text = 'Next', ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:inline">{text}</span>
      <Icons.ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        'flex size-9 items-center justify-center text-neutral-muted',
        className
      )}
      {...props}
    >
      <span className="text-base font-semibold tracking-widest">…</span>
      <span className="sr-only">More pages</span>
    </span>
  );
}

/** Build page list with ellipsis: 1 … 4 5 6 … 12 */
function getPageItems(currentPage, totalPages, siblingCount = 1) {
  if (totalPages <= 1) return [];

  const totalNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis-right', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const start = totalPages - (2 + siblingCount * 2);
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, i) => start + i
    );
    return [1, 'ellipsis-left', ...rightRange];
  }

  const middle = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  );
  return [1, 'ellipsis-left', ...middle, 'ellipsis-right', totalPages];
}

function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}) {
  if (totalPages <= 1) return null;

  const pages = getPageItems(currentPage, totalPages, siblingCount);

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {pages.map((page) => {
          if (typeof page === 'string') {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  SimplePagination,
};
