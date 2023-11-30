import {IAccountItem} from '@/components/AccountsList/AccountItem';
import styles from './HeaderBlock.module.scss';
import NoProfile from '@/assets/images/no-profile.svg';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import {ThemeSwitcher} from '@/components/ThemeSwitcher';

export interface Profile {
  name: string;
  email: string;
  avatarUrl: string;
}

interface Props {
  accounts: IAccountItem[];
  profile: Profile;
}

interface CounterProps {
  length: number;
  text: string;
}

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
      <img className={styles.avatar} src={avatarUrl ?? NoProfile.src} />

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
      <CountsBlock length={accounts.length} text={'Passwords Stored'} />
    </div>
  );
}