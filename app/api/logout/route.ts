import {AUTH_TOKEN} from '@/utils/consts';

export async function GET() {
  return new Response('', {
    headers: {
      'Set-Cookie': `${AUTH_TOKEN}=''; httpOnly; path=/; domain=.onepassword.ru; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    },
  });
}
