'use server';
import {_api} from '@/api';
import Header from '@/components/Header/Header';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import {getAccounts, getProfile} from '@/components/Header/Header.api';

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
