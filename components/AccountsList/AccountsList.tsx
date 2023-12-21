'use client';
import styles from './AccountsList.module.scss';
import AccountItem, {IAccountItem} from '@/components/AccountsList/AccountItem';
import {useEffect, useState} from 'react';
import {SearchBar} from '@/ui-kit';
import NotSearchFound from '@/components/NotSearchFound/NotSearchFound';
import {useAccountsContext} from '@/providers/ContextProvider';
import {useSnackbar} from '@/providers/SnackbarProvider';
import WelcomeComponent from '../WelcomeComponent/WelcomeComponent';

export default function AccountList() {
  const [inputState, setInputState] = useState<string>('');
  const {setAccounts: setContext, accounts} = useAccountsContext();
  const [accountsState, setAccounts] = useState<IAccountItem[] | undefined>(accounts);

  const {showSnackbar} = useSnackbar();

  useEffect(() => {
    if (!!accounts?.length) {
      setContext?.(accounts);
    }
  }, [accounts, setContext]);

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
  if (!accounts?.length) return <WelcomeComponent />;

  return (
    <div className={styles.wrapper}>
      <SearchBar
        placeholder={'Search Websites...'}
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
      />
      {!accountsState?.length && <NotSearchFound />}
      {accountsState?.map((item) => <AccountItem key={item._id} {...item} onCopy={onCopy} />)}
    </div>
  );
}
