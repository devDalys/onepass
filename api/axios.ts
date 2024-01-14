import axios, {AxiosError} from 'axios';
import {AUTH_TOKEN} from '@/utils/consts';
import {redirect} from 'next/navigation';
import {revalidateCache} from '@/api/revalidatePath';

const isServer = typeof window === 'undefined';
export const _api = axios.create({
  baseURL: 'https://local.onepass.ru/',
  withCredentials: true,
});
_api.interceptors.request.use(async (config) => {
  if (isServer) {
    const lib = await import('next/headers');
    const token = lib.cookies().get(AUTH_TOKEN)?.value;
    if (token) {
      config.headers.set({token});
    }
  }

  return config;
});

_api.interceptors.response.use(
  (value) => {
    revalidateCache();
    return value;
  },
  async (error: AxiosError) => {
    if (error?.response?.status === 403) {
      redirect('/logout');
    }
    return Promise.reject(error);
  },
);
