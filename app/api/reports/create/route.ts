import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { targetId, targetType, reason, description } = await request.json();

    // TODO: Get user from session
    // TODO: Create report record in database
    // TODO: Notify admins of new report

    return NextResponse.json(
      { message: 'Report submitted', reportId: 'report_id' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    );
  }
}
