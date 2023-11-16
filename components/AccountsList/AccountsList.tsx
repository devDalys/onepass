'use client';
import styles from './AccountsList.module.scss';
import AccountItem, {IAccountItem} from '@/components/AccountsList/AccountItem';
import {useEffect, useLayoutEffect, useState} from 'react';
import {SearchBar} from '@/ui-kit';

interface Props {
  accounts: IAccountItem[];
}

export default function AccountList({accounts}: Props) {
  const [accountsState, setAccounts] = useState<IAccountItem[]>(accounts);
  const [inputState, setInputState] = useState<string>('');

  useLayoutEffect(() => {
    if (inputState && !!inputState?.length) {
      setAccounts((state) =>
        state.filter((item) => item.socialName.toLowerCase().startsWith(inputState.toLowerCase())),
      );
    } else {
      console.log(accounts);
      setAccounts(accounts);
    }
  }, [accounts, inputState]);

  const onInput = () => {
    if (inputState && !!inputState?.length) {
      setAccounts((state) =>
        state.filter((item) => item.socialName.toLowerCase().startsWith(inputState.toLowerCase())),
      );
    } else {
      console.log(accounts);
      setAccounts(accounts);
    }
  };
  return (
    <div className={styles.wrapper}>
      <SearchBar
        placeholder={'Search Websites...'}
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
      />
      {accountsState.map((item) => (
        <AccountItem key={item._id} {...item} />
      ))}
    </div>
  );
}
