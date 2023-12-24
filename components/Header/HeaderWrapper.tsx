import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {_api} from '@/api';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import Header from '@/components/Header/Header';

const getAccounts = async (): Promise<IAccountItem[]> => {
  const data = await _api.get('/accounts');
  return Object.values(data.data.body);
};

export const getProfile = async (): Promise<Profile> => {
  const data = await _api.get('/auth/me');

  return data.data;
};

export default async function HeaderWrapper() {
  const accounts = await getAccounts();
  const profile = await getProfile();

  return <Header profile={profile} accounts={accounts} />;
}
