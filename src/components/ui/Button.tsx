import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: 'bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 focus:ring-blue-500',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;