import React from 'react';
import styles from './NavMenu.module.scss';
import Home from '@/assets/images/Home.svg';
import Add from '@/assets/images/Add.svg';
import User from '@/assets/images/User.svg';
import Link from 'next/link';

interface NavMenuProps {}

export default function NavMenu({}: NavMenuProps) {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.add} href={'/accounts/add'}>
        <Add className={styles.icon} />
        <span className={styles.text}>New account</span>
      </Link>
      <Link className={styles.item} href={'/accounts'}>
        <Home className={styles.icon} />
        <span className={styles.text}>Accounts</span>
      </Link>
      <Link className={styles.item} href={'/profile'}>
        <User className={styles.icon} />
        <span className={styles.text}>Profile</span>
      </Link>
    </div>
  );
}
