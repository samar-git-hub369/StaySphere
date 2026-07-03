import { forwardRef } from 'react';
import { cn } from './Button';

export const Badge = forwardRef(({ className, variant = 'default', children, ...props }, ref) => {
  const variants = {
    default: "bg-[var(--color-section)] text-[var(--color-text-main)]",
    primary: "bg-[var(--color-primary)] text-white",
    success: "bg-[var(--color-accent-green)] text-white",
    warning: "bg-[var(--color-accent-gold)] text-white",
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
