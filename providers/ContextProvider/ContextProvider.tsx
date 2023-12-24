'use client';
import {AccountsContext} from './Context';
import {useState} from 'react';
import {IAccountItem} from '@/components/AccountsList/AccountItem';

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [state, setState] = useState<IAccountItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AccountsContext.Provider
      value={{
        accounts: state,
        setAccounts: (accounts: IAccountItem[]) => setState(accounts),
        isLoaded: isLoaded,
        setIsLoaded: setIsLoaded,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
