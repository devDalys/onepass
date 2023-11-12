'use client';

import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {_api} from '@/api';
import {Button, Input} from '@/ui-kit';
import styles from './LoginForm.module.scss';
import {setCookie} from 'cookies-next';
import {ONE_MONTH} from '@/utils/consts';
import {useRouter} from 'next/navigation';

interface Form {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(20).required(),
});

export const LoginForm = () => {
  const {control, handleSubmit} = useForm<Form>({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: Form) => {
    await _api()
      .post('/auth/login', data)
      .then((data) => {
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
      <Button className={styles.button} theme="default" type="submit">
        Login
      </Button>
    </form>
  );
};
