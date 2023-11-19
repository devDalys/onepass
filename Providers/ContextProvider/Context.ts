'use client';
import {createContext} from 'react';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import {IAccountItem} from '@/components/AccountsList/AccountItem';

interface Context {
  accounts?: IAccountItem[];
  setAccounts?: (accounts: IAccountItem[]) => void;
}

export const AccountsContext = createContext<Context>({});
