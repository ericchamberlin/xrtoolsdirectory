import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import Header from '@/components/Header';
import urlFor from '@/lib/urlFor'; // Helper function to build image URLs (will create next)

// Define the type for a blog post fetched from Sanity
interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  featuredImage?: any; // Sanity image asset reference
  tags?: string[];
  body: any[]; // Portable Text array
}

// Revalidate the page on demand or at intervals
export const revalidate = 60; // Revalidate every 60 seconds

const query = groq`
  *[_type=='post'] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    featuredImage,
    tags,
    body
  }
`;

// Use PortableText components for custom rendering (optional but recommended)
const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-5"> {/* Adjust height as needed */}
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog post image'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain" // Use object-contain for images within body
          />
        </div>
      );
    },
    // Add custom components for other block types if needed
  },
  // Add custom marks or block styles if needed
};


export default async function BlogPage() {
  // Fetch data directly in the server component
  const posts: SanityPost[] = await client.fetch(query);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">Blog</h1>

        <div className="space-y-12">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No blog posts found.</p>
          ) : (
            posts.map((post) => (
              <article key={post._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {post.featuredImage && (
                  <div className="relative w-full h-64 mb-4 rounded overflow-hidden">
                    <Image
                      src={urlFor(post.featuredImage).url()} // Use urlFor helper
                      alt={`${post.title} featured image`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <h2 className="text-2xl font-semibold mb-2 dark:text-white">{post.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Published on: {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="prose dark:prose-invert max-w-none">
                  <PortableText value={post.body} components={ptComponents} />
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
