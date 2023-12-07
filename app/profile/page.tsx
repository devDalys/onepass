'use client';
import {PageTitle} from '@/ui-kit';
import {useEffect, useState} from 'react';
import {getProfile} from '@/components/Header/Header';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';
import styles from './page.module.scss';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import ProfilePicture from '@/assets/images/no-profile.svg';
import classNames from 'classnames';
import {FullScreenLoading} from '@/components/FullScreenLoading';
export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>();
  const [isImageLoading, setImageLoading] = useState(true);
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
        {isImageLoading && <ProfilePicture className={styles.avatar} />}
        <img
          className={classNames(styles.avatar, {[styles.hideAvatar]: isImageLoading})}
          src={profile?.avatarUrl as string}
          alt={profile?.name}
          onLoad={() => setImageLoading(false)}
        />
        <div className={styles.fullName}>{profile?.name}</div>
        <div className={styles.email}>{profile?.email}</div>
        {/*<LogoutButton />*/}
      </div>
    </>
  );
}
