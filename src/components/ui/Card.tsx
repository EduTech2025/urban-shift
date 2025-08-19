import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className, hover = false }: CardProps) => {
  return (
    <div className={cn(
      'bg-white rounded-xl overflow-hidden shadow-lg',
      hover && 'hover:shadow-xl transition-shadow duration-300 cursor-pointer',
      className
    )}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn('p-4', className)}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardContent };