import {getProfile} from '@/components/Header/Header.api';
import SingleAccountPage from '@/components/AccountCreator/SingleAccountPage';

export default async function AccountPage({params}: {params: {id: string}}) {
  const profile = await getProfile();

  return <SingleAccountPage id={params.id} profile={profile} />;
}
