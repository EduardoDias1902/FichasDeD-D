import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: 1 | 2 | 3 | 4 | 5;
  showText?: boolean;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  showText = false,
  text,
  size = 'md'
}) => {
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSizes[size]} ${
              star <= rating
                ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,204,90,0.6)]'
                : 'text-slate-700 fill-slate-900/50'
            }`}
          />
        ))}
      </div>
      {showText && text && (
        <span className="text-xs text-amber-300 font-medium ml-1">
          {text}
        </span>
      )}
    </div>
  );
};
