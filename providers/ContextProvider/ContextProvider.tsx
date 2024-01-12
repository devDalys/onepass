'use client';
import {AccountsContext} from './Context';
import {useCallback, useState} from 'react';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import {getAccounts} from '@/components/Header/Header.api';

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [state, setState] = useState<AccountsResponse[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const refreshData = useCallback(() => {
    setIsLoaded(false);
    getAccounts().then((data) => {
      setState(data);
      setIsLoaded(true);
    });
  }, []);

  return (
    <AccountsContext.Provider
      value={{
        accounts: state,
        setAccounts: (accounts: AccountsResponse[]) => setState(accounts),
        isLoaded: isLoaded,
        setIsLoaded: setIsLoaded,
        refreshData,
        setProfile,
        profile,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
