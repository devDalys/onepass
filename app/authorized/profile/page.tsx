import {ProfilePage as ProfileComponent} from '@/components/ProfileHeader';
import ProfileMenu from '@/components/ProfileMenu';
import {getProfile} from '@/components/Header/Header.api';
import {checkAuthCookie} from '@/utils/checkAuthCookie';
import {notFound} from 'next/navigation';

export default async function ProfilePage() {
  if (!checkAuthCookie()) return notFound();
  const profile = await getProfile();

  return (
    <ProfileMenu currentPage="profile">
      <ProfileComponent profile={profile} />
    </ProfileMenu>
  );
}
