'use client';
import styles from './Header.module.scss';
import HeaderBlock from '@/components/HeaderBlock';
import NavMenu from '@/components/NavMenu/NavMenu';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import {useAccountsContext} from '@/providers/ContextProvider';
import {useEffect} from 'react';
import {AccountsResponse} from '@/components/AccountsList/types';

interface Props {
  profile: Profile;
  accounts: AccountsResponse[];
  onlyNavMenu?: boolean;
  onIsMobile?: boolean;
}

export default function Header({profile, accounts, onlyNavMenu, onIsMobile}: Props) {
  const {setAccounts, setIsLoaded, accounts: AccountsContext} = useAccountsContext();

  useEffect(() => {
    if (setAccounts && setIsLoaded && !AccountsContext?.length) {
      setAccounts(accounts);
      setIsLoaded(true);
    }
  }, [AccountsContext?.length, accounts, setAccounts, setIsLoaded]);

  return (
    <div className={styles.header}>
      {!onlyNavMenu && <HeaderBlock accounts={accounts} profile={profile} />}
      <NavMenu onlyIsMobile={onIsMobile} />
    </div>
  );
}
