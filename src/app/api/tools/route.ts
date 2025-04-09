import { NextResponse } from 'next/server';
import { mainTable, minimizeRecords, ToolFields } from '@/lib/airtable';
import { Records } from 'airtable/lib/records';
import { FieldSet } from 'airtable';

export const dynamic = 'force-dynamic'; // Ensure fresh data on each request

export async function GET() {
  try {
    const records: Records<FieldSet> = await mainTable
      .select({
        // Add any necessary sorting or filtering here if needed later
        // sort: [{ field: "title", direction: "asc" }],
        // filterByFormula: 'NOT({title} = "")', // Example filter
      })
      .all();

    const minimized = minimizeRecords(records) as { id: string; fields: ToolFields }[];

    return NextResponse.json(minimized);
  } catch (error) {
    console.error('Error fetching tools from Airtable:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch tools', details: errorMessage }, { status: 500 });
  }
}
