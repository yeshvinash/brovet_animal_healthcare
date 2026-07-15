import { cn } from '../../../utils/cn';

const buttonVariants = {
    primary:
        'bg-primary text-white shadow-sm hover:bg-primary-hover active:bg-primary-dark focus-visible:ring-primary',
    default:
        'bg-primary text-white shadow-sm hover:bg-primary-hover active:bg-primary-dark focus-visible:ring-primary',
    secondary:
        'bg-secondary text-white shadow-sm hover:bg-secondary-hover focus-visible:ring-secondary',
    accent:
        'bg-accent text-white shadow-sm hover:bg-accent-hover focus-visible:ring-accent',
  outline:
    'border border-neutral-border bg-white text-neutral-dark hover:bg-neutral-light focus-visible:ring-primary',
  'outline-inverse':
    'border border-white/80 bg-transparent text-white hover:bg-white hover:text-primary-dark focus-visible:ring-white',
  ghost:
        'border-transparent bg-transparent text-neutral-body hover:bg-neutral-light hover:text-primary focus-visible:ring-primary',
    danger:
        'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500',
    destructive:
        'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500',
    link:
        'border-transparent bg-transparent px-0 text-primary underline-offset-4 hover:underline focus-visible:ring-primary',
};

const buttonSizes = {
    default: 'min-h-11 h-11 gap-2 px-4 py-2 text-sm',
    sm: 'h-8 gap-1.5 px-3 py-1.5 text-xs',
    lg: 'min-h-12 h-12 gap-2 px-6 py-3 text-base',
    icon: 'size-11 p-0',
    'icon-sm': 'size-8 p-0',
};

/**
 * Brovet Button — Shared-compatible API.
 *
 *   <Button variant="primary" onClick={fn}>Save</Button>
 *   <Button variant="outline" icon={<Icons.Plus />}>Add</Button>
 */
function Button({
    children,
    variant = 'primary',
    size = 'default',
    type = 'button',
    onClick,
    disabled = false,
    className = '',
    icon,
    ...props
}) {
    const resolvedVariant = buttonVariants[variant] ? variant : 'primary';

    return (
        <button
            type={type}
            data-slot="button"
            data-variant={resolvedVariant}
            data-size={size}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                'inline-flex shrink-0 items-center justify-center rounded-md font-semibold',
                'border border-transparent transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                '[&>svg]:pointer-events-none [&>svg]:shrink-0',
                buttonVariants[resolvedVariant],
                buttonSizes[size] ?? buttonSizes.default,
                className
            )}
            {...props}
        >
            {icon && <span className="inline-flex shrink-0">{icon}</span>}
            {children}
        </button>
    );
}

export { Button, buttonVariants, buttonSizes };
