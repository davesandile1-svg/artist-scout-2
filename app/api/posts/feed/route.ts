import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('artist_scout_token')?.value ||
                  request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    
    const payload = token ? verifyAuthToken(token) : null;

    const page = parseInt(request.nextUrl.searchParams.get('page') || '0');
    const limit = 10;
    const skip = page * limit;

    // Fetch posts from database with artist info and engagement counts
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        userId: true,
        artistId: true,
        contentType: true,
        videoUrl: true,
        thumbnailUrl: true,
        caption: true,
        hashtags: true,
        genres: true,
        musicTrack: true,
        musicArtist: true,
        duration: true,
        viewCount: true,
        createdAt: true,
        artist: {
          select: {
            stageName: true,
            profileImage: true,
            genres: true,
            location: true,
            country: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            shares: true,
            saves: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    });

    // If no posts from database, provide sample posts
    if (posts.length === 0 && page === 0) {
      const mockPosts = [
        {
          id: '1',
          userId: 'sample_artist_1',
          artistId: 'sample_artist_1',
          contentType: 'VIDEO' as const,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4',
          thumbnailUrl: null,
          caption: 'Check out my latest performance! 🎤',
          hashtags: ['#music', '#performance'],
          genres: ['R&B', 'Pop'],
          musicTrack: 'Blinding Lights',
          musicArtist: 'The Weeknd',
          duration: 30,
          viewCount: 1250,
          createdAt: new Date(),
          artist: {
            stageName: 'The Weeknd',
            profileImage: 'https://via.placeholder.com/44',
            genres: ['R&B', 'Pop'],
            location: 'Toronto, Canada',
            country: 'Canada',
          },
          _count: {
            likes: 845,
            comments: 234,
            shares: 45,
            saves: 123,
          },
        },
        {
          id: '2',
          userId: 'sample_artist_2',
          artistId: 'sample_artist_2',
          contentType: 'VIDEO' as const,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
          thumbnailUrl: null,
          caption: 'New freestyle 🔥',
          hashtags: ['#hiphop', '#freestyle'],
          genres: ['Hip-Hop'],
          musicTrack: null,
          musicArtist: null,
          duration: 45,
          viewCount: 2100,
          createdAt: new Date(Date.now() - 86400000),
          artist: {
            stageName: 'J. Cole',
            profileImage: 'https://via.placeholder.com/44',
            genres: ['Hip-Hop'],
            location: 'Fayetteville, NC',
            country: 'USA',
          },
          _count: {
            likes: 1200,
            comments: 456,
            shares: 89,
            saves: 234,
          },
        },
      ];
      return NextResponse.json({ posts: mockPosts, hasMore: false });
    }

    const hasMore = posts.length === limit;
    return NextResponse.json({ posts, hasMore }, { status: 200 });
  } catch (error) {
    console.error('Error fetching feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500 }
    );
  }
}
