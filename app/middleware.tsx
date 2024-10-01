import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  // Check if the path starts with /donor or /admin
  if (path.startsWith('/donor') || path.startsWith('/admin')) {
    if (!token) {
      // Redirect to login if there's no token
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check if the user has the correct role for the route
    if (path.startsWith('/donor') && token.role !== 'donor') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (path.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['donor*', 'admin/:path*'],
};
