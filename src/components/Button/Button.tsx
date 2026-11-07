import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    forwardRef,
    type ComponentPropsWithoutRef,
    type ReactElement,
} from 'react';
import { cn } from '@/lib/cn';

const buttonStyles = cva(
    [
        'inline-flex items-center justify-center gap-2 whitespace-nowrap',
        'rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
    ],
    {
        variants: {
            variant: {
                primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
                secondary: 'bg-muted text-foreground hover:bg-muted/80',
                outline: 'border border-border bg-transparent hover:bg-muted',
                ghost: 'hover:bg-muted',
                danger: 'bg-danger text-danger-foreground hover:bg-danger/90',
                success: 'bg-success text-success-foreground hover:bg-success/90',
                warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
            },
            size: {
                sm: 'h-8 px-3 text-xs',
                md: 'h-10 px-4',
                lg: 'h-12 px-6 text-base',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

type ButtonBaseProps = VariantProps<typeof buttonStyles> & {
    className?: string;
    isLoading?: boolean;
};

type ButtonAsButton = ButtonBaseProps &
    Omit<ComponentPropsWithoutRef<'button'>, 'color'> & {
    asChild?: false;
};

type ButtonAsChild = ButtonBaseProps &
    Omit<ComponentPropsWithoutRef<'button'>, 'color' | 'children'> & {
    asChild: true;
    children: ReactElement;
    isLoading?: never;
};

export type ButtonProps = ButtonAsButton | ButtonAsChild;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild, isLoading, disabled, children, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        const isDisabled = isLoading || disabled;

        return (
            <Comp
                ref={ref}
                className={cn(
                    buttonStyles({ variant, size }),
                    className,
                    isDisabled && 'pointer-events-none opacity-50'
                )}
                disabled={!asChild ? isDisabled : undefined}
                aria-disabled={isDisabled}
                {...(props as ComponentPropsWithoutRef<'button'>)}
            >
                {isLoading && !asChild && (
                    <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </Comp>
        );
    },
);

Button.displayName = 'Button';