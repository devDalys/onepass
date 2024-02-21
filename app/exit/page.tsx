'use client';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function ExitPage() {
  const {showSnackbar} = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/logout').then(() => {
      showSnackbar('Вы успешно вышли из аккаунта');
      const timeout = setTimeout(() => {
        router.push('/');
        clearTimeout(timeout);
      }, 500);
    });
  }, []);
  return <FullScreenLoading />;
}
