import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';

type HistoryActions = {
  action: string;
  date: string;
};

export interface Profile {
  name: string;
  email: string;
  avatarUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  accounts: AccountsResponse[];
  isEmailConfirmed: boolean;
  history?: HistoryActions[];
}

export interface Props {
  accounts: AccountsResponse[];
  profile: Profile;
}

export interface CounterProps {
  length: number;
  text: string;
}
