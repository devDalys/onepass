'use server';
import Header from '@/components/Header/Header';
import {getAccounts, getProfile} from '@/components/Header/Header.api';

export default async function HeaderWrapper({}) {
  const accounts = await getAccounts();
  const profile = await getProfile();

  return <Header profile={profile} accounts={accounts} />;
}
