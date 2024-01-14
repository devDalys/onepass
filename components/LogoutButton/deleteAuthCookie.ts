'use server';

import {cookies} from 'next/headers';
import {AUTH_TOKEN} from '@/utils/consts';

export default async function deleteAuthCookie() {
  cookies().delete(AUTH_TOKEN);
}
