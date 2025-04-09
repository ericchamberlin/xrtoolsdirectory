import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Initialize Airtable directly
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = airtable.base(process.env.AIRTABLE_BASE_ID || '');

export async function POST(request: Request) {
  try {
    const { toolId, rating } = await request.json();
    
    // Validate input
    if (!toolId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid rating or tool ID' },
        { status: 400 }
      );
    }

    // Convert rating to a number to ensure proper type
    const numericRating = Number(rating);
    
    // Log the data we're sending to help debug
    console.log('Updating record:', toolId, 'with rating:', numericRating, 'type:', typeof numericRating);
    
    // Update the record in Airtable using the direct Airtable SDK
    const updatedRecord = await base('Tools').update([
      {
        id: toolId,
        fields: {
          'rating': numericRating
        }
      }
    ]);

    if (!updatedRecord || updatedRecord.length === 0) {
      throw new Error('Failed to update record');
    }

    return NextResponse.json({
      success: true,
      data: updatedRecord[0]
    });

  } catch (error) {
    console.error('Error updating rating:', error);
    return NextResponse.json(
      { error: 'Failed to update rating', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}