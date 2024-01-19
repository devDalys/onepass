'use client';
import styles from './ProfilePage.module.scss';
import {Image, Input} from '@/ui-kit';
import Sun from '@/assets/images/Sun.svg';
import Moon from '@/assets/images/Moon.svg';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import {useTheme} from '@/providers/ThemeProvider';
import {useEffect, useMemo, useState} from 'react';
import {Theme} from '@/providers/ThemeProvider/ThemeContext';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import {useStore} from '@/providers/ContextProvider';
import {Controller, useForm} from 'react-hook-form';
import classNames from 'classnames';
import {log} from 'util';
import {DragDrop} from '@/ui-kit/DragDrop/DragDrop';

interface Form {
  name: string;
  email: string;
}

export const ProfilePage = () => {
  const {profile} = useStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isOnline, setOnline] = useState(false);
  const {control, formState, reset} = useForm<Form>({
    defaultValues: {
      name: profile?.name ?? '',
      email: profile?.email ?? '',
    },
  });

  useEffect(() => {
    if (profile?.name && !isMounted) {
      reset({name: profile.name, email: profile.email});
      setIsMounted(true);
    }
  }, [profile, reset]);

  useEffect(() => {
    setOnline(navigator.onLine);

    const changeOnline = (event: Event) => {
      setOnline(event.type === 'online');
    };

    window.addEventListener('offline', changeOnline);
    window.addEventListener('online', changeOnline);

    return () => {
      window.removeEventListener('online', changeOnline);
      window.removeEventListener('offline', changeOnline);
    };
  }, []);

  if (!profile) return <div>Загрузка...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <span className={styles.span}>
          Статус:
          <span className={styles.status}>{isOnline ? 'Online' : 'Offline'}</span>
        </span>
        <span className={styles.span}>
          Дата регистрации:
          <span className={styles.value}>
            &nbsp;{new Date(profile.createdAt as Date).toLocaleDateString()}
          </span>
        </span>
        <span className={styles.span}>
          Последние изменения аккаунта:
          <span className={styles.value}>
            &nbsp;{new Date(profile.updatedAt as Date).toLocaleDateString()}
          </span>
        </span>
        <form className={styles.form}>
          <Controller
            name="name"
            control={control}
            render={({field: {ref, ...inputProps}, fieldState, formState}) => (
              <Input aliasText="Имя и фамилия" {...inputProps} />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({field: {ref, ...inputProps}, fieldState, formState}) => (
              <Input aliasText="Электронная почта" {...inputProps} />
            )}
          />
        </form>
      </div>
      <DragDrop />
    </div>
  );
};
