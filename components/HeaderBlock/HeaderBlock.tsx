import styles from './HeaderBlock.module.scss';
import NoProfile from '@/assets/images/no-profile.svg?url';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import {ThemeSwitcher} from '@/components/ThemeSwitcher';
import {Image} from '@/ui-kit';
import {CounterProps, Profile, Props} from '@/components/HeaderBlock/HeaderBlock.types';
import {getEndWord} from '@/utils/getEndWord';

const CountsBlock = ({text, length}: CounterProps) => {
  return (
    <div className={styles.counter}>
      <span className={styles.length}>{length}</span>
      <span className={styles.text}>{text}</span>
      <ThemeSwitcher />
    </div>
  );
};

const ProfileBlock = ({avatarUrl, name, email}: Omit<Profile, 'accounts'>) => {
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
  const length = accounts.flatMap((item) => item.accountEntries).length;

  return (
    <div className={styles.wrapper}>
      <ProfileBlock name={name} email={email} avatarUrl={avatarUrl} />
      <CountsBlock
        length={length}
        text={`Хранящи${getEndWord(length, ['йся', 'хся', 'хся'])} аккаунт${getEndWord(length, ['', 'ов', 'а'])}`}
      />
    </div>
  );
}
