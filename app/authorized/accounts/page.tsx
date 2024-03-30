import AccountList from '@/components/AccountsList/AccountsList';
import {getProfile} from '@/components/Header/Header.api';

export default async function AccountsPage() {
  const profile = await getProfile();
  return <AccountList profile={profile} />;
}
