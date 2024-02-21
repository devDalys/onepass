'use client';
import styles from './Header.module.scss';
import HeaderBlock from '@/components/HeaderBlock';
import NavMenu from '@/components/NavMenu/NavMenu';
import {useStore} from '@/providers/ContextProvider';
import {useEffect} from 'react';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import {PageTitle} from '@/ui-kit';
import {usePathname} from 'next/navigation';

interface Props {
  profile: Profile;
  accounts: AccountsResponse[];
}

export default function Header({profile, accounts}: Props) {
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
    if (pathName.startsWith('/profile')) return 'Профиль';
    if (pathName.startsWith('/accounts')) return 'Аккаунты';
  };

  return (
    <>
      <PageTitle>{getTitle()}</PageTitle>

      <div className={styles.header}>
        <HeaderBlock accounts={AccountsContext || accounts} profile={profile} />
        <NavMenu />
      </div>
    </>
  );
}
