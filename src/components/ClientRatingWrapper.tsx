'use client';

import React from 'react';
import RatingSystem from './RatingSystem';

interface ClientRatingWrapperProps {
  initialRating?: number;
  toolId: string;
}

export default function ClientRatingWrapper({ initialRating, toolId }: ClientRatingWrapperProps) {
  const handleRatingSubmit = async (rating: number) => {
    try {
      const response = await fetch('/api/tools/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toolId, rating }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  };

  return (
    <RatingSystem
      initialRating={initialRating}
      toolId={toolId}
      onRatingSubmit={handleRatingSubmit}
    />
  );
}