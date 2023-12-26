import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {_api} from '@/api';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import Header from '@/components/Header/Header';
import {AccountsResponse} from '@/components/AccountsList/types';

export const getAccounts = async (): Promise<AccountsResponse[]> => {
  const data = await _api.get('/accounts');
  return data.data.body;
};

export const getProfile = async (): Promise<Profile> => {
  const data = await _api.get('/auth/me');

  return data.data;
};

interface HeaderProps {
  onlyNavMenu?: boolean;
  onlyIsMobile?: boolean;
}

export default async function HeaderWrapper({
  onlyNavMenu = false,
  onlyIsMobile = false,
}: HeaderProps) {
  const accounts = await getAccounts();
  const profile = await getProfile();

  return (
    <Header
      profile={profile}
      onIsMobile={onlyIsMobile}
      onlyNavMenu={onlyNavMenu}
      accounts={accounts}
    />
  );
}
