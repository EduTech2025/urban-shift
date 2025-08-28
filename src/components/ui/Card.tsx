import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className, hover = false, onClick }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300",
        hover && "hover:shadow-xl cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>{children}</div>
  );
};

const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn("flex flex-col flex-1 p-4", className)}>{children}</div>
  );
};

export { Card, CardHeader, CardContent };
