'use client';
import styles from './Header.module.scss';
import HeaderBlock from '@/components/HeaderBlock';
import NavMenu from '@/components/NavMenu/NavMenu';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import {useAccountsContext} from '@/providers/ContextProvider';
import {useEffect, useState} from 'react';
import {AccountsResponse} from '@/components/AccountsList/types';

interface Props {
  profile: Profile;
  accounts: AccountsResponse[];
  onlyNavMenu?: boolean;
  onIsMobile?: boolean;
}

export default function Header({profile, accounts, onlyNavMenu, onIsMobile}: Props) {
  const {setAccounts, setIsLoaded, accounts: AccountsContext} = useAccountsContext();
  const [isFirstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (setAccounts && setIsLoaded && !AccountsContext?.length && isFirstRender) {
      setAccounts(accounts);
      setIsLoaded(true);
      setFirstRender(false);
    }
  }, [AccountsContext?.length, accounts, isFirstRender, setAccounts, setIsLoaded]);

  return (
    <div className={styles.header}>
      {!onlyNavMenu && <HeaderBlock accounts={AccountsContext || accounts} profile={profile} />}
      <NavMenu onlyIsMobile={onIsMobile} />
    </div>
  );
}
