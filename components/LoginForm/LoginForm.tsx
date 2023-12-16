'use client';

import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {_api} from '@/api';
import {Button, Input} from '@/ui-kit';
import styles from './LoginForm.module.scss';
import {getCookie, setCookie} from 'cookies-next';
import {ONE_MONTH} from '@/utils/consts';
import {usePathname, useRouter} from 'next/navigation';
import {useSnackbar} from '@/providers/SnackbarProvider';
import YandexLogin from '@/components/YandexLogin/YandexLogin';
import VkLogin from '@/components/VkLogin/VkLogin';

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

  const router = useRouter();
  const {showSnackbar} = useSnackbar();
  const pathName = usePathname();
  console.log(window.location.hash);

  const onSubmit = async (data: Form) => {
    await _api.post('/auth/login', data).then((data) => {
      showSnackbar('Вы успешно вошли !');
      setCookie('token', data.data.token, {maxAge: ONE_MONTH});
      router.push('/accounts');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Controller
        name="email"
        control={control}
        render={({field: {ref, ...field}, fieldState}) => (
          <Input
            aliasText="Email"
            placeholder="johndoe@email.com"
            autoComplete="email"
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
            {...field}
            type="password"
            errorText={fieldState.error?.message}
          />
        )}
      />
      <div className={styles.buttons}>
        <Button className={styles.button} theme="default" type="submit">
          Login
        </Button>
        <VkLogin APP_ID={APP_ID} redirectUrl={redirectUrl} />
        <YandexLogin CLIENT_ID={CLIENT_ID} />
        <button onClick={() => window.close()}>Закрыть</button>
      </div>
    </form>
  );
};
