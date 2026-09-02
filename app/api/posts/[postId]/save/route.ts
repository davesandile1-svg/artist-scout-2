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

    // Check if already saved
    const existingSave = await prisma.save.findUnique({
      where: { userId_postId: { userId: payload.userId, postId } },
    });

    if (existingSave) {
      return NextResponse.json({ error: 'Already saved' }, { status: 409 });
    }

    // Create save
    await prisma.save.create({
      data: { userId: payload.userId, postId },
    });

    return NextResponse.json(
      { message: 'Post saved' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json(
      { error: 'Failed to save post' },
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

    // Delete save
    const deletedSave = await prisma.save.delete({
      where: { userId_postId: { userId: payload.userId, postId } },
    }).catch(() => null);

    if (!deletedSave) {
      return NextResponse.json({ error: 'Save not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Save removed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing save:', error);
    return NextResponse.json(
      { error: 'Failed to remove save' },
      { status: 500 }
    );
  }
}
