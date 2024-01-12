import styles from './HeaderBlock.module.scss';
import NoProfile from '@/assets/images/no-profile.svg?url';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import {ThemeSwitcher} from '@/components/ThemeSwitcher';
import {Image} from '@/ui-kit';
import {CounterProps, Profile, Props} from '@/components/HeaderBlock/HeaderBlock.types';

const CountsBlock = ({text, length}: CounterProps) => {
  return (
    <div className={styles.counter}>
      <span className={styles.length}>{length}</span>
      <span className={styles.text}>{text}</span>
      <ThemeSwitcher />
    </div>
  );
};

const ProfileBlock = ({avatarUrl, name, email}: Profile) => {
  return (
    <div className={styles.profile}>
      <Image
        classes={{img: styles.avatar, loader: styles.avatar}}
        src={avatarUrl ?? NoProfile.src}
        fallback={NoProfile.src}
      />

      <div className={styles.userInfo}>
        <span className={styles.name}>{name}</span>
        <span className={styles.email}>{email}</span>
        <LogoutButton className={styles.logout} />
      </div>
    </div>
  );
};

export default function HeaderBlock({accounts, profile: {name, email, avatarUrl}}: Props) {
  return (
    <div className={styles.wrapper}>
      <ProfileBlock name={name} email={email} avatarUrl={avatarUrl} />
      <CountsBlock
        length={accounts.flatMap((item) => item.accountEntries).length}
        text={'Passwords Stored'}
      />
    </div>
  );
}
