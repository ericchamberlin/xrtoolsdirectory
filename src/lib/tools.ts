import { Tool } from '@/types/Tool';

// Sample data - replace with your actual data source
const toolsData: Tool[] = [
  {
    id: '1',
    name: 'Hera',
    description: 'A tool to create motion graphic animations from text prompts.',
    category: 'Generative Video',
    imageUrl: '/images/hera.png',
    url: 'https://hera.so',
    tags: ['AI', 'Animation', 'Video'],
    featured: true
  },
  {
    id: '2',
    name: 'Meta Quest 3',
    description: 'Mixed reality headset with high-resolution display and powerful processing.',
    category: 'Hardware',
    imageUrl: '/images/quest3.png',
    url: 'https://www.meta.com/quest/',
    tags: ['VR', 'MR', 'Headset'],
    featured: true
  },
  {
    id: '3',
    name: 'Unity XR',
    description: 'Development platform for creating immersive XR experiences.',
    category: 'Development',
    imageUrl: '/images/unity.png',
    url: 'https://unity.com/solutions/xr',
    tags: ['Development', 'Engine', 'SDK'],
    featured: false
  }
];

export async function fetchTools(): Promise<Tool[]> {
  // In a real app, this would fetch from an API or database
  return toolsData;
}

export async function fetchToolById(id: string): Promise<Tool | null> {
  const tool = toolsData.find(tool => tool.id === id);
  return tool || null;
}

export async function fetchFeaturedTools(): Promise<Tool[]> {
  return toolsData.filter(tool => tool.featured);
}