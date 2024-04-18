'use server';
import Header from '@/components/Header/Header';
import {getProfile} from '@/components/Header/Header.api';
import {checkAuthCookie} from '@/utils/checkAuthCookie';
import {notFound} from 'next/navigation';

export default async function HeaderWrapper({}) {
  if (!checkAuthCookie()) return notFound();
  const profile = await getProfile();

  return <Header profile={profile} />;
}
