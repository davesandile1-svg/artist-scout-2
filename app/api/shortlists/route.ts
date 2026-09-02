import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('artist_scout_token')?.value ||
                  request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    
    const payload = token ? verifyAuthToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current user's scout profile
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { scout: true },
    });

    if (!user?.scout) {
      return NextResponse.json({ error: 'Only scouts can view shortlists' }, { status: 403 });
    }

    // Fetch shortlists for this scout
    const shortlists = await prisma.shortlist.findMany({
      where: { scoutId: user.scout.id },
      include: {
        _count: {
          select: { artists: true },
        },
        artists: {
          take: 5,
          select: {
            user: {
              select: {
                id: true,
                username: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ shortlists }, { status: 200 });
  } catch (error) {
    console.error('Error fetching shortlists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shortlists' },
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

    const { name, description, genre, location, isPublic } = await request.json();

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Shortlist name is required' }, { status: 400 });
    }

    // Get current user's scout profile
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { scout: true },
    });

    if (!user?.scout) {
      return NextResponse.json({ error: 'Only scouts can create shortlists' }, { status: 403 });
    }

    // Create shortlist
    const shortlist = await prisma.shortlist.create({
      data: {
        scoutId: user.scout.id,
        name: name.trim(),
        description: description?.trim(),
        genre,
        location,
        isPublic: isPublic || false,
      },
    });

    return NextResponse.json(
      { message: 'Shortlist created', shortlist },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating shortlist:', error);
    return NextResponse.json(
      { error: 'Failed to create shortlist' },
      { status: 500 }
    );
  }
}
