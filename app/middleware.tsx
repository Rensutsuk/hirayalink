import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("Middleware called for path:", path);

  if (path.startsWith('/donor') || path.startsWith('/admin')) {
    console.log("Checking token for protected route");
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    console.log("Token:", token);

    if (!token) {
      console.log("No token found, redirecting to signin");
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    console.log("Token found, allowing access");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/donor/:path*',
    '/admin/:path*',
    '/donor',
    '/admin',
  ],
};
