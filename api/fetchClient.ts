import {cookies} from 'next/headers';

export const fetchClient = (url: string, init?: RequestInit | undefined) => {
  const token = cookies().get('token')?.value;

  return fetch('http://127.0.0.1:8888' + url, {
    headers: {
      token: token as string,
    },
    next: {
      revalidate: 1,
    },
    ...init,
  }).then((data) => data.json());
};
