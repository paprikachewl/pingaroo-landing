'use client';
import * as React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

type ButtonVariant = 'default' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, asChild = false, className = '', variant = 'default', ...props },
    ref
  ) => {
    // Determine variant classes (very light implementation)
    const baseClass = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    let variantClass = 'bg-purple-600 text-white hover:bg-purple-700';
    if (variant === 'outline') {
      variantClass = 'border border-gray-500 text-gray-300 hover:bg-white/10 hover:text-white';
    } else if (variant === 'ghost') {
      variantClass = 'text-inherit hover:bg-white/10';
    }

    const combinedClasses = `${baseClass} ${variantClass} ${className}`.trim();

    if (asChild && React.isValidElement(children)) {
      // Do not forward the variant prop to DOM elements
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      const { variant: _omit, ...restProps } = props as any;

      return React.cloneElement(children as React.ReactElement<any>, {
        className: `${combinedClasses} ${(children as React.ReactElement<any>).props.className ?? ''}`.trim(),
        ref,
        ...restProps,
      });
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button'; 