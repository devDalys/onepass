import {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {AUTH_TOKEN} from '@/utils/consts';
export function middleware(request: NextRequest) {
  const publicRoutes = ['/', '/login', '/register'];
  const privateRoutes = {
    accounts: '/accounts',
    logout: '/logout',
  };
  const pathname = request.nextUrl.pathname;

  if (request.cookies.has(AUTH_TOKEN)) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(privateRoutes.accounts, request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.png).*)'],
};
