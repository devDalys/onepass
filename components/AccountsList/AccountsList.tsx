'use client';
import styles from './AccountsList.module.scss';
import AccountItem, {IAccountItem} from '@/components/AccountsList/AccountItem';
import {useEffect, useState} from 'react';
import {SearchBar} from '@/ui-kit';
import NotSearchFound from '@/components/NotSearchFound/NotSearchFound';
import {useAccountsContext} from '@/Providers/ContextProvider';

export default function AccountList() {
  const [accountsState, setAccounts] = useState<IAccountItem[]>();
  const [inputState, setInputState] = useState<string>('');
  const {setAccounts: setContext, accounts} = useAccountsContext();

  useEffect(() => {
    if (!!accounts?.length) {
      setContext?.(accounts);
    }
  }, [accounts, setContext]);

  const onCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
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