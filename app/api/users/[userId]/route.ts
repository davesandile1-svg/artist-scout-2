import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    // TODO: Fetch user profile from database
    // TODO: Include stats, posts, followers, etc.

    const mockProfile = {
      id: userId,
      username: 'artist_name',
      email: 'artist@example.com',
      role: 'ARTIST',
      name: 'Artist Name',
      image: 'https://via.placeholder.com/128',
      bio: 'Professional artist',
      location: 'South Africa',
      verified: false,
      stats: {
        followers: 2500,
        following: 145,
        totalLikes: 45200,
        totalPosts: 23,
      },
      artist: {
        stageName: 'Artist Name',
        genres: ['Hip-Hop', 'R&B'],
        profileImage: 'https://via.placeholder.com/128',
        location: 'Johannesburg',
        followerCount: 2500,
      },
    };

    return NextResponse.json(mockProfile, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
