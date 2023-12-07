'use client';
import styles from './Header.module.scss';
import HeaderBlock from '@/components/HeaderBlock';
import NavMenu from '@/components/NavMenu/NavMenu';
import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {_api} from '@/api';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import {useAccountsContext} from '@/Providers/ContextProvider';
import {useEffect, useState} from 'react';
import {NotFoundPage} from '@/components/NotFoundPage';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

const getAccounts = async (): Promise<IAccountItem[]> => {
  const data = await _api.get('/accounts');
  return Object.values(data.data.body);
};

export const getProfile = async (): Promise<Profile> => {
  const data = await _api.get('/auth/me');

  return data.data;
};

export default function Header() {
  const {setAccounts, accounts} = useAccountsContext();
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstRender, setFirstRender] = useState(true);
  const searchParams = useSearchParams();
  const revalidate = Boolean(searchParams.get('revalidate'));

  useEffect(() => {
    if (isFirstRender || revalidate) {
      setIsLoading(true);
      Promise.all([getAccounts(), getProfile()])
        .then(([accounts, profile]) => {
          setAccounts?.(accounts);
          setProfile(profile);
        })
        .finally(() => {
          setIsLoading(false);
          setFirstRender(false);
        });
    }
  }, [revalidate, searchParams]);

  if (isLoading || !profile || !accounts?.length) return <FullScreenLoading />;

  return (
    <div className={styles.header}>
      <HeaderBlock accounts={accounts} profile={profile} />
      <NavMenu />
    </div>
  );
}
