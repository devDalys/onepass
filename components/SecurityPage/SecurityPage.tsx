'use client';
import styles from './SecurityPage.module.scss';
import {Controller, useForm} from 'react-hook-form';
import {Button, Input} from '@/ui-kit';
import Info from '@/assets/images/Info.svg';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  oldPassword: yup.string().min(5).max(20).required(),
  newPassword: yup.string().min(5).max(20).required(),
  confirmPassword: yup.string().test({
    test: (value, context) => context.parent.newPassword === value,
    message: 'Пароли должны совпадать',
  }),
});

export default function SecurityPage() {
  const {control, handleSubmit, reset, formState} = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {};

  return (
    <div>
      <div className={styles.infoBlock}>
        <div className={styles.infoIcon}>
          <Info />
        </div>
        Обратите внимание на то, что если Вы авторизовывались через социальную сеть - пароль
        сгенерирован автоматически. Поэтому чтобы сменить его - воспользуйтесь сбросом, а в
        дальнейшем вы сможете менять его здесь
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="oldPassword"
          control={control}
          render={({field: {ref, ...inputProps}, fieldState, formState}) => (
            <Input
              className={styles.input}
              type="password"
              aliasText="Старый пароль"
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
    </div>
  );
}
