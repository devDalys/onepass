import AccountList from '@/components/AccountsList/AccountsList';
import {getProfile} from '@/components/Header/Header.api';
import {checkAuthCookie} from '@/utils/checkAuthCookie';
import {notFound} from 'next/navigation';

export default async function AccountsPage() {
  if (!checkAuthCookie()) return notFound();
  const profile = await getProfile();
  return <AccountList profile={profile} />;
}
