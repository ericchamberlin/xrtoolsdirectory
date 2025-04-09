'use client'; // This component needs client-side interactivity

import React, { useState, useEffect, useMemo } from 'react';
import { MinimizedToolRecord } from '@/lib/airtable';
import SearchBar from './SearchBar';
import TagFilters from './TagFilters';
import ToolCard from './ToolCard';

// Define the preset tags as specified in project.md
const PRESET_TAGS = [
  'Immersive', 'History', 'Science', 'Geography', 'Literacy', 'Documentary',
  '360 Video', 'Educational', 'Medicine', 'Climate Change', 'Women', 'Civil Rights'
];

const ToolList: React.FC = () => {
  const [tools, setTools] = useState<MinimizedToolRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTools = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/tools');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data: MinimizedToolRecord[] = await response.json();
        setTools(data);
      } catch (err) {
        console.error("Failed to fetch tools:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching tools.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

      const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      let toolTags = tool.fields.tags || [];
      if (typeof tool.fields.tags === 'string') {
        toolTags = tool.fields.tags.split(',').map(tag => tag.trim());
      }
      const searchLower = searchTerm.toLowerCase();

      // Search term filter (checks title, description, and tags)
      const matchesSearch =
        tool.fields.title?.toLowerCase().includes(searchLower) ||
        (tool.fields.description || '').toLowerCase().includes(searchLower) ||
        (Array.isArray(toolTags) ? toolTags.some(tag => tag.toLowerCase().includes(searchLower)) : false);

      // Tag filter (checks if all selected tags are present in the tool's tags)
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((selectedTag) => toolTags.includes(selectedTag));

      return matchesSearch && matchesTags;
    });
  }, [tools, searchTerm, selectedTags]);

  return (
    <div className="container mx-auto px-4 py-6">
       {/* Sticky Search and Filter Section */}
       <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-4 shadow-sm mb-6">
         <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
         <TagFilters
           availableTags={PRESET_TAGS}
           selectedTags={selectedTags}
           onTagChange={handleTagChange}
         />
       </div>

      {isLoading && <p className="text-center dark:text-gray-300">Loading tools...</p>}
      {error && <p className="text-center text-red-500">Error loading tools: {error}</p>}

      {!isLoading && !error && (
        <>
          {filteredTools.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No tools match your current filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ToolList;
