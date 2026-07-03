import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = forwardRef(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
    secondary: "bg-[var(--color-section)] text-[var(--color-text-main)] hover:bg-[var(--color-border-div)]",
    outline: "border border-[var(--color-border-div)] hover:bg-[var(--color-section)] text-[var(--color-text-main)]",
    ghost: "hover:bg-[var(--color-section)] text-[var(--color-text-main)]",
    accent: "bg-[var(--color-accent-gold)] text-white hover:bg-yellow-600",
  };
  
  const sizes = {
    sm: "h-9 px-3 rounded-md",
    md: "h-10 py-2 px-4",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
