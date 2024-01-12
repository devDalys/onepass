'use client';
import styles from './Header.module.scss';
import HeaderBlock from '@/components/HeaderBlock';
import NavMenu from '@/components/NavMenu/NavMenu';
import {useStore} from '@/providers/ContextProvider';
import {useEffect, useState} from 'react';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';

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

  useEffect(() => {
    if (setAccounts && !AccountsContext?.length) {
      setAccounts(accounts);
      setIsLoaded?.(true);
    }
    if (setProfile && !ProfileContext) {
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

  return (
    <div className={styles.header}>
      {!onlyNavMenu && <HeaderBlock accounts={AccountsContext || accounts} profile={profile} />}
      <NavMenu onlyIsMobile={onIsMobile} />
    </div>
  );
}
