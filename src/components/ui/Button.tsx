import React from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "right",
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

    const variants = {
      primary:
        "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:text-gray-400",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          ${baseClasses}
          ${variants[variant]}
          ${sizes[size]}
          ${disabled ? "cursor-not-allowed" : ""}
          ${className}
        `}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="w-4 h-4 mr-2" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="w-4 h-4 ml-2" />}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
