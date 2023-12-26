'use client';
import {createContext} from 'react';
import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {AccountsResponse} from '@/components/AccountsList/types';

interface Context {
  accounts?: AccountsResponse[];
  setAccounts?: (accounts: AccountsResponse[]) => void;
  isLoaded?: boolean;
  setIsLoaded?: React.Dispatch<boolean>;
}

export const AccountsContext = createContext<Context>({});
