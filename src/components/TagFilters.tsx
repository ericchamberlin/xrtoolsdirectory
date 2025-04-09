import React from 'react';

interface TagFiltersProps {
  availableTags: string[];
  selectedTags: string[];
  onTagChange: (tag: string) => void;
}

const TagFilters: React.FC<TagFiltersProps> = ({
  availableTags,
  selectedTags,
  onTagChange,
}) => {
  return (
    <div className="px-4 py-2">
      <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Filter by Tag:</h3>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <label
            key={tag}
            className={`flex items-center space-x-2 px-3 py-1 border rounded-full cursor-pointer transition-colors duration-150 ease-in-out ${
              selectedTags.includes(tag)
                ? 'bg-blue-500 border-blue-500 text-white dark:bg-blue-600 dark:border-blue-600'
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => onTagChange(tag)}
              className="hidden" // Hide default checkbox, style the label instead
            />
            <span>{tag}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TagFilters;
