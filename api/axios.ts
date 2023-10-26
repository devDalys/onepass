import axios from 'axios';
export const _api = () =>
  axios.create({
    baseURL: 'http://127.0.0.1:8888',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
