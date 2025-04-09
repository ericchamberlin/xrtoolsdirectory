import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MinimizedToolRecord } from '@/lib/airtable';

interface ToolCardProps {
  tool: MinimizedToolRecord;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { title, description, thumbnail, tags } = tool.fields;
  const descriptionText = description || 'No description available.';
  const thumbnailUrl = thumbnail || '/placeholder-image.png';

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out flex flex-col h-full dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/tool/${tool.id}`} className="flex flex-col h-full">
        <div className="relative w-full h-48">
          <Image
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.png';
            }}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
          
          {/* Full description with scrolling container */}
          <div className="mb-3 flex-grow overflow-auto custom-scrollbar" style={{ maxHeight: '150px' }}>
            <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">
              {descriptionText}
            </p>
          </div>
          
          {tags && (
            Array.isArray(tags) ? (
              <div className="mb-3 flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mb-3 flex flex-wrap gap-1">
                {tags.split(',').map((tag) => (
                  <span
                    key={tag.trim()}
                    className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full px-2 py-0.5"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )
          )}
          <div className="mt-auto inline-block bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded transition-colors duration-150 ease-in-out">
            View Details
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ToolCard;
