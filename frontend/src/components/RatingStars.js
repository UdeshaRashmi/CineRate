import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ 
  rating, 
  onRatingChange, 
  editable = false, 
  size = 20,
  showLabel = true,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starValue) => {
    if (editable && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const handleStarHover = (starValue) => {
    if (editable) {
      setHoverRating(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={`flex items-center ${className}`}>
      <div 
        className="flex"
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            className={`${
              editable ? 
              'cursor-pointer hover:scale-110 transition-transform duration-150' : 
              'cursor-default'
            }`}
            disabled={!editable}
            aria-label={`Rate ${star} out of 5 stars`}
          >
            <Star
              size={size}
              className={
                star <= displayRating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-400'
              }
            />
          </button>
        ))}
      </div>
      
      {showLabel && (
        <div className="flex items-center space-x-2 ml-3">
          <span className="text-sm font-semibold text-white">
            {rating.toFixed(1)}
          </span>
          <span className="text-gray-400 text-sm">/ 5.0</span>
        </div>
      )}
    </div>
  );
};

// Additional component for display-only ratings
export const DisplayRating = ({ rating, size = 16, showNumber = true }) => {
  return (
    <div className="flex items-center space-x-1">
      <RatingStars 
        rating={rating} 
        editable={false} 
        size={size} 
        showLabel={false}
      />
      {showNumber && (
        <span className="text-sm text-gray-300 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;