'use client';
import styles from './Header.module.scss';
import HeaderBlock from '@/components/HeaderBlock';
import NavMenu from '@/components/NavMenu/NavMenu';
import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import {useAccountsContext} from '@/providers/ContextProvider';
import {useEffect} from 'react';

interface Props {
  profile: Profile;
  accounts: IAccountItem[];
}

export default function Header({profile, accounts}: Props) {
  const {setAccounts, setIsLoaded} = useAccountsContext();

  useEffect(() => {
    if (setAccounts && setIsLoaded) {
      setAccounts(accounts);
      setIsLoaded(true);
    }
  }, [accounts, setAccounts, setIsLoaded]);

  return (
    <div className={styles.header}>
      <HeaderBlock accounts={accounts} profile={profile} />
      <NavMenu />
    </div>
  );
}
