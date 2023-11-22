'use client';
import {AUTH_TOKEN} from '@/utils/consts';
import {useRouter} from 'next/navigation';
import {deleteCookie} from 'cookies-next';
import {useEffect} from 'react';
import {FullScreenLoading} from '@/components/FullScreenLoading';

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    const staleTime = 1000;
    deleteCookie(AUTH_TOKEN);
    const timeout = setTimeout(() => {
      router.push('/login');
      clearTimeout(timeout);
    }, staleTime);
  }, []);

  return <FullScreenLoading />;
}
