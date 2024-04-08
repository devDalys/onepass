'use server';

import {cookies} from 'next/headers';
import {AUTH_TOKEN} from '@/utils/consts';

export const checkAuthCookie = async () => {
  console.log(cookies().has(AUTH_TOKEN));

  return cookies().has(AUTH_TOKEN);
};
