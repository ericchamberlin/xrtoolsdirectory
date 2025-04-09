'use client';

import React, { useState } from 'react';

interface RatingSystemProps {
  initialRating?: number;
  toolId: string;
  onRatingSubmit: (rating: number) => Promise<void>;
}

export default function RatingSystem({ initialRating, toolId, onRatingSubmit }: RatingSystemProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  const handleRatingSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    try {
      await onRatingSubmit(rating);
      setHasRated(true);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        {initialRating ? 'Current Rating' : 'Rate this Tool'}
      </h3>
      
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="focus:outline-none"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
            disabled={hasRated || isSubmitting}
          >
            <svg
              className={`w-8 h-8 ${
                (hoveredRating || rating) >= star
                  ? 'text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              } transition-colors duration-150`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>

      {!hasRated && (
        <button
          onClick={handleRatingSubmit}
          disabled={rating === 0 || isSubmitting}
          className={`mt-2 px-4 py-2 rounded-md text-white transition-colors duration-150 ${
            rating === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </button>
      )}

      {hasRated && (
        <p className="text-green-600 dark:text-green-400 text-sm">
          Thanks for rating!
        </p>
      )}

      {initialRating && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Average Rating: {initialRating.toFixed(1)} / 5
        </p>
      )}
    </div>
  );
}