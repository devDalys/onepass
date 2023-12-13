'use client';
import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {_api} from '@/api';
import {useAccountsContext} from '@/providers/ContextProvider';
import {useEffect, useState} from 'react';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import {AccountCreator} from '@/components/AccountCreator/AccountCreator';

export default function AccountPage({params}: {params: {id: string}}) {
  const {accounts} = useAccountsContext();
  const [currentAccount, setCurrentAccount] = useState<IAccountItem>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accounts?.length) {
      _api
        .get('/accounts')
        .then((data) => {
          const curr = data.data.body.find((item: IAccountItem) => item._id === params.id);
          setCurrentAccount(curr);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setCurrentAccount(accounts.find((item) => item._id === params.id));
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <FullScreenLoading />;

  return <AccountCreator currentAccount={currentAccount} />;
}
