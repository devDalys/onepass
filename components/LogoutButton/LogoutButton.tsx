'use client';

import React from 'react';
import styles from './LogoutButton.module.scss';
import {deleteCookie} from 'cookies-next';
import {AUTH_TOKEN} from '@/utils/consts';
import {useRouter} from 'next/navigation';
import classNames from 'classnames';
import {useSnackbar} from '@/Providers/SnackbarProvider';

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({className}: LogoutButtonProps) {
  const router = useRouter();
  const {showSnackbar} = useSnackbar();
  const onClick = () => {
    showSnackbar('До встречи :(');
    deleteCookie(AUTH_TOKEN);
    router.push('/');
  };

  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      Logout
    </button>
  );
}
