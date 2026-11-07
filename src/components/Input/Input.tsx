import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, hint, id, disabled, ...props }, ref) => {
        const generatedId = useId();
        const inputId = id || generatedId;
        const errorId = `${inputId}-error`;
        const hintId = `${inputId}-hint`;

        // Собираем ID для aria-describedby, чтобы скринридер зачитал подсказку или ошибку
        const describedBy = cn(
            error ? errorId : undefined,
            hint ? hintId : undefined
        ) || undefined;

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "text-sm font-medium text-foreground",
                            disabled && "opacity-50"
                        )}
                    >
                        {label}
                    </label>
                )}

                <input
                    id={inputId}
                    ref={ref}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={describedBy}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm',
                        'placeholder:text-muted-foreground',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        // Стили для состояния ошибки
                        error && 'border-danger focus-visible:ring-danger',
                        className
                    )}
                    {...props}
                />

                {hint && !error && (
                    <p id={hintId} className="text-sm text-muted-foreground">
                        {hint}
                    </p>
                )}

                {error && (
                    <p id={errorId} className="text-sm text-danger font-medium">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';