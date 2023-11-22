import axios from 'axios';

export const _api = (token?: string) =>
  axios.create({
    baseURL: 'http://127.0.0.1:8888',
    headers: {
      token: token,
    },
  });
