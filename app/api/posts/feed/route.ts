import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch posts from database
    // TODO: Apply pagination (limit, offset)
    // TODO: Include artist info, like/comment counts

    const mockPosts = [
      {
        id: '1',
        artistId: '1',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4',
        caption: 'Check out my latest performance! 🎤',
        artist: {
          stageName: 'The Weeknd',
          profileImage: 'https://via.placeholder.com/44',
          genres: ['R&B', 'Pop'],
          location: 'Toronto, Canada',
        },
        viewCount: 1250,
        _count: {
          likes: 845,
          comments: 234,
        },
      },
      {
        id: '2',
        artistId: '2',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
        caption: 'New freestyle 🔥',
        artist: {
          stageName: 'J. Cole',
          profileImage: 'https://via.placeholder.com/44',
          genres: ['Hip-Hop'],
          location: 'Fayetteville, NC',
        },
        viewCount: 2100,
        _count: {
          likes: 1200,
          comments: 456,
        },
      },
    ];

    return NextResponse.json(
      { posts: mockPosts },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500 }
    );
  }
}
