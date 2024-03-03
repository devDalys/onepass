import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import {_apiFetch} from '@/api/fetchClient';

// export const getAccounts = async (): Promise<AccountsResponse[]> => {
//   const data = await _api.get('/accounts');
//   return data.data.body;
// };

// export const getProfile = async (): Promise<Profile> => {
//   const data = await _api.get('/profile/me');
//
//   return data.data;
// };

// export const getAccounts = async (): Promise<AccountsResponse[]> => {
//   const data = await _apiFetch<any>('/api/accounts', {next: {tags: ['someexplaintag']}});
//   return data.body;
// };
//
export const getProfile = async (): Promise<Profile> => {
  return await _apiFetch<Profile>('/profile/me', {
    next: {tags: ['profile'], revalidate: 600},
  });
};
