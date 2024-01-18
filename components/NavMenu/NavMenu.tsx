'use client';
import React from 'react';
import styles from './NavMenu.module.scss';
import Home from '@/assets/images/Home.svg';
import Add from '@/assets/images/Add.svg';
import User from '@/assets/images/User.svg';
import Link from 'next/link';
import classNames from 'classnames';
import {usePathname} from 'next/navigation';

interface NavMenuProps {
  onlyIsMobile?: boolean;
}

export default function NavMenu({onlyIsMobile = false}: NavMenuProps) {
  const pathName = usePathname();

  return (
    <div className={classNames(styles.wrapper, {[styles.onlyMobile]: onlyIsMobile})}>
      <Link
        className={classNames(styles.item, {[styles.active]: pathName === '/accounts/add'})}
        href={'/accounts/add'}
      >
        <Add className={styles.icon} />
        <span className={styles.text}>Добавить аккаунт</span>
      </Link>
      <Link
        className={classNames(styles.item, {
          [styles.active]: pathName.startsWith('/accounts') && !pathName.includes('add'),
        })}
        href={'/accounts'}
      >
        <Home className={styles.icon} />
        <span className={styles.text}>Аккаунты</span>
      </Link>
      <Link
        className={classNames(styles.item, {[styles.active]: pathName.startsWith('/profile')})}
        href={'/profile'}
      >
        <User className={styles.icon} />
        <span className={styles.text}>Профиль</span>
      </Link>
    </div>
  );
}
