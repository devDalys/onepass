'use client';
import {AccountsContext} from './Context';
import {useState} from 'react';
import {AccountsResponse} from '@/components/AccountsList/types';

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [state, setState] = useState<AccountsResponse[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AccountsContext.Provider
      value={{
        accounts: state,
        setAccounts: (accounts: AccountsResponse[]) => setState(accounts),
        isLoaded: isLoaded,
        setIsLoaded: setIsLoaded,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
