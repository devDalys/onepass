import {IAccountItem} from '@/components/AccountsList/AccountItem';
import styles from './styles.module.scss';
import AccountList from '@/components/AccountsList/AccountsList';
import NavMenu from '@/components/NavMenu/NavMenu';
import HeaderBlock, {Profile} from '@/components/HeaderBlock/HeaderBlock';
import {fetchClient} from '@/api/fetchClient';

const getAccounts = async (): Promise<IAccountItem[]> => {
  const data = await fetchClient('/accounts');
  return Object.values(data.body);
};

const getProfile = async (): Promise<Profile> => {
  return await fetchClient('/auth/me');
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
