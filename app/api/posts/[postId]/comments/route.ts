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
    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });
    }

    // Check if post exists
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        userId: payload.userId,
        postId,
        content: content.trim(),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Create notification for post author (if not commenter)
    if (post.userId !== payload.userId) {
      await prisma.notification.create({
        data: {
          userId: post.userId,
          type: 'COMMENT',
          relatedUserId: payload.userId,
          relatedPostId: postId,
          message: 'Someone commented on your post',
        },
      });
    }

    return NextResponse.json(
      { message: 'Comment created', comment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const page = parseInt(request.nextUrl.searchParams.get('page') || '0');
    const limit = 20;
    const skip = page * limit;

    // Fetch comments with user info
    const comments = await prisma.comment.findMany({
      where: { postId },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: { replies: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    });

    const total = await prisma.comment.count({ where: { postId } });
    const hasMore = skip + limit < total;

    return NextResponse.json(
      { comments, total, hasMore },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
