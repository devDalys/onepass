// import {useEffect, useState} from 'react';
// import {Profile} from '@/components/HeaderBlock/HeaderBlock';
// import styles from './page.module.scss';
// import {FullScreenLoading} from '@/components/FullScreenLoading';
// import User from '@/assets/images/User.svg';
// import Lock from '@/assets/images/Lock.svg';
// import EditProfile from '@/components/EditProfile/EditProfile';
// import {useSnackbar} from '@/providers/SnackbarProvider';
// import {useStore} from '@/providers/ContextProvider';
// import {AccountsContext} from '@/providers/ContextProvider/Context';
import {ProfileHeader} from '@/components/ProfileHeader';
import ProfileMenu from '@/components/ProfileMenu';

export default async function ProfilePage() {
  // const {profile: ProfileContext} = useStore();
  // const [profile, setProfile] = useState<Profile>();
  // const [isLoading, setIsLoading] = useState(Boolean(!AccountsContext));
  // const [isEditMode, setEditMode] = useState<'name' | 'password' | null>(null);
  // const {showSnackbar} = useSnackbar();
  // const handleSubmit = (data: Profile) => {
  //   showSnackbar('Вы успешно обновили профиль');
  //   setProfile(data);
  // };
  // useEffect(() => {
  //   if (ProfileContext) {
  //     setProfile(ProfileContext);
  //   }
  //   !ProfileContext &&
  //     getProfile()
  //       .then((data) => setProfile(data))
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  // }, [ProfileContext, profile]);

  return (
    <>
      <ProfileMenu currentPage="profile" />
      {/*{isLoading && <FullScreenLoading />}*/}
      {/*<ProfileHeader profile={profile} />*/}
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
    </>
  );
}
