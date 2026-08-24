import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch opportunities from database
    // TODO: Filter by user preferences
    // TODO: Sort by deadline and relevance

    const mockOpportunities = [
      {
        id: '1',
        title: 'Upcoming Album Recording',
        description: 'Record label looking for feature artists',
        type: 'RECORD_LABEL',
        genre: 'Hip-Hop',
        location: 'Johannesburg',
        deadline: '2024-03-01',
        applicants: 23,
      },
      {
        id: '2',
        title: 'Music Video Audition',
        description: 'Major music video production',
        type: 'MUSIC_VIDEO',
        genre: 'R&B',
        location: 'Cape Town',
        deadline: '2024-02-15',
        applicants: 45,
      },
    ];

    return NextResponse.json(
      { opportunities: mockOpportunities },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}
