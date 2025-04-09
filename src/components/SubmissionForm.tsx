'use client';

import React, { useState } from 'react';
import { SubmissionFields } from '@/lib/airtable'; // Use the interface

type FormState = Partial<SubmissionFields>;
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const SubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    title: '',
    link: '',
    description: '',
    thumbnail: '',
    tags: '', // Comma-separated initially
    submitter: '',
    email: '',
  });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    // Basic client-side validation (can be enhanced)
    for (const key in formData) {
      if (!formData[key as keyof FormState]) {
        setErrorMessage(`Please fill out the ${key} field.`);
        setStatus('error');
        return;
      }
    }

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      setStatus('success');
      setFormData({ // Reset form on success
        title: '', link: '', description: '', thumbnail: '',
        tags: '', submitter: '', email: '',
      });
      // Optionally hide form and show success message

    } catch (err) {
      console.error('Submission failed:', err);
      setErrorMessage(err instanceof Error ? err.message : 'An unknown error occurred during submission.');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {status === 'success' && (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 rounded">
          Tool submitted successfully! Thank you for your contribution.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
          Submission failed: {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tool Title</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2" />
        </div>

        {/* Link */}
        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tool Link (URL)</label>
          <input type="url" name="link" id="link" value={formData.link} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2" placeholder="https://example.com" />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2"></textarea>
        </div>

        {/* Thumbnail URL */}
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thumbnail Image URL</label>
          <input type="url" name="thumbnail" id="thumbnail" value={formData.thumbnail} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2" placeholder="https://example.com/image.jpg" />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma-separated)</label>
          <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2" placeholder="e.g., History, Immersive, Educational" />
        </div>

        {/* Submitter Name */}
        <div>
          <label htmlFor="submitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
          <input type="text" name="submitter" id="submitter" value={formData.submitter} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2" />
        </div>

        {/* Submitter Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2" placeholder="you@example.com" />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Tool'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubmissionForm;
