import {_api} from '@/api';
import {cookies} from 'next/headers';
import AccountItem, {IAccountItem} from '@/components/AccountsList/AccountItem';
import styles from './styles.module.scss';
import AccountList from '@/components/AccountsList/AccountsList';
import Counters from '@/components/Counters';

const getAccounts = async (): Promise<IAccountItem[]> => {
  const data = await _api(cookies().get('token')?.value).get('/accounts');
  return Object.values(data.data.body);
};

export default async function AccountsPage() {
  const data = await getAccounts();

  return (
    <>
      <Counters accounts={data} />
      <AccountList accounts={data} />
    </>
  );
}
