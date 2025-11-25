import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

const RatingStars = ({ 
  rating, 
  onRatingChange, 
  editable = false, 
  size = 20,
  showLabel = true,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const hasQuarterStar = rating % 1 < 0.25;
  const hasThreeQuarterStar = rating % 1 >= 0.75;

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

  const getStarColor = (star) => {
    const displayRating = hoverRating || rating;
    
    if (star <= Math.floor(displayRating)) {
      return 'text-yellow-400 fill-yellow-400';
    }
    
    if (hasHalfStar && star === fullStars + 1) {
      return 'text-yellow-400 fill-yellow-400';
    }
    
    if (hasThreeQuarterStar && star === fullStars + 1) {
      return 'text-yellow-400 fill-yellow-400';
    }
    
    if (hasQuarterStar && star === fullStars + 1) {
      return 'text-yellow-400';
    }
    
    return 'text-gray-400';
  };

  const getStarIcon = (star) => {
    const displayRating = hoverRating || rating;
    
    if (star <= Math.floor(displayRating)) {
      return Star;
    }
    
    if (hasHalfStar && star === fullStars + 1) {
      return StarHalf;
    }
    
    if (hasThreeQuarterStar && star === fullStars + 1) {
      return Star;
    }
    
    if (hasQuarterStar && star === fullStars + 1) {
      return Star;
    }
    
    return Star;
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div 
        className="flex"
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const StarIcon = getStarIcon(star);
          const isFilled = star <= Math.floor(hoverRating || rating);
          const isHalf = hasHalfStar && star === fullStars + 1 && !hoverRating;
          const isThreeQuarter = hasThreeQuarterStar && star === fullStars + 1 && !hoverRating;
          const isQuarter = hasQuarterStar && star === fullStars + 1 && !hoverRating;

          return (
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              className={`${
                editable ? 
                'cursor-pointer hover:scale-110 transition-transform duration-150' : 
                'cursor-default'
              } relative`}
              disabled={!editable}
              aria-label={`Rate ${star} out of 5 stars`}
            >
              {/* Background Star */}
              <Star
                size={size}
                className="text-gray-400 absolute inset-0"
              />
              
              {/* Foreground Star */}
              <div className="relative">
                {isHalf ? (
                  <>
                    <StarHalf
                      size={size}
                      className="text-yellow-400 fill-yellow-400"
                      style={{ clipPath: 'inset(0 50% 0 0)' }}
                    />
                    <StarHalf
                      size={size}
                      className="text-gray-400"
                      style={{ clipPath: 'inset(0 0 0 50%)', marginLeft: -size }}
                    />
                  </>
                ) : isThreeQuarter ? (
                  <div className="relative">
                    <Star
                      size={size}
                      className="text-yellow-400 fill-yellow-400"
                      style={{ clipPath: 'inset(0 25% 0 0)' }}
                    />
                    <Star
                      size={size}
                      className="text-gray-400"
                      style={{ clipPath: 'inset(0 0 0 75%)', marginLeft: -size }}
                    />
                  </div>
                ) : isQuarter ? (
                  <div className="relative">
                    <Star
                      size={size}
                      className="text-yellow-400 fill-yellow-400"
                      style={{ clipPath: 'inset(0 75% 0 0)' }}
                    />
                    <Star
                      size={size}
                      className="text-gray-400"
                      style={{ clipPath: 'inset(0 0 0 25%)', marginLeft: -size }}
                    />
                  </div>
                ) : (
                  <StarIcon
                    size={size}
                    className={getStarColor(star)}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {showLabel && (
        <div className="flex items-center space-x-2 ml-2">
          <span className="text-sm font-semibold text-white">
            {rating.toFixed(1)}
          </span>
          <span className="text-gray-400 text-sm">/ 5.0</span>
          {editable && (
            <span className="text-xs text-gray-500">(Click to rate)</span>
          )}
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