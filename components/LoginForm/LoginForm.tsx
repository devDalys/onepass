'use client';

import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {_api} from '@/api';
import {Button, Input} from '@/ui-kit';
import styles from './LoginForm.module.scss';
import {getCookie, setCookie} from 'cookies-next';
import {ONE_MONTH} from '@/utils/consts';
import {useRouter} from 'next/navigation';
import {useSnackbar} from '@/providers/SnackbarProvider';
import YandexLogin from '@/components/YandexLogin/YandexLogin';
import VkLogin from '@/components/VkLogin/VkLogin';
import {useState} from 'react';
import AuthorizationChecker from '@/components/AuthorizationChecker/AuthorizationChecker';

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
  email: yup.string().email().required(),
  password: yup.string().min(5).max(20).required(),
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

  const onSubmit = async (data: Form) => {
    setLoading(true);
    await _api
      .post('/auth/login', data)
      .then((data) => {
        showSnackbar('Вы успешно вошли !');
        setCookie('token', data.data.token, {maxAge: ONE_MONTH});
        router.push('/accounts');
      })
      .catch(() => {
        showSnackbar('Неверный логин или пароль');
        setLoading(false);
      });
  };

  const onYandexClick = () => {
    setLoading(true);
    const interval = setInterval(() => {
      const token = getCookie('token');
      if (token) {
        clearInterval(interval);
        showSnackbar('Вы успешно вошли !');
        router.push('/accounts');
      }
    }, 500);
  };

  return (
    <>
      <AuthorizationChecker onYandexClick={onYandexClick} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="email"
          control={control}
          render={({field: {ref, ...field}, fieldState}) => (
            <Input
              aliasText="Email"
              placeholder="johndoe@email.com"
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
              aliasText="Password"
              placeholder="Password"
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
            Login
          </Button>
          <VkLogin APP_ID={APP_ID} redirectUrl={redirectUrl} />
          <YandexLogin CLIENT_ID={CLIENT_ID} isDisabled={isLoading} callback={onYandexClick} />
        </div>
      </form>
    </>
  );
};
