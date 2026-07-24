import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'crimson' | 'arcane' | 'success' | 'neutral';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  className,
  children,
  ...props
}) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide border transition-colors";

  const variantClasses = {
    gold: "bg-amber-950/60 text-amber-300 border-amber-500/40",
    crimson: "bg-red-950/60 text-red-300 border-red-500/40",
    arcane: "bg-indigo-950/60 text-indigo-300 border-indigo-500/40",
    success: "bg-emerald-950/60 text-emerald-300 border-emerald-500/40",
    neutral: "bg-slate-800/80 text-slate-300 border-slate-700",
  };

  return (
    <span className={twMerge(clsx(baseClasses, variantClasses[variant], className))} {...props}>
      {children}
    </span>
  );
};
