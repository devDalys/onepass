import {ProfilePage as ProfileComponent} from '@/components/ProfileHeader';
import ProfileMenu from '@/components/ProfileMenu';

export default async function ProfilePage() {
  return (
    <>
      <ProfileMenu currentPage="profile">
        <ProfileComponent />
        {/*<div className={styles.actions}>*/}
        {/*  <div>*/}
        {/*    {isEditMode ? (*/}
        {/*      <EditProfile*/}
        {/*        type={isEditMode}*/}
        {/*        name={profile?.name as string}*/}
        {/*        onSubmit={handleSubmit}*/}
        {/*        onCancel={() => setEditMode(null)}*/}
        {/*      />*/}
        {/*    ) : (*/}
        {/*      <>*/}
        {/*        <div className={styles.action} onClick={() => setEditMode('name')}>*/}
        {/*          <User />*/}
        {/*          Update Profile*/}
        {/*        </div>*/}
        {/*        <div className={styles.action} onClick={() => setEditMode('password')}>*/}
        {/*          <Lock />*/}
        {/*          Change Master Password*/}
        {/*        </div>*/}
        {/*      </>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </ProfileMenu>
    </>
  );
}
