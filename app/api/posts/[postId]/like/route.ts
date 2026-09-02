import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const token = request.cookies.get('artist_scout_token')?.value ||
                  request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    
    const payload = token ? verifyAuthToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const postId = params.postId;

    // Check if post exists
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: { userId_postId: { userId: payload.userId, postId } },
    });

    if (existingLike) {
      return NextResponse.json({ error: 'Already liked' }, { status: 409 });
    }

    // Create like
    await prisma.like.create({
      data: { userId: payload.userId, postId },
    });

    // Update like count in post
    const likeCount = await prisma.like.count({ where: { postId } });

    // Create notification for post author
    if (post.userId !== payload.userId) {
      await prisma.notification.create({
        data: {
          userId: post.userId,
          type: 'LIKE',
          relatedUserId: payload.userId,
          relatedPostId: postId,
          message: 'Someone liked your post',
        },
      });
    }

    return NextResponse.json(
      { message: 'Post liked', likeCount },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error liking post:', error);
    return NextResponse.json(
      { error: 'Failed to like post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const token = request.cookies.get('artist_scout_token')?.value ||
                  request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    
    const payload = token ? verifyAuthToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const postId = params.postId;

    // Delete like
    const deletedLike = await prisma.like.delete({
      where: { userId_postId: { userId: payload.userId, postId } },
    }).catch(() => null);

    if (!deletedLike) {
      return NextResponse.json({ error: 'Like not found' }, { status: 404 });
    }

    // Get updated like count
    const likeCount = await prisma.like.count({ where: { postId } });

    return NextResponse.json(
      { message: 'Like removed', likeCount },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error unliking post:', error);
    return NextResponse.json(
      { error: 'Failed to unlike post' },
      { status: 500 }
    );
  }
}
