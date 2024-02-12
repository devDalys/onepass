'use client';
import styles from './RegisterForm.module.scss';
import {Button, Input} from '@/ui-kit';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {_api} from '@/api';
import React from 'react';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {useRouter} from 'next/navigation';
import {
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  validationMessages,
} from '@/utils/consts';

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

export const RegisterForm = () => {
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
      console.error(e);
      showSnackbar('Что-то пошло не так');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({field: {ref, ...field}, fieldState}) => (
          <Input
            aliasText="Name"
            placeholder="Jhon Doe"
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
            aliasText="Email"
            placeholder="johndoe@email.com"
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
            aliasText="Password"
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            {...field}
            errorText={fieldState.error?.message}
          />
        )}
      />
      <Button isLoading={isLoading} theme="default" type="submit" className={styles.button}>
        Register
      </Button>
    </form>
  );
};
