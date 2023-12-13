'use client';

import React from 'react';
import styles from './LogoutButton.module.scss';
import {deleteCookie} from 'cookies-next';
import {AUTH_TOKEN} from '@/utils/consts';
import classNames from 'classnames';
import {useSnackbar} from '@/providers/SnackbarProvider';

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({className}: LogoutButtonProps) {
  const {showSnackbar} = useSnackbar();
  const onClick = () => {
    showSnackbar('Вы успешно вышли из аккаунта');
    deleteCookie(AUTH_TOKEN);
    window.location.replace('/');
  };

  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      Logout
    </button>
  );
}
