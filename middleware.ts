import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';

// Routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/callback',
  '/api/auth',
  '/pricing',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (pathname.startsWith('/api/') || pathname.startsWith('/feed') || 
      pathname.startsWith('/profile') || pathname.startsWith('/create') ||
      pathname.startsWith('/messages') || pathname.startsWith('/notifications') ||
      pathname.startsWith('/admin')) {
    
    const token = request.cookies.get('artist_scout_token')?.value ||
                  request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    
    if (!token || !verifyAuthToken(token)) {
      // For API routes, return 401
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // For pages, redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
