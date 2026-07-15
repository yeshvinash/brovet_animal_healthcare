import { cn } from '../../../utils/cn';

const badgeVariants = {
  default:
    'border-transparent bg-primary text-white',
  secondary:
    'border-transparent bg-secondary text-white',
  accent:
    'border-transparent bg-accent text-white',
  soft:
    'border-primary/20 bg-primary-light text-primary',
  outline:
    'border-neutral-border bg-white text-neutral-body',
  destructive:
    'border-red-200 bg-red-50 text-red-700',
  ghost:
    'border-transparent bg-transparent text-neutral-muted',
};

/**
 * Brovet Badge — compact status / category label.
 *
 *   <Badge>Category</Badge>
 *   <Badge variant="soft">Dealer</Badge>
 *   <Badge variant="accent" as="div">Featured</Badge>
 */
function Badge({
  className,
  variant = 'soft',
  as: Comp = 'span',
  children,
  ...props
}) {
  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(
        'inline-flex w-fit shrink-0 items-center justify-center gap-1',
        'rounded-md border px-2 py-0.5',
        'text-3xs font-semibold uppercase tracking-wide whitespace-nowrap',
        '[&>svg]:pointer-events-none [&>svg]:size-3',
        badgeVariants[variant] ?? badgeVariants.soft,
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Badge, badgeVariants };
