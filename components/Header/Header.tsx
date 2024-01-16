'use client';
import styles from './Header.module.scss';
import HeaderBlock from '@/components/HeaderBlock';
import NavMenu from '@/components/NavMenu/NavMenu';
import {useStore} from '@/providers/ContextProvider';
import {useEffect, useState} from 'react';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import {PageTitle} from '@/ui-kit';
import {usePathname} from 'next/navigation';

interface Props {
  profile: Profile;
  accounts: AccountsResponse[];
  onlyNavMenu?: boolean;
  onIsMobile?: boolean;
}

export default function Header({profile, accounts, onlyNavMenu, onIsMobile}: Props) {
  const {
    setProfile,
    profile: ProfileContext,
    setAccounts,
    setIsLoaded,
    accounts: AccountsContext,
  } = useStore();
  const pathName = usePathname();

  useEffect(() => {
    if (setAccounts) {
      setAccounts(accounts);
      setIsLoaded?.(true);
    }
    if (setProfile) {
      setProfile(profile);
    }
  }, [
    AccountsContext?.length,
    ProfileContext,
    accounts,
    profile,
    setAccounts,
    setIsLoaded,
    setProfile,
  ]);

  const getTitle = () => {
    if (pathName.startsWith('/profile')) return 'Profile';
    if (pathName.startsWith('/accounts')) return 'Accounts';
  };

  return (
    <>
      <PageTitle>{getTitle()}</PageTitle>

      <div className={styles.header}>
        {!onlyNavMenu && <HeaderBlock accounts={AccountsContext || accounts} profile={profile} />}
        <NavMenu onlyIsMobile={onIsMobile} />
      </div>
    </>
  );
}
