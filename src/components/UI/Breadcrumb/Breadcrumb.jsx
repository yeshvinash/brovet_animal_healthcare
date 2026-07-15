import * as React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { Icons } from '../Icons';

/**
 * Brovet Breadcrumb — compound + simple API.
 *
 * Compound:
 *   <Breadcrumb>
 *     <BreadcrumbList>
 *       <BreadcrumbItem>
 *         <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *       </BreadcrumbItem>
 *       <BreadcrumbSeparator />
 *       <BreadcrumbItem>
 *         <BreadcrumbPage>Products</BreadcrumbPage>
 *       </BreadcrumbItem>
 *     </BreadcrumbList>
 *   </Breadcrumb>
 *
 * Simple (legacy Shared API):
 *   <SimpleBreadcrumbs items={[{ label, path? }]} />
 */
function Breadcrumb({ className, ...props }) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumb"
      className={cn('py-4', className)}
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-muted',
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
}

function BreadcrumbLink({ className, href, to, children, asChild = false, ...props }) {
  const classes = cn(
    'transition-colors hover:text-primary',
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      'data-slot': 'breadcrumb-link',
      className: cn(classes, children.props.className),
      ...props,
    });
  }

  if (to) {
    return (
      <Link data-slot="breadcrumb-link" to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a data-slot="breadcrumb-link" href={href} className={classes} {...props}>
      {children}
    </a>
  );
}

function BreadcrumbPage({ className, ...props }) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('truncate max-w-[200px] font-semibold text-primary', className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3 text-neutral-border', className)}
      {...props}
    >
      {children ?? <Icons.ChevronRight className="h-3 w-3" />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        'flex size-5 items-center justify-center text-neutral-muted',
        className
      )}
      {...props}
    >
      <span className="text-sm font-semibold tracking-widest">…</span>
      <span className="sr-only">More</span>
    </span>
  );
}

function SimpleBreadcrumbs({ items = [], className, homeLabel = 'Home', homeTo = '/' }) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink to={homeTo}>{homeLabel}</BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${idx}`}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast || !item.path ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink to={item.path}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  SimpleBreadcrumbs,
};
