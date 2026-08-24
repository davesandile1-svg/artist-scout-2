import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { artistIds, shortlistId, note } = await request.json();

    // TODO: Get user from session
    // TODO: Validate user is a scout
    // TODO: Add artists to shortlist
    // TODO: Save scouting notes if provided

    return NextResponse.json(
      { message: 'Artists added to shortlist' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding to shortlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to shortlist' },
      { status: 500 }
    );
  }
}
