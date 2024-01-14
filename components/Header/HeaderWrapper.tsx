'use server';
import Header from '@/components/Header/Header';
import {getAccounts, getProfile} from '@/components/Header/Header.api';
import {unstable_cache, unstable_noStore} from 'next/cache';

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
