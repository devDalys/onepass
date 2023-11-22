import {IAccountItem} from '@/components/AccountsList/AccountItem';
import styles from './styles.module.scss';
import AccountList from '@/components/AccountsList/AccountsList';
import NavMenu from '@/components/NavMenu/NavMenu';
import HeaderBlock, {Profile} from '@/components/HeaderBlock/HeaderBlock';
import {_api} from '@/api';
import {cookies} from 'next/headers';

const getAccounts = async (): Promise<IAccountItem[]> => {
  const data = await _api.get('/accounts');
  return Object.values(data.data.body);
};
const cookie = cookies().get('token');

const getProfile = async (): Promise<Profile> => {
  const data = await _api.get('/auth/me');

  return data.data;
};
export default async function AccountsPage() {
  const accounts = await getAccounts();
  const profile = await getProfile();

  return (
    <>
      <div className={styles.header}>
        <HeaderBlock accounts={accounts} profile={profile} />
        <NavMenu />
      </div>
      <AccountList accounts={accounts} />
    </>
  );
}
