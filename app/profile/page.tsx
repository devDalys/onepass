'use client';
import {Image, PageTitle} from '@/ui-kit';
import {useEffect, useMemo, useState} from 'react';
import {getProfile} from '@/components/Header/Header';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import styles from './page.module.scss';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import User from '@/assets/images/User.svg';
import Sun from '@/assets/images/Sun.svg';
import Moon from '@/assets/images/Moon.svg';
import Lock from '@/assets/images/Lock.svg';
import {useTheme} from '@/providers/ThemeProvider';
import {Theme} from '@/providers/ThemeProvider/ThemeContext';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import EditProfile from '@/components/EditProfile/EditProfile';


export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setEditMode] = useState(false);
  const {theme, toggleTheme} = useTheme();
  const isLightTheme = useMemo(() => theme === Theme.LIGHT, [theme]);

  useEffect(() => {
    getProfile()
      .then((data) => setProfile(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <FullScreenLoading />}
      <PageTitle>Profile</PageTitle>
      <div className={styles.profile}>
        <Image src={profile?.avatarUrl} alt={profile?.name} />
        <div className={styles.fullName}>{profile?.name}</div>
        <div className={styles.email}>{profile?.email}</div>
      </div>
      <div className={styles.actions}>
        <div>
          {isEditMode ? (
            <EditProfile name={profile?.name as string} onSubmit={() => null} onCancel={() => setEditMode(!isEditMode)} />
          ) : (
            <>
              <div className={styles.action} onClick={() => setEditMode(!isEditMode)}>
                <User />
                Update Profile
              </div>
              <div className={styles.action}>
                <Lock />
                Change Master Password
              </div>
              <div className={styles.action} onClick={() => toggleTheme()}>
                {isLightTheme ? <Sun /> : <Moon />}
                Switch to {isLightTheme ? 'Dark' : 'Light'} Theme
              </div>
            </>
          )}
        </div>

          {!isEditMode && <LogoutButton className={styles.logout}/>}
      </div>
    </>
  );
}
