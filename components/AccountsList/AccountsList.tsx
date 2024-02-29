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
import {useSearchParams} from 'next/navigation';
import {revalidateCache} from '@/api/revalidatePath';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';

export default function AccountList({profile: {accounts, ...profile}}: {profile: Profile}) {
  const [inputState, setInputState] = useState<string>('');
  const [accountsState, setAccounts] = useState<AccountsResponse[] | undefined>(accounts);

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
  if (accounts && !accounts.length) return <WelcomeComponent name={profile?.name} />;

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
