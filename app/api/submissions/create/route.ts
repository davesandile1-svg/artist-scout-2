import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { artistName, genre, location, bio, music, video, socialLinks, contactEmail } = await request.json();

    // Validation
    if (!artistName || !genre || !location || !contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Save submission to database
    // TODO: Create notification for admin
    // TODO: Send confirmation email

    return NextResponse.json(
      {
        message: 'Submission received successfully',
        submissionId: 'submission_id_here',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}
