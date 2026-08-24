import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // TODO: Get session from JWT token or NextAuth session
  return NextResponse.json(
    {
      user: null,
    },
    { status: 200 }
  );
}
