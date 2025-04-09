import Airtable, { FieldSet, Records } from 'airtable';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const mainTableId = process.env.AIRTABLE_MAIN_TABLE;
const submitTableId = process.env.AIRTABLE_SUBMIT_TABLE;
const blogTableId = process.env.AIRTABLE_BLOG_TABLE;

if (!apiKey || !baseId || !mainTableId || !submitTableId || !blogTableId) {
  throw new Error('Airtable environment variables are not properly configured.');
}

const base = new Airtable({ apiKey }).base(baseId);

export const mainTable = base(mainTableId);
export const submitTable = base(submitTableId);
export const blogTable = base(blogTableId);

// Helper function to minimize Airtable record data
export const minimizeRecords = (records: Records<FieldSet>) => {
  return records.map((record) => ({
    id: record.id,
    fields: record.fields,
  }));
};

// Define interfaces for Tool and Submission data
export interface ToolFields extends FieldSet {
  title: string;
  link: string;
  description: string;
  thumbnail?: string; // Assuming thumbnail is a URL field
  tags?: string[] | string;
  rating?: number;
  author?: string;
  pricing_model?: string;
}

export interface SubmissionFields extends FieldSet {
  title: string;
  link: string;
  description: string;
  thumbnail: string; // Assuming URL string for submission
  tags: string; // Assuming comma-separated string for submission
  submitter: string;
  email: string;
}

export interface MinimizedToolRecord {
  id: string;
  fields: ToolFields;
}

export interface MinimizedSubmissionRecord {
  id: string;
  fields: SubmissionFields;
}

export interface BlogFields extends FieldSet {
  Title: string;
  Body: string;
  'Featured Image'?: string; // Assuming URL field
  Tags?: string[];
  Date: string; // Assuming date string
}

export interface MinimizedBlogRecord {
  id: string;
  fields: BlogFields;
}

// Function to fetch a single tool by ID
export async function fetchToolById(id: string) {
  try {
    const response = await mainTable.find(id);
    return {
      id: response.id,
      fields: response.fields,
    };
  } catch (error) {
    console.error('Error fetching tool by ID:', error);
    throw error;
  }
}
