import React from 'react';
import { useUIStore } from '../../store/useUIStore';

interface RuleTooltipProps {
  term: string;
  definition: string;
  category?: string;
  children: React.ReactNode;
}

export const RuleTooltip: React.FC<RuleTooltipProps> = ({
  term,
  definition,
  category = 'Regra Oficial 5e',
  children,
}) => {
  const { showTooltip, hideTooltip } = useUIStore();

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    showTooltip({
      title: term,
      description: definition,
      category,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  return (
    <span
      className="inline-block cursor-help underline decoration-amber-500/50 decoration-dashed underline-offset-4 hover:decoration-amber-400 hover:text-amber-300 transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={hideTooltip}
    >
      {children}
    </span>
  );
};

export const GlobalTooltipContainer: React.FC = () => {
  const { activeTooltip } = useUIStore();

  if (!activeTooltip) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 w-72 p-3 rounded-lg bg-[#141522]/95 border border-amber-500/40 text-slate-100 shadow-gold-glow backdrop-blur-md text-xs animate-in fade-in zoom-in-95 duration-150"
      style={{ left: `${activeTooltip.x}px`, top: `${activeTooltip.y}px` }}
    >
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-1 mb-1.5">
        <span className="font-cinzel font-bold text-amber-300">{activeTooltip.title}</span>
        {activeTooltip.category && (
          <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500/80">
            {activeTooltip.category}
          </span>
        )}
      </div>
      <p className="text-slate-300 leading-relaxed font-sans">{activeTooltip.description}</p>
    </div>
  );
};
