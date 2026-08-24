import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const { content } = await request.json();

    // TODO: Get user from session
    // TODO: Create comment record in database
    // TODO: Create notification for post author

    return NextResponse.json(
      { message: 'Comment created', commentId: 'comment_id' },
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
    // TODO: Fetch comments from database
    // TODO: Include author info and reply counts

    return NextResponse.json(
      { comments: [] },
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
