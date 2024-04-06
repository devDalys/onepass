'use client';
import React from 'react';
import styles from './LogoutButton.module.scss';
import classNames from 'classnames';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {useRouter} from 'next/navigation';
import {Button} from '@/ui-kit';

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({className}: LogoutButtonProps) {
  const {showSnackbar} = useSnackbar();
  const router = useRouter();
  const onClick = () => {
    fetch('/api/logout').then(() => {
      showSnackbar('Вы успешно вышли из аккаунта');
      router.push('/');
    });
  };

  return (
    <Button theme="default" className={classNames(styles.button, className)} onClick={onClick}>
      Выйти
    </Button>
  );
}
