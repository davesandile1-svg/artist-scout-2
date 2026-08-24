import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { artistId, content } = await request.json();

    // TODO: Get user from session
    // TODO: Validate user is a scout
    // TODO: Save scouting note to database (private)

    return NextResponse.json(
      { message: 'Note saved', noteId: 'note_id' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving note:', error);
    return NextResponse.json(
      { error: 'Failed to save note' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Get user from session
    // TODO: Fetch user's scout notes

    return NextResponse.json(
      { notes: [] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}
