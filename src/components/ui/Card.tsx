import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gold' | 'crimson' | 'arcane' | 'parchment';
  glow?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  glow = false,
  className,
  children,
  ...props
}) => {
  const baseClasses = "relative rounded-xl border backdrop-blur-md transition-all duration-300 overflow-hidden";
  
  const variantClasses = {
    default: "bg-[#12131c]/80 border-slate-800 text-slate-100 hover:border-slate-700",
    gold: "bg-[#161510]/90 border-amber-600/40 text-amber-100 hover:border-amber-500/80",
    crimson: "bg-[#1a0f12]/90 border-red-900/50 text-red-100 hover:border-red-600/80",
    arcane: "bg-[#0f1224]/90 border-indigo-900/50 text-indigo-100 hover:border-indigo-500/80",
    parchment: "bg-[#1e1c16]/95 border-amber-900/40 text-amber-200/90 font-garamond",
  };

  const glowClasses = glow ? {
    default: "shadow-glass",
    gold: "shadow-gold-glow",
    crimson: "shadow-crimson-glow",
    arcane: "shadow-arcane-glow",
    parchment: "shadow-gold-glow",
  }[variant] : "";

  return (
    <div
      className={twMerge(clsx(baseClasses, variantClasses[variant], glowClasses, className))}
      {...props}
    >
      {children}
    </div>
  );
};
