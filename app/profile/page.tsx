'use client';
import {Image, PageTitle} from '@/ui-kit';
import {useEffect, useState} from 'react';
import {getProfile} from '@/components/Header/Header';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import styles from './page.module.scss';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import User from '@/assets/images/User.svg';
import Sun from '@/assets/images/sun.svg';
import Moon from '@/assets/images/moon.svg';
import Lock from '@/assets/images/Lock.svg';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(true);

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
        {/*<LogoutButton />*/}
      </div>
      <div className={styles.actions}>
        <div className={styles.action}>
          <User />
          Update Profile
        </div>
        <div className={styles.action}>
          <Lock />
          Change Master Password
        </div>
        <div className={styles.action}>
          <Sun />
          Switch to Light Mode
        </div>
      </div>
    </>
  );
}
