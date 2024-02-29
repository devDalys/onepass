'use client';
import {AccountsContext} from './Context';
import {useState} from 'react';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [state, setState] = useState<AccountsResponse[]>([]);
  const [profile, setProfile] = useState<Profile>();

  return (
    <AccountsContext.Provider
      value={{
        accounts: state,
        setAccounts: (accounts: AccountsResponse[]) => setState(accounts),
        setProfile,
        profile,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
