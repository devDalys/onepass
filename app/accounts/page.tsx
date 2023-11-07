import {_api} from '@/api';
import {cookies} from 'next/headers';
import AccountItem, {IAccountItem} from '@/components/AccountItem/AccountItem';
import styles from './styles.module.scss';

const getAccounts = async (): Promise<IAccountItem[]> => {
  const data = await _api(cookies().get('token')?.value).get('/accounts');
  return Object.values(data.data);
};

export default async function AccountsPage() {
  const data = await getAccounts();
  return (
    <div className={styles.wrapper}>
      {data.map((item) => (
        <AccountItem key={item.socialName} {...item} />
      ))}
    </div>
  );
}
