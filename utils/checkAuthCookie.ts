'use server';

import {cookies} from 'next/headers';
import {AUTH_TOKEN} from '@/utils/consts';

export const checkAuthCookie = () => {
  return cookies().has(AUTH_TOKEN);
};
