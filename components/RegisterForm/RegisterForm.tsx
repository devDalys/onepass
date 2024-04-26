'use client';
import styles from './RegisterForm.module.scss';
import {Button, Input} from '@/ui-kit';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {_api} from '@/api';
import React, {useEffect} from 'react';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {useRouter} from 'next/navigation';
import {
  AUTHORIZATION_FLAG,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  validationMessages,
} from '@/utils/consts';
import VkLogin from '@/components/VkLogin/VkLogin';
import YandexLogin from '@/components/YandexLogin/YandexLogin';
import {getErrorMsg} from '@/utils/getErrorMsg';

interface Form {
  name: string;
  email: string;
  password: string;
}
const schema = yup.object().shape({
  name: yup
    .string()
    .min(MIN_NAME_LENGTH, validationMessages.min(MIN_NAME_LENGTH))
    .max(MAX_NAME_LENGTH, validationMessages.max(MAX_NAME_LENGTH))
    .required(validationMessages.required()),
  email: yup.string().email(validationMessages.email).required(validationMessages.required),
  password: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, validationMessages.min(MIN_PASSWORD_LENGTH))
    .max(MAX_PASSWORD_LENGTH, validationMessages.min(MAX_PASSWORD_LENGTH))
    .required(validationMessages.required()),
});

interface Props {
  CLIENT_ID: string;
  APP_ID: number;
  redirectUrl: string;
}

export const RegisterForm = ({CLIENT_ID, redirectUrl, APP_ID}: Props) => {
  const {control, handleSubmit} = useForm<Form>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const {showSnackbar} = useSnackbar();
  const router = useRouter();
  const onSubmit = async (data: Form) => {
    try {
      setIsLoading(true);
      await _api.post('/auth/register', data);
      showSnackbar('Вы успешно зарегистрировались');
      router.push('/login');
    } catch (e) {
      const msg = getErrorMsg(e);
      if (msg) {
        return showSnackbar(msg, false);
      }
      showSnackbar('Что-то пошло не так');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const authBroadcast = new BroadcastChannel(AUTHORIZATION_FLAG);
    authBroadcast.onmessage = (msg) => {
      if (msg.data === true) {
        router.push('/accounts');
        showSnackbar('Вы успешно вошли');
      } else {
        showSnackbar('Что-то пошло не так');
      }
    };
  }, [router, showSnackbar]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({field: {ref, ...field}, fieldState}) => (
          <Input
            aliasText="Имя и фамилия"
            placeholder="Василий Васильевич"
            autoComplete="name"
            {...field}
            errorText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({field: {ref, ...field}, fieldState}) => (
          <Input
            aliasText="Электронная почта"
            placeholder="vasiliy@mail.ru"
            autoComplete="email"
            {...field}
            errorText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({field: {ref, ...field}, fieldState}) => (
          <Input
            aliasText="Пароль"
            placeholder="******"
            type="password"
            autoComplete="new-password"
            {...field}
            errorText={fieldState.error?.message}
          />
        )}
      />
      <Button isLoading={isLoading} theme="default" type="submit" className={styles.button}>
        Зарегистрироваться
      </Button>

      <div className={styles.socials}>
        <VkLogin APP_ID={APP_ID} redirectUrl={redirectUrl} />
        <YandexLogin CLIENT_ID={CLIENT_ID} isDisabled={isLoading} />
      </div>
    </form>
  );
};
