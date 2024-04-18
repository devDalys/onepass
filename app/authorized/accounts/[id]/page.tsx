import {getProfile} from '@/components/Header/Header.api';
import SingleAccountPage from '@/components/AccountCreator/SingleAccountPage';
import {checkAuthCookie} from '@/utils/checkAuthCookie';
import {notFound} from 'next/navigation';

export default async function AccountPage({params}: {params: {id: string}}) {
  if (!checkAuthCookie()) return notFound();
  const profile = await getProfile();

  return <SingleAccountPage id={params.id} profile={profile} />;
}
