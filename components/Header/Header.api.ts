import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import {_api} from '@/api';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';

export const getAccounts = async (): Promise<AccountsResponse[]> => {
  const data = await _api.get('/accounts');
  return data.data.body;
};

export const getProfile = async (): Promise<Profile> => {
  const data = await _api.get('/auth/me');

  return data.data;
};
