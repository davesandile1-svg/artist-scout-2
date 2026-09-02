import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('artist_scout_token')?.value ||
                  request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    
    const payload = token ? verifyAuthToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { targetId, targetType, reason, description } = await request.json();

    if (!targetId || !targetType || !reason) {
      return NextResponse.json(
        { error: 'targetId, targetType, and reason are required' },
        { status: 400 }
      );
    }

    const validTypes = ['user', 'post', 'comment'];
    if (!validTypes.includes(targetType)) {
      return NextResponse.json(
        { error: 'Invalid targetType' },
        { status: 400 }
      );
    }

    // Create report
    let report;
    if (targetType === 'post') {
      report = await prisma.report.create({
        data: {
          reportedBy: payload.userId,
          reason,
          description,
          postId: targetId,
        },
      });
    } else if (targetType === 'comment') {
      report = await prisma.report.create({
        data: {
          reportedBy: payload.userId,
          reason,
          description,
          commentId: targetId,
        },
      });
    } else {
      // For user reports, we might track differently but for now use same structure
      report = await prisma.report.create({
        data: {
          reportedBy: payload.userId,
          reason,
          description,
        },
      });
    }

    // Notify admins - create a system notification
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: { id: true },
    });

    await Promise.all(
      admins.map(admin =>
        prisma.notification.create({
          data: {
            userId: admin.id,
            type: 'FEATURE',
            message: `New report: ${reason}`,
          },
        })
      )
    );

    return NextResponse.json(
      { message: 'Report submitted', reportId: report.id },
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
