'use client';
import styles from './RecoveryForm.module.scss';
import {Controller, useForm} from 'react-hook-form';
import {Button, Input} from '@/ui-kit';

export default function RecoveryForm() {
  const {control} = useForm();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Восстановление доступа</h1>
      <h2 className={styles.subtitle}>
        Введите ваш адрес электронной почты, на который зарегистрирован аккаунт
      </h2>
      <form className={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({field: {ref, ...fieldState}}) => (
            <Input
              {...fieldState}
              aliasText="Функционал находится в разработке"
              disabled
              placeholder="vasiliy@mail.ru"
            />
          )}
        />
        <Button theme="default" disabled>
          Восстановить доступ
        </Button>
      </form>
    </div>
  );
}
