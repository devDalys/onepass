import {AUTH_TOKEN} from '@/utils/consts';
import {redirect} from 'next/navigation';

const isServer = typeof window === 'undefined';

interface RequestOptions extends RequestInit {
  // Добавляем возможность устанавливать другие заголовки
  headers?: Record<string, string>;
}

export const _api = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const defaultOptions: RequestOptions = {
    method: 'GET',
    credentials: 'include',
    headers: {},
    ...options,
  };

  if (isServer) {
    const lib = await import('next/headers');
    const token = lib.cookies().get(AUTH_TOKEN)?.value;

    if (token) {
      defaultOptions.headers = defaultOptions.headers || {};
      defaultOptions.headers['token'] = token;
    }
  }

  return fetch(`${process.env['NEXT_PUBLIC_BACKAPI']}${url}`, defaultOptions)
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 403) {
          redirect('/exit');
        }
        throw new Error(`Request failed with status: ${response.status}`);
      }

      return (await response.json()) as T;
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
};
