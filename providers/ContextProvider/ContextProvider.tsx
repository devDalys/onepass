'use client';
import {AccountsContext} from './Context';
import {useState} from 'react';
import {IAccountItem} from '@/components/AccountsList/AccountItem';

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [state, setState] = useState<IAccountItem[]>([]);

  return (
    <AccountsContext.Provider
      value={{accounts: state, setAccounts: (accounts: IAccountItem[]) => setState(accounts)}}
    >
      {children}
    </AccountsContext.Provider>
  );
};
