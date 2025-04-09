import { NextResponse } from 'next/server';
import { submitTable, SubmissionFields } from '@/lib/airtable';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation (can be expanded)
    const requiredFields: (keyof SubmissionFields)[] = [
      'title',
      'link',
      'description',
      'thumbnail',
      'tags',
      'submitter',
      'email',
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Prepare data for Airtable (ensure types match if necessary)
    const submissionData: Partial<SubmissionFields> = {
      title: body.title,
      link: body.link,
      description: body.description,
      thumbnail: body.thumbnail, // Assuming URL string
      tags: body.tags, // Assuming comma-separated string
      submitter: body.submitter,
      email: body.email,
    };

    const createdRecord = await submitTable.create([{ fields: submissionData }]);

    return NextResponse.json({ success: true, recordId: createdRecord[0].id });

  } catch (error) {
    console.error('Error submitting tool to Airtable:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    // Check for specific Airtable errors if needed
    // if (error.statusCode === 422) { ... }
    return NextResponse.json({ error: 'Failed to submit tool', details: errorMessage }, { status: 500 });
  }
}
