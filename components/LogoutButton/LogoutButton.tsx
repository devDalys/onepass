'use client';

import React from 'react';
import styles from './LogoutButton.module.scss';
import classNames from 'classnames';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {useRouter} from 'next/navigation';
import deleteAuthCookie from '@/components/LogoutButton/deleteAuthCookie';

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({className}: LogoutButtonProps) {
  const {showSnackbar} = useSnackbar();
  const router = useRouter();
  const onClick = () => {
    deleteAuthCookie().then(() => {
      showSnackbar('Вы успешно вышли из аккаунта');
      router.push('/');
    });
  };

  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      Выйти
    </button>
  );
}
