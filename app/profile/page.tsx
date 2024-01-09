'use client';
import {Image, PageTitle} from '@/ui-kit';
import {useEffect, useMemo, useState} from 'react';
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
import {useSnackbar} from '@/providers/SnackbarProvider';
import {getProfile} from '@/components/Header/HeaderWrapper';
import {useStore} from '@/providers/ContextProvider';
import {AccountsContext} from '@/providers/ContextProvider/Context';

export default function ProfilePage() {
  const {profile: ProfileContext} = useStore();
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(Boolean(!AccountsContext));
  const [isEditMode, setEditMode] = useState<'name' | 'password' | null>(null);
  const {theme, toggleTheme} = useTheme();
  const isLightTheme = useMemo(() => theme === Theme.LIGHT, [theme]);
  const {showSnackbar} = useSnackbar();
  const handleSubmit = (data: Profile) => {
    showSnackbar('Вы успешно обновили профиль');
    setProfile(data);
  };
  useEffect(() => {
    if (ProfileContext) {
      setProfile(ProfileContext);
    }
    !ProfileContext &&
      getProfile()
        .then((data) => setProfile(data))
        .finally(() => {
          setIsLoading(false);
        });
  }, [ProfileContext, profile]);

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
            <EditProfile
              type={isEditMode}
              name={profile?.name as string}
              onSubmit={handleSubmit}
              onCancel={() => setEditMode(null)}
            />
          ) : (
            <>
              <div className={styles.action} onClick={() => setEditMode('name')}>
                <User />
                Update Profile
              </div>
              <div className={styles.action} onClick={() => setEditMode('password')}>
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

        {!isEditMode && <LogoutButton className={styles.logout} />}
      </div>
    </>
  );
}
