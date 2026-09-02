import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get('page') || '0');
    const genre = request.nextUrl.searchParams.get('genre');
    const type = request.nextUrl.searchParams.get('type');
    const location = request.nextUrl.searchParams.get('location');
    const limit = 20;
    const skip = page * limit;

    const whereClause: any = { isActive: true };
    if (genre) whereClause.genre = { contains: genre, mode: 'insensitive' };
    if (type) whereClause.type = type;
    if (location) whereClause.location = { contains: location, mode: 'insensitive' };

    const opportunities = await prisma.opportunity.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        genre: true,
        location: true,
        deadline: true,
        imageUrl: true,
        applicationUrl: true,
        createdAt: true,
        createdBy: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { deadline: 'asc' },
      take: limit,
      skip,
    });

    const total = await prisma.opportunity.count({ where: whereClause });
    const hasMore = skip + limit < total;

    return NextResponse.json(
      { opportunities, total, hasMore },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('artist_scout_token')?.value ||
                  request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    
    const payload = token ? verifyAuthToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only admins can create opportunities' }, { status: 403 });
    }

    const { title, description, type, genre, location, deadline, imageUrl, applicationUrl } =
      await request.json();

    if (!title || !description || !type) {
      return NextResponse.json(
        { error: 'title, description, and type are required' },
        { status: 400 }
      );
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        title,
        description,
        type,
        genre,
        location,
        deadline: deadline ? new Date(deadline) : null,
        imageUrl,
        applicationUrl,
        createdById: payload.userId,
      },
    });

    return NextResponse.json(
      { message: 'Opportunity created', opportunity },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to create opportunity' },
      { status: 500 }
    );
  }
}
