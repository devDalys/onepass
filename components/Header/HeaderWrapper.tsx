'use server';
import Header from '@/components/Header/Header';
import {getProfile} from '@/components/Header/Header.api';

export default async function HeaderWrapper({}) {
  const profile = await getProfile();

  return <Header profile={profile} />;
}
