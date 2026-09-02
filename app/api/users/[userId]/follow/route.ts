import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const token = request.cookies.get('artist_scout_token')?.value ||
                  request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    
    const payload = token ? verifyAuthToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const followingId = params.userId;
    const followerId = payload.userId;

    // Can't follow yourself
    if (followerId === followingId) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({ where: { id: followingId } });
    if (!userExists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });

    if (existingFollow) {
      return NextResponse.json({ error: 'Already following' }, { status: 409 });
    }

    // Create follow
    await prisma.follow.create({
      data: { followerId, followingId },
    });

    // Create notification for followed user
    await prisma.notification.create({
      data: {
        userId: followingId,
        type: 'NEW_FOLLOWER',
        relatedUserId: followerId,
        message: `Someone started following you`,
      },
    });

    // Get follow count
    const followerCount = await prisma.follow.count({
      where: { followingId },
    });

    return NextResponse.json(
      { message: 'User followed', followerCount },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error following user:', error);
    return NextResponse.json(
      { error: 'Failed to follow user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const token = request.cookies.get('artist_scout_token')?.value ||
                  request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    
    const payload = token ? verifyAuthToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const followingId = params.userId;
    const followerId = payload.userId;

    // Delete follow
    const deletedFollow = await prisma.follow.delete({
      where: { followerId_followingId: { followerId, followingId } },
    }).catch(() => null);

    if (!deletedFollow) {
      return NextResponse.json({ error: 'Not following this user' }, { status: 404 });
    }

    // Get updated follow count
    const followerCount = await prisma.follow.count({
      where: { followingId },
    });

    return NextResponse.json(
      { message: 'User unfollowed', followerCount },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return NextResponse.json(
      { error: 'Failed to unfollow user' },
      { status: 500 }
    );
  }
}
