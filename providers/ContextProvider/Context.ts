'use client';
import {createContext} from 'react';
import {IAccountItem} from '@/components/AccountsList/AccountItem';

interface Context {
  accounts?: IAccountItem[];
  setAccounts?: (accounts: IAccountItem[]) => void;
  isLoaded?: boolean;
  setIsLoaded?: React.Dispatch<boolean>;
}

export const AccountsContext = createContext<Context>({});
