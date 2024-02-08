'use client';
import styles from './AccountsList.module.scss';
import AccountItem from '@/components/AccountsList/AccountItem';
import {useEffect, useState} from 'react';
import {SearchBar} from '@/ui-kit';
import NotSearchFound from '@/components/NotSearchFound/NotSearchFound';
import {useStore} from '@/providers/ContextProvider';
import {useSnackbar} from '@/providers/SnackbarProvider';
import WelcomeComponent from '../WelcomeComponent/WelcomeComponent';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import {useRouter, useSearchParams} from 'next/navigation';
import {revalidateCache} from '@/api/revalidatePath';

export default function AccountList() {
  const [inputState, setInputState] = useState<string>('');
  const {accounts, isLoaded, refreshData} = useStore();
  const [accountsState, setAccounts] = useState<AccountsResponse[] | undefined>(accounts);
  const router = useRouter();

  const {showSnackbar} = useSnackbar();
  const isRevalidate = useSearchParams().get('revalidate');
  useEffect(() => {
    if (isRevalidate) {
      revalidateCache();
    }
  }, []);

  const onCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    showSnackbar('Пароль скопирован');
  };

  useEffect(() => {
    if (!!inputState?.length && accounts?.length) {
      setAccounts(() =>
        [...accounts].filter((item) =>
          item.socialName.toLowerCase().startsWith(inputState.toLowerCase()),
        ),
      );
    } else {
      setAccounts(accounts);
    }
  }, [accounts, inputState]);
  if (!isLoaded) return <FullScreenLoading />;
  if (accounts && !accounts.length) return <WelcomeComponent />;

  return (
    <div className={styles.wrapper}>
      <SearchBar
        placeholder={'Поиск аккаунтов...'}
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
      />
      {!accountsState?.length && <NotSearchFound />}
      {accountsState?.map((item) => <AccountItem key={item._id} {...item} onCopy={onCopy} />)}
    </div>
  );
}
