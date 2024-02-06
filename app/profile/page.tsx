import {ProfilePage as ProfileComponent} from '@/components/ProfileHeader';
import ProfileMenu from '@/components/ProfileMenu';

export default async function ProfilePage() {
  return (
    <ProfileMenu currentPage="profile">
      <ProfileComponent />
    </ProfileMenu>
  );
}
