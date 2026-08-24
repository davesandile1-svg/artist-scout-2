import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, description, type, genre, location, deadline } = await request.json();

    // Validation
    if (!title || !description || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Save opportunity to database
    // TODO: Create notification for relevant artists

    return NextResponse.json(
      {
        message: 'Opportunity created successfully',
        opportunityId: 'opportunity_id_here',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Opportunity creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create opportunity' },
      { status: 500 }
    );
  }
}
