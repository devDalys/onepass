'use client';
import styles from './ProfileHeader.module.scss';
import {Image} from '@/ui-kit';
import Sun from '@/assets/images/Sun.svg';
import Moon from '@/assets/images/Moon.svg';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import {useTheme} from '@/providers/ThemeProvider';
import {useMemo} from 'react';
import {Theme} from '@/providers/ThemeProvider/ThemeContext';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';

interface Props {
  profile: Profile;
}

export const ProfileHeader = ({profile}: Props) => {
  const {theme, toggleTheme} = useTheme();
  const isLightTheme = useMemo(() => theme === Theme.LIGHT, [theme]);

  return (
    <div className={styles.profile}>
      <Image
        src={profile?.avatarUrl}
        alt={profile?.name}
        classes={{img: styles.avatar, loader: styles.avatar}}
      />
      <div className={styles.profileInfo}>
        <div className={styles.fullName}>{profile?.name}</div>
        <div className={styles.email}>{profile?.email}</div>
        <div className={styles.profileActions}>
          <div className={styles.switcher} onClick={() => toggleTheme()}>
            Switch to {isLightTheme ? 'Dark' : 'Light'} Theme
            {isLightTheme ? <Sun /> : <Moon />}
          </div>
          <LogoutButton className={styles.logout} />
        </div>
      </div>
    </div>
  );
};
