import {ProfilePage as ProfileComponent} from '@/components/ProfileHeader';
import ProfileMenu from '@/components/ProfileMenu';
import {getProfile} from '@/components/Header/Header.api';

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <ProfileMenu currentPage="profile">
      <ProfileComponent profile={profile} />
    </ProfileMenu>
  );
}
