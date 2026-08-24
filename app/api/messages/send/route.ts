import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { receiverId, content } = await request.json();

    // TODO: Get user from session
    // TODO: Create message record in database
    // TODO: Create notification for recipient

    return NextResponse.json(
      { message: 'Message sent', messageId: 'message_id' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
