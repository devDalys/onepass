'use client';
import {useAccountsContext} from '@/providers/ContextProvider';
import {useMemo} from 'react';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import {AccountCreator} from '@/components/AccountCreator/AccountCreator';
import {notFound} from 'next/navigation';

export default function AccountPage({params}: {params: {id: string}}) {
  const {accounts} = useAccountsContext();

  const currAccount = useMemo(() => {
    return accounts?.find((item) => item._id === params.id);
  }, [accounts, params.id]);

  if (!accounts?.length) return <FullScreenLoading />;

  if (accounts.length && !currAccount) return notFound();

  return <AccountCreator currentAccount={currAccount} />;
}
