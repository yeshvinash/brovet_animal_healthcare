import * as React from 'react';
import { cn } from '../../../utils/cn';

const sizeClasses = {
  sm: 'size-6 text-2xs',
  default: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
};

/** Convenience helper: initials from a display name */
function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'B';
}

function Avatar({
  className,
  size = 'default',
  src,
  alt = '',
  name,
  fallback,
  children,
  ...props
}) {
  const initials = fallback || getInitials(name || alt);

  return (
    <span
      data-slot="avatar"
      data-size={size}
      className={cn(
        'group/avatar relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'bg-primary-light text-primary ring-2 ring-white shadow-2xs select-none',
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {src ? <AvatarImage src={src} alt={alt || name || 'Avatar'} /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </>
      )}
    </span>
  );
}

function AvatarImage({
  className,
  alt = '',
  src,
  onError,
  ...props
}) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) return null;

  return (
    <img
      data-slot="avatar-image"
      src={src}
      alt={alt}
      className={cn(
        'absolute inset-0 aspect-square size-full object-cover object-top z-[1]',
        className
      )}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  children,
  ...props
}) {
  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full',
        'bg-primary text-white font-bold tracking-tight',
        'group-data-[size=sm]/avatar:text-2xs',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

function AvatarBadge({ className, ...props }) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full',
        'bg-secondary text-white ring-2 ring-white shadow-xs select-none',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
        'group-data-[size=md]/avatar:size-3 group-data-[size=md]/avatar:[&>svg]:size-2.5',
        'group-data-[size=lg]/avatar:size-3.5 group-data-[size=lg]/avatar:[&>svg]:size-3',
        className
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        'group/avatar-group flex items-center -space-x-2',
        '*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-white',
        className
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center rounded-full',
        'bg-neutral-light text-xs font-bold text-neutral-body',
        'ring-2 ring-white border border-neutral-border shadow-2xs',
        'group-has-data-[size=lg]/avatar-group:size-12 group-has-data-[size=md]/avatar-group:size-10',
        'group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:text-2xs',
        '[&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5',
        className
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
  getInitials,
};
