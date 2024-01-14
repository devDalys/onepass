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

  if (request.url.includes('/api')) {
    let url = request.nextUrl.clone();
    const _url = new URL('https://127.0.0.1:8888/');

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('host', _url.hostname);

    url.protocol = _url.protocol;
    url.hostname = _url.hostname;
    url.pathname = pathname.replace('/api', '');
    url.port = '8888';

    return NextResponse.rewrite(url, {
      headers: requestHeaders,
    });
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.png).*)', '/api'],
};
