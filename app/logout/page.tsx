'use client';
import {useEffect} from 'react';
import deleteAuthCookie from '@/components/LogoutButton/deleteAuthCookie';
import {useRouter} from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    deleteAuthCookie().then(() => {
      router.push('/login');
    });
  }, []);
}
