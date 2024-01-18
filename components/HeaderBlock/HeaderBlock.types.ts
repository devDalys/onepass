import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';

export interface Profile {
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Props {
  accounts: AccountsResponse[];
  profile: Profile;
}

export interface CounterProps {
  length: number;
  text: string;
}
