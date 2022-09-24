import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useSession } from 'next-auth/react';

export function middleware(request: NextRequest) {
  // const url = request.nextUrl.clone();
  // console.log();
  // if (url.pathname === '/') {
  //   url.pathname = '/';
  //   return NextResponse.redirect(url);
  // }
}
