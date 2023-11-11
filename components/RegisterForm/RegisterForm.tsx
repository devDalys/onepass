'use client';
import styles from './RegisterForm.module.scss';
import {Button, Input} from '@/ui-kit';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {_api} from '@/api';
import React from 'react';

interface Form {
  name: string;
  email: string;
  password: string;
}
const schema = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).max(20).required(),
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

  const onSubmit = async (data: Form) => {
    try {
      setIsLoading(true);
      const result = await _api().post('/auth/register', data);
    } catch (e) {
      console.error(e);
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
