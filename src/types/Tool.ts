export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  url: string;
  tags: string[];
  featured?: boolean;
}