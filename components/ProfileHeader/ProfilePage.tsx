'use client';
import styles from './ProfilePage.module.scss';
import {Button, Input} from '@/ui-kit';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {DragDrop} from '@/ui-kit/DragDrop/DragDrop';
import {_api} from '@/api';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {revalidateQuery} from '@/api/revalidatePath';
import {AxiosResponse} from 'axios';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import ConfirmEmail from '@/components/ConfirmEmail/ConfirmEmail';
import {getErrorMsg} from '@/utils/getErrorMsg';

interface Form {
  name: string;
  email: string;
}

interface Props {
  profile: Profile;
}

export const ProfilePage = ({profile}: Props) => {
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
      .put('/profile/me', props)
      .then((data: AxiosResponse<{body: Form}>) => {
        showSnackbar('Профиль успешно обновлен');
        reset({name: data.data.body.name, email: data.data.body.email});
        revalidateQuery();
      })
      .catch((e) => {
        const msg = getErrorMsg(e);
        if (msg) {
          return showSnackbar(msg);
        }
        showSnackbar('Произошла ошибка обновления профиля');
      });
  };

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

  return (
    <div className={styles.wrapper}>
      <ConfirmEmail isEmailConfirmed={profile.isEmailConfirmed} email={profile.email} />
      <div className={styles.profileWrapper}>
        <DragDrop />

        <div className={styles.profile}>
          <div className={styles.statusInfo}>
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
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({field: {ref, ...inputProps}}) => (
                <Input
                  aliasText="Имя и фамилия"
                  blocked={!profile.isEmailConfirmed}
                  {...inputProps}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({field: {ref, ...inputProps}}) => (
                <Input
                  blocked={!profile.isEmailConfirmed}
                  aliasText="Электронная почта"
                  {...inputProps}
                />
              )}
            />
            <div className={styles.actions}>
              <Button
                className={styles.button}
                theme="outline"
                type="reset"
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
    </div>
  );
};
