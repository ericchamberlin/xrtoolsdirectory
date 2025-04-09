"use client";
import { useState } from 'react';

interface RatingFormProps {
  toolId: string;
  currentRating?: number;
}

const RatingForm: React.FC<RatingFormProps> = ({ toolId, currentRating }) => {
  const [rating, setRating] = useState<number>(currentRating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRating = async (selectedRating: number) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/tools/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ toolId, rating: selectedRating })
      });
      if (!res.ok) {
        console.error("Failed to update rating");
      } else {
        setRating(selectedRating);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => submitRating(value)}
            disabled={isSubmitting}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${value <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.98 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
            </svg>
          </button>
        ))}
      </div>
      {isSubmitting && <p className="text-sm text-gray-500">Submitting...</p>}
      {!isSubmitting && rating > 0 && <p className="text-sm text-gray-500">Your rating: {rating}</p>}
    </div>
  );
};

export default RatingForm;
