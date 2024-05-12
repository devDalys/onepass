'use client';

import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {_api} from '@/api';
import {Button, Input} from '@/ui-kit';
import styles from './LoginForm.module.scss';
import {
  AUTHORIZATION_FLAG,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  validationMessages,
} from '@/utils/consts';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useSnackbar} from '@/providers/SnackbarProvider';
import YandexLogin from '@/components/YandexLogin/YandexLogin';
import VkLogin from '@/components/VkLogin/VkLogin';
import {useEffect, useState} from 'react';
import AuthorizationChecker from '@/components/AuthorizationChecker/AuthorizationChecker';
import {getErrorMsg} from '@/utils/getErrorMsg';
import Link from 'next/link';
import {delay} from '@/utils/delay';

interface Form {
  email: string;
  password: string;
}

interface Props {
  CLIENT_ID: string;
  APP_ID: number;
  redirectUrl: string;
}

const schema = yup.object().shape({
  email: yup.string().email(validationMessages.email()).required(validationMessages.required()),
  password: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, validationMessages.min(MIN_PASSWORD_LENGTH))
    .max(MAX_PASSWORD_LENGTH, validationMessages.max(MAX_PASSWORD_LENGTH))
    .required(validationMessages.required()),
});

export const LoginForm = ({CLIENT_ID, redirectUrl, APP_ID}: Props) => {
  const {control, handleSubmit} = useForm<Form>({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const {showSnackbar} = useSnackbar();
  const pathName = usePathname();
  const params = useSearchParams();
  const onSubmit = async (data: Form) => {
    setLoading(true);
    await _api
      .post('/auth/login', data)
      .then(() => {
        showSnackbar('Вы успешно вошли !');
        router.push('/accounts');
      })
      .catch((e) => {
        const msg = getErrorMsg(e);
        if (msg) {
          return showSnackbar(msg, true);
        }
        showSnackbar('Неверный логин или пароль');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const authBroadcast = new BroadcastChannel(AUTHORIZATION_FLAG);
    authBroadcast.onmessage = async (msg) => {
      if (msg.data === true) {
        await delay(500);
        router.push('/accounts');
        showSnackbar('Вы успешно вошли');
      } else {
        showSnackbar('Что-то пошло не так');
      }
    };
  }, [params, pathName, router, showSnackbar]);

  return (
    <>
      <AuthorizationChecker />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="email"
          control={control}
          render={({field: {ref, ...field}, fieldState}) => (
            <Input
              aliasText="Электронная почта"
              placeholder="вашапочта@mail.ru"
              autoComplete="email"
              disabled={isLoading}
              {...field}
              errorText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({field: {ref, ...field}, fieldState}) => (
            <Input
              aliasText="Пароль"
              placeholder="******"
              autoComplete="current-password"
              disabled={isLoading}
              {...field}
              type="password"
              errorText={fieldState.error?.message}
            />
          )}
        />
        <div className={styles.buttons}>
          <Button className={styles.button} theme="default" type="submit" disabled={isLoading}>
            Войти
          </Button>
          <Link href="/recovery" className={styles.recoveryLink}>
            Забыли пароль?
          </Link>
          <VkLogin APP_ID={APP_ID} redirectUrl={redirectUrl} />
          <YandexLogin CLIENT_ID={CLIENT_ID} isDisabled={isLoading} />
        </div>
      </form>
    </>
  );
};
