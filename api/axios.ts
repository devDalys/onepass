import axios, {AxiosError} from 'axios';
import {AUTH_TOKEN} from '@/utils/consts';
import {redirect} from 'next/navigation';

const isServer = typeof window === 'undefined';

export const _api = axios.create({
  baseURL: 'http://127.0.0.1:8888',
});
_api.interceptors.request.use(async (config) => {
  const getToken = async () => {
    if (isServer) {
      const lib = await import('next/headers');
      return lib.cookies().get(AUTH_TOKEN)?.value;
    } else {
      const lib = await import('cookies-next');
      return lib.getCookie(AUTH_TOKEN);
    }
  };

  const token = await getToken();

  if (token) {
    config.headers.set({token});
  }

  return config;
});

_api.interceptors.response.use(null, async (error: AxiosError) => {
  if (error?.response?.status === 403) {
    if (isServer) {
      redirect('/logout');
    } else {
      const lib = await import('cookies-next');
      lib.deleteCookie(AUTH_TOKEN);
    }
  }

  return Promise.reject(error);
});
