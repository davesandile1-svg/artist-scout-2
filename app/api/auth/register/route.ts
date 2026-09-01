import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, username, password, name, role } = await request.json();

    if (!email || !username || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedRole = String(role).toUpperCase();
    if (!['ARTIST', 'SCOUT'].includes(normalizedRole)) {
      return NextResponse.json({ error: 'Invalid account role' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.$transaction(async (transaction) => {
      return transaction.user.create({
        data: {
          email: normalizedEmail,
          username: normalizedUsername,
          name: name.trim(),
          password: passwordHash,
          role: normalizedRole as 'ARTIST' | 'SCOUT',
          ...(normalizedRole === 'ARTIST'
            ? { artist: { create: { stageName: normalizedUsername, genres: [] } } }
            : { scout: { create: { expertise: [] } } }),
        },
        select: { id: true, email: true, username: true, name: true, role: true },
      });
    });

    return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ error: 'Email or username is already registered' }, { status: 409 });
    }
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
