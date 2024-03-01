'use client';
import styles from './Header.module.scss';
import HeaderBlock from '@/components/HeaderBlock';
import NavMenu from '@/components/NavMenu/NavMenu';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import {PageTitle} from '@/ui-kit';
import {usePathname} from 'next/navigation';

interface Props {
  profile: Profile;
}

export default function Header({profile}: Props) {
  const pathName = usePathname();

  const getTitle = () => {
    if (pathName.startsWith('/profile')) return 'Профиль';
    if (pathName.startsWith('/accounts')) return 'Аккаунты';
  };

  return (
    <>
      <PageTitle>{getTitle()}</PageTitle>

      <div className={styles.header}>
        <HeaderBlock accounts={profile.accounts} profile={profile} />
        <NavMenu />
      </div>
    </>
  );
}
