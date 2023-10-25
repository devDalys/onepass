'use client';
import styles from './RegisterForm.module.scss';
import {Button, Input} from '@/ui-kit';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {fetchData} from '@/utils';
import {_api} from '@/api';

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

  const onSubmit = async (data: Form) => {
    const result = _api.post('/auth/register', data);
    console.log(result);
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
            {...field}
            errorText={fieldState.error?.message}
          />
        )}
      />
      <Button theme="default" type="submit" className={styles.button}>
        Register
      </Button>
    </form>
  );
};
