'use server';

import {cookies} from 'next/headers';
import {AUTH_TOKEN} from '@/utils/consts';

export default async function deleteAuthCookie() {
  console.log(cookies().get(AUTH_TOKEN));
  cookies().delete(AUTH_TOKEN);
}
