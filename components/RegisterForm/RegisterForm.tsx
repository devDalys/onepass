'use client';
import styles from './RegisterForm.module.scss';
import {Button, Input} from '@/ui-kit';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

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

  const onSubmit = (data: Form) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({field: {ref, ...field}}) => (
          <Input aliasText="Name" placeholder="Jhon Doe" {...field} />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({field: {ref, ...field}}) => (
          <Input aliasText="Email" placeholder="johndoe@email.com" {...field} />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({field: {ref, ...field}}) => (
          <Input aliasText="Password" placeholder="Password" {...field} />
        )}
      />
      <Button theme="default" type="submit" className={styles.button}>
        Register
      </Button>
    </form>
  );
};
