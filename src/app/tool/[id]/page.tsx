import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { fetchToolById } from '@/lib/airtable';
import Header from '@/components/Header';

interface ToolDetailProps {
  params: {
    id: string;
  };
}

export default async function ToolDetail({ params }: ToolDetailProps) {
  // Await params before accessing its properties
  const resolvedParams = await params;
  const id: string = String(resolvedParams.id);
  const tool = await fetchToolById(id);
  
  if (!tool) {
    notFound();
  }

  const { title, description, link, thumbnail, tags } = tool.fields;
  const titleText: string = String(title);
  const descriptionText: string = String(description);
  const thumbnailUrl: string = typeof thumbnail === 'string' ? thumbnail : '/placeholder-image.png';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{`${titleText} | XR Tools Directory`}</title>
        <meta name="description" content={descriptionText.substring(0, 160) || 'Tool details'} />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
          &larr; Back to all tools
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">{titleText}</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Left side - Thumbnail only */}
          <div className="md:w-2/5 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <div className="flex justify-center p-4">
                <Image
                  src={thumbnailUrl}
                  alt={`${titleText} thumbnail`}
                  width={300}
                  height={200}
                  priority={true}
                  className="object-contain max-h-64"
                />
              </div>
            </div>
          </div>

          {/* Right side - Description and details */}
          <div className="md:w-3/5">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Description:</h2>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-visible min-h-[300px]">
                {descriptionText || 'No description available.'}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
              {tags && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 dark:text-white">Tags:</h2>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(tags) ? tags : (typeof tags === "string" ? tags.split(',') : [])).map((tag) => (
                      <span
                        key={String(tag).trim()}
                        className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {String(tag).trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <a
                href={typeof link === "string" ? link : String(link)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded-md transition-colors duration-150 ease-in-out inline-flex items-center justify-center"
              >
                Visit Tool
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
