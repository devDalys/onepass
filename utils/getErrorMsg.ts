import {AxiosError} from 'axios';

export const getErrorMsg = (e: unknown) => {
  if (e instanceof AxiosError && e?.response?.data?.msg) {
    return e?.response?.data?.msg as string;
  }
  return '';
};
