'use client';
import styles from './SecurityPage.module.scss';
import {Controller, useForm} from 'react-hook-form';
import {Button, InfoBlock, Input} from '@/ui-kit';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormEvent, useRef, useState} from 'react';

const schema = yup.object().shape({
  oldPassword: yup.string().min(5).max(20).required(),
  newPassword: yup.string().min(5).max(20).required(),
  confirmPassword: yup
    .string()
    .test({
      test: (value, context) => context.parent.newPassword === value,
      message: 'Пароли должны совпадать',
    })
    .required(),
});

interface SubmitForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SecurityPage() {
  const {control, handleSubmit, reset, formState} = useForm<SubmitForm>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [deleteInput, setDeleteInput] = useState('');

  const onSubmit = (form: SubmitForm) => {};
  const handleDelete = (event: FormEvent) => {
    event.preventDefault();
    console.log(deleteInput);
  };

  return (
    <div>
      <h2 className={styles.pageTitle}>Смена пароля</h2>
      <InfoBlock
        text="Обратите внимание на то, что если Вы авторизовывались через социальную сеть - пароль
        сгенерирован автоматически. Поэтому чтобы сменить его - воспользуйтесь сбросом, а в
        дальнейшем вы сможете менять его здесь"
      />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="oldPassword"
          control={control}
          render={({field: {ref, ...inputProps}, fieldState, formState}) => (
            <Input
              className={styles.input}
              type="password"
              aliasText="Текущий пароль"
              errorText={fieldState.error?.message}
              {...inputProps}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({field: {ref, ...inputProps}, fieldState, formState}) => (
            <Input
              className={styles.input}
              type="password"
              aliasText="Новый пароль"
              errorText={fieldState.error?.message}
              {...inputProps}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({field: {ref, ...inputProps}, fieldState, formState}) => (
            <Input
              className={styles.input}
              type="password"
              aliasText="Повторите новый пароль"
              errorText={fieldState.error?.message}
              {...inputProps}
            />
          )}
        />
        <div className={styles.actions}>
          <Button
            className={styles.button}
            theme="outline"
            onClick={(event) => {
              event.preventDefault();
              reset();
            }}
          >
            Сбросить
          </Button>
          <Button
            className={styles.button}
            theme="default"
            type="submit"
            disabled={!formState.isValid || !formState.isDirty}
          >
            Сохранить
          </Button>
        </div>
      </form>

      <h2 className={styles.pageTitle}>Удаление аккаунта</h2>
      <InfoBlock text="После удаления аккаунта все ваши данные будут безвозмездно утеряны и не подлежат восстановлению" />
      <form className={styles.deleteForm} onSubmit={handleDelete}>
        <Input
          aliasText="Текущий пароль"
          value={deleteInput}
          onChange={(event) => setDeleteInput(event.target.value)}
        />
        <div className={styles.actions}>
          <Button
            theme="outline"
            type="submit"
            className={styles.button}
            disabled={!deleteInput.length}
          >
            Удалить аккаунт
          </Button>
        </div>
      </form>
    </div>
  );
}
