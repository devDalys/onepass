'use client';
import {Image, PageTitle} from '@/ui-kit';
import {useEffect, useState} from 'react';
import {getProfile} from '@/components/Header/Header';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import styles from './page.module.scss';
import {FullScreenLoading} from '@/components/FullScreenLoading';
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
        <Image src={profile?.avatarUrl} />
        <div className={styles.fullName}>{profile?.name}</div>
        <div className={styles.email}>{profile?.email}</div>
        {/*<LogoutButton />*/}
      </div>
    </>
  );
}
