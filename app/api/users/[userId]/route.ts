import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        image: true,
        bio: true,
        location: true,
        website: true,
        role: true,
        createdAt: true,
        artist: {
          select: {
            stageName: true,
            genres: true,
            bio: true,
            profileImage: true,
            coverImage: true,
            location: true,
            country: true,
            spotifyUrl: true,
            appleUrl: true,
            youtubeUrl: true,
            instagramUrl: true,
            twitterUrl: true,
            tiktokUrl: true,
            contactEmail: true,
            bookingInfo: true,
            totalLikes: true,
            totalViews: true,
            followerCount: true,
          },
        },
        scout: {
          select: {
            company: true,
            role: true,
            bio: true,
            profileImage: true,
            location: true,
            expertise: true,
          },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Format response based on role
    const response = {
      ...user,
      followerCount: user._count.followers,
      followingCount: user._count.following,
      postCount: user._count.posts,
      _count: undefined,
    };

    return NextResponse.json({ user: response }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
