import {_api} from '@/api';
import {cookies} from 'next/headers';
import AccountItem, {IAccountItem} from '@/components/AccountsList/AccountItem';
import styles from './styles.module.scss';
import AccountList from '@/components/AccountsList/AccountsList';
import HeaderBlock from '@/components/HeaderBlock';
import NavMenu from '@/components/NavMenu/NavMenu';
import {AxiosError} from 'axios';
import {deleteCookie} from 'cookies-next';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import {AUTH_TOKEN} from '@/utils/consts';

const token = cookies().get('token')?.value;

const getAccounts = async (): Promise<IAccountItem[]> => {
  const data = await _api(token).get('/accounts');
  return Object.values(data.data.body);
};

const getMe = async (): Promise<Profile> => {
  const data = await _api(token).get('/auth/me');

  if (data instanceof AxiosError) {
    deleteCookie(AUTH_TOKEN);
  }

  return data.data;
};

export default async function AccountsPage() {
  const accounts = await getAccounts();
  const profile = await getMe();

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
