import * as React from 'react';
import { cn } from '../../../utils/cn';

const TabsContext = React.createContext(null);

const useTabsContext = () => {
    const ctx = React.useContext(TabsContext);
    if (!ctx) {
        throw new Error('Tabs components must be used within <Tabs>');
    }
    return ctx;
};

/**
 * Brovet Tabs — controlled or uncontrolled.
 *
 * Compound:
 *   <Tabs value={v} onValueChange={setV}>
 *     <TabsList variant="line|default|pills">...</TabsList>
 *     <TabsContent value="a">...</TabsContent>
 *   </Tabs>
 *
 * Simple (legacy Shared API):
 *   <SimpleTabs tabs={[{id,label}]} activeTab={id} onChange={fn} />
 */
function Tabs({
    className,
    orientation = 'horizontal',
    value,
    defaultValue,
    onValueChange,
    children,
    ...props
}) {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
    const activeValue = value !== undefined ? value : internalValue;

    const setValue = React.useCallback(
        (next) => {
            if (value === undefined) setInternalValue(next);
            onValueChange?.(next);
        },
        [onValueChange, value]
    );

    const ctx = React.useMemo(
        () => ({
            orientation,
            activeValue,
            setValue,
            variant: 'default',
        }),
        [orientation, activeValue, setValue]
    );

    return (
        <TabsContext.Provider value={ctx}>
            <div
                data-slot="tabs"
                data-orientation={orientation}
                className={cn(
                    'group/tabs flex gap-2',
                    orientation === 'horizontal' ? 'flex-col' : 'flex-row items-start',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
}

const listVariants = {
    default:
        'rounded-xl bg-neutral-light p-1 ring-1 ring-neutral-border/80',
    line:
        'rounded-none bg-transparent p-0 gap-1 border-b border-neutral-border',
    pills:
        'rounded-none bg-transparent p-0 gap-2',
};

function TabsList({
    className,
    variant = 'default',
    children,
    ...props
}) {
    const parent = useTabsContext();
    const ctx = React.useMemo(
        () => ({ ...parent, variant }),
        [parent, variant]
    );

    return (
        <TabsContext.Provider value={ctx}>
            <div
                role="tablist"
                data-slot="tabs-list"
                data-variant={variant}
                aria-orientation={parent.orientation}
                className={cn(
                    'group/tabs-list inline-flex w-fit max-w-full items-center justify-start',
                    parent.orientation === 'vertical' ? 'flex-col h-fit' : 'flex-row flex-wrap',
                    variant === 'line' && parent.orientation === 'horizontal' && 'w-full',
                    listVariants[variant] || listVariants.default,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
}

const triggerVariants = {
    default: {
        base: 'rounded-lg px-4 py-2 text-neutral-muted hover:text-neutral-dark hover:bg-white/70',
        active: 'bg-white text-primary shadow-2xs font-bold ring-1 ring-primary/10',
    },
    line: {
        base: 'rounded-none border-b-2 border-transparent px-5 py-3 text-neutral-muted hover:text-neutral-dark hover:border-neutral-border -mb-px',
        active: 'border-primary text-primary font-bold bg-primary-light/40',
    },
    pills: {
        base: 'rounded-md border border-neutral-border bg-white px-4 py-2 text-neutral-body ',
        active: 'bg-primary text-white border-primary shadow-xs font-bold',
    },
};

function TabsTrigger({
    className,
    value,
    children,
    disabled = false,
    ...props
}) {
    const { activeValue, setValue, variant, orientation } = useTabsContext();
    const isActive = activeValue === value;
    const styles = triggerVariants[variant] || triggerVariants.default;

    return (
        <button
            type="button"
            role="tab"
            data-slot="tabs-trigger"
            data-active={isActive ? 'true' : 'false'}
            aria-selected={isActive}
            aria-controls={value ? `tab-panel-${value}` : undefined}
            id={value ? `tab-${value}` : undefined}
            disabled={disabled}
            tabIndex={isActive ? 0 : -1}
            onClick={() => !disabled && setValue(value)}
            className={cn(
                'relative inline-flex items-center justify-center gap-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50',
                orientation === 'vertical' && 'w-full justify-start',
                styles.base,
                isActive && styles.active,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

function TabsContent({
    className,
    value,
    children,
    forceMount = false,
    ...props
}) {
    const { activeValue } = useTabsContext();
    const isActive = activeValue === value;

    if (!forceMount && !isActive) return null;

    return (
        <div
            role="tabpanel"
            data-slot="tabs-content"
            id={value ? `tab-panel-${value}` : undefined}
            aria-labelledby={value ? `tab-${value}` : undefined}
            hidden={!isActive}
            className={cn(
                'flex-1 text-sm text-neutral-body outline-none fade-in',
                !isActive && 'hidden',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

/** Legacy Shared.jsx-compatible API */
function SimpleTabs({
    tabs = [],
    activeTab,
    onChange,
    variant = 'line',
    className = '',
}) {
    return (
        <Tabs
            value={activeTab}
            onValueChange={onChange}
            className={cn('w-full', className)}
        >
            <TabsList variant={variant} className="w-full">
                {tabs.map((tab, idx) => {
                    const id = tab.id ?? tab.value ?? tab;
                    const label = tab.label ?? tab;
                    return (
                        <TabsTrigger key={id ?? idx} value={id}>
                            {label}
                        </TabsTrigger>
                    );
                })}
            </TabsList>
        </Tabs>
    );
}

export {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    SimpleTabs,
};
