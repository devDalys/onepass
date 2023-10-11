'use client';
import styles from './RegisterForm.module.scss';
import {Button, Input} from '@/ui-kit';

export const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <Input aliasText="Name" placeholder="Jhon Doe" />
      <Input aliasText="Email" placeholder="johndoe@email.com" />
      <Input aliasText="Password" placeholder="Password" />
      <Button theme="default" className={styles.button}>
        Register
      </Button>
    </form>
  );
};
