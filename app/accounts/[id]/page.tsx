import SingleAccountPage from '@/components/SingleAccountPage';
import {getProfile} from '@/components/Header/Header.api';

export default async function AccountPage({params}: {params: {id: string}}) {
  const profile = await getProfile();

  return <SingleAccountPage id={params.id} profile={profile} />;
}
