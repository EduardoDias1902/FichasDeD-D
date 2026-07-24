import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'crimson' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  icon,
  className,
  children,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-cinzel font-semibold tracking-wider transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-lg active:scale-95";

  const variantClasses = {
    gold: "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-gold-glow hover:shadow-gold-glow-lg border border-amber-400/50",
    crimson: "bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-slate-100 hover:brightness-110 shadow-crimson-glow border border-red-500/40",
    secondary: "bg-slate-800/90 text-slate-200 hover:bg-slate-700 border border-slate-700",
    ghost: "bg-transparent text-slate-300 hover:bg-slate-800/50 hover:text-amber-300",
    outline: "bg-transparent text-amber-400 border border-amber-500/50 hover:bg-amber-500/10 hover:border-amber-400"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5"
  };

  return (
    <button
      className={twMerge(clsx(baseClasses, variantClasses[variant], sizeClasses[size], className))}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
