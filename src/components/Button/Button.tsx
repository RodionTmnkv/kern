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
};

type ButtonAsButton = ButtonBaseProps &
    Omit<ComponentPropsWithoutRef<'button'>, 'color'> & {
    asChild?: false;
};

type ButtonAsChild = ButtonBaseProps & {
    asChild: true;
    children: ReactElement;
};

export type ButtonProps = ButtonAsButton | ButtonAsChild;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                ref={ref}
                className={cn(buttonStyles({ variant, size }), className)}
                {...(props as ComponentPropsWithoutRef<'button'>)}
            />
        );
    },
);

Button.displayName = 'Button';