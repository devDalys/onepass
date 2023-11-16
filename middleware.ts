import {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {AUTH_TOKEN} from '@/utils/consts';
export function middleware(request: NextRequest) {
  const publicRoutes = ['/', '/login', '/register'];
  const privateRoutes = {
    accounts: '/accounts',
  };

  if (request.cookies.has(AUTH_TOKEN)) {
    const href = request.nextUrl.pathname;
    if (publicRoutes.includes(href)) {
      return NextResponse.redirect(new URL(privateRoutes.accounts, request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
