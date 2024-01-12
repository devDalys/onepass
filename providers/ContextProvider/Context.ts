'use client';
import {createContext} from 'react';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';

interface Context {
  accounts?: AccountsResponse[];
  setAccounts?: (accounts: AccountsResponse[]) => void;
  profile?: Profile;
  setProfile?: (profile: Profile) => void;
  isLoaded?: boolean;
  setIsLoaded?: React.Dispatch<boolean>;
  refreshData?: () => void;
}

export const AccountsContext = createContext<Context>({});
