'use client';
import styles from './ProfilePage.module.scss';
import {Button, Input} from '@/ui-kit';
import {useEffect, useState} from 'react';
import {useStore} from '@/providers/ContextProvider';
import {Controller, useForm} from 'react-hook-form';
import {DragDrop} from '@/ui-kit/DragDrop/DragDrop';
import {_api} from '@/api';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {revalidateCache} from '@/api/revalidatePath';
import {AxiosResponse} from 'axios';

interface Form {
  name: string;
  email: string;
}

export const ProfilePage = () => {
  const {profile} = useStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isOnline, setOnline] = useState(false);
  const {showSnackbar} = useSnackbar();
  const {control, formState, reset, handleSubmit} = useForm<Form>({
    defaultValues: {
      name: profile?.name ?? '',
      email: profile?.email ?? '',
    },
  });

  const onSubmit = (props: Form) => {
    _api
      .put('/auth/me', props)
      .then((data: AxiosResponse<Form>) => {
        showSnackbar('Профиль успешно обновлен');
        reset({name: data.data.name, email: data.data.email});
        revalidateCache();
      })
      .catch(() => {
        showSnackbar('Произошла ошибка обновления профиля');
      });
  };

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
      <DragDrop />

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

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          <div className={styles.actions}>
            <Button
              className={styles.button}
              theme="outline"
              onClick={(event) => {
                event.preventDefault();
                reset({name: profile.name, email: profile.email});
              }}
            >
              Сбросить
            </Button>
            <Button
              className={styles.button}
              theme="default"
              type="submit"
              disabled={!formState.isValid || !formState.isDirty}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
