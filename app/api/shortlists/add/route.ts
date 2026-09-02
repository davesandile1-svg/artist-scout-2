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

    const { artistIds, shortlistId, note } = await request.json();

    if (!artistIds || !Array.isArray(artistIds) || artistIds.length === 0) {
      return NextResponse.json({ error: 'Artist IDs are required' }, { status: 400 });
    }

    // Get the current user (must be a scout)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { scout: true },
    });

    if (!user?.scout) {
      return NextResponse.json({ error: 'Only scouts can use shortlists' }, { status: 403 });
    }

    // If shortlistId not provided, create a default shortlist
    let shortlist;
    if (shortlistId) {
      shortlist = await prisma.shortlist.findUnique({
        where: { id: shortlistId },
      });
      if (!shortlist || shortlist.scoutId !== user.scout.id) {
        return NextResponse.json({ error: 'Shortlist not found or unauthorized' }, { status: 404 });
      }
    } else {
      // Create default shortlist if needed
      shortlist = await prisma.shortlist.findFirst({
        where: { scoutId: user.scout.id, name: 'Favorites' },
      });
      if (!shortlist) {
        shortlist = await prisma.shortlist.create({
          data: {
            scoutId: user.scout.id,
            name: 'Favorites',
            description: 'Default shortlist',
          },
        });
      }
    }

    // Add artists to shortlist
    const results = await Promise.all(
      artistIds.map(artistId =>
        prisma.shortlistArtist.create({
          data: {
            shortlistId: shortlist.id,
            userId: artistId,
          },
        }).catch(() => null)
      )
    );

    const addedCount = results.filter(r => r !== null).length;

    // If note provided, create scout notes
    if (note) {
      await Promise.all(
        artistIds.map(artistId =>
          prisma.scoutNote.create({
            data: {
              scoutId: payload.userId,
              artistId,
              content: note,
              isPrivate: true,
            },
          }).catch(() => null)
        )
      );
    }

    return NextResponse.json(
      { message: `Added ${addedCount} artists to shortlist`, shortlist },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding to shortlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to shortlist' },
      { status: 500 }
    );
  }
}
