'use client';
import styles from './SecurityPage.module.scss';
import {Controller, useForm} from 'react-hook-form';
import {Button, InfoBlock, Input} from '@/ui-kit';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormEvent, useState} from 'react';
import {_api} from '@/api';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {useRouter} from 'next/navigation';
import {MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, validationMessages} from '@/utils/consts';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import Link from 'next/link';

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, validationMessages.min(MIN_PASSWORD_LENGTH))
    .max(MAX_PASSWORD_LENGTH, validationMessages.max(MAX_PASSWORD_LENGTH))
    .required(validationMessages.required()),
  newPassword: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, validationMessages.min(MIN_PASSWORD_LENGTH))
    .max(MAX_PASSWORD_LENGTH, validationMessages.max(MAX_PASSWORD_LENGTH))
    .required(validationMessages.required()),
  confirmPassword: yup
    .string()
    .test({
      test: (value, context) => context.parent.newPassword === value,
      message: validationMessages.repeatValue('Пароли'),
    })
    .required(validationMessages.required()),
});

interface SubmitForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  profile: Profile;
}

export default function SecurityPage({profile}: Props) {
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
  const [recoveryInput, setRecoveryInput] = useState('');
  const {showSnackbar} = useSnackbar();
  const router = useRouter();
  const onSubmit = (form: SubmitForm) => {
    _api
      .put('/profile/me', {
        currentPassword: form.oldPassword,
        password: form.newPassword,
      })
      .then(() => {
        showSnackbar('Вы успешно изменили пароль');
      })
      .catch(() => {
        showSnackbar('Что-то пошло не так');
      });
  };
  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();

    _api
      .post('/profile/me', {
        password: deleteInput,
      })
      .then(() => {
        router.push('/exit');
      })
      .catch(() => {
        showSnackbar('Не удалось удалить аккаунт');
      });
  };

  const handleRecovery = (event: FormEvent) => {
    event.preventDefault();
    if (recoveryInput !== profile?.email) return showSnackbar('Некорректный адрес почты');

    _api
      .post('/auth/recovery', {
        email: recoveryInput,
      })
      .then(() => {
        showSnackbar('Письмо сброса отправлено на почту');
      })
      .catch(() => {
        showSnackbar('Не удалось сбросить пароль, попробуйте позже');
      })
      .finally(() => {
        setRecoveryInput('');
      });
  };

  return (
    <div>
      <h2 className={styles.pageTitle}>Смена пароля</h2>
      <InfoBlock
        text={
          <div>
            Обратите внимание на то, что если Вы авторизовывались через социальную сеть - пароль
            сгенерирован автоматически. Поэтому чтобы сменить его - воспользуйтесь{' '}
            <Link href="#recovery">сбросом</Link>, а в дальнейшем вы сможете менять его здесь.
          </div>
        }
      />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="oldPassword"
          control={control}
          render={({field: {ref, ...inputProps}, fieldState}) => (
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
          render={({field: {ref, ...inputProps}, fieldState}) => (
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
          render={({field: {ref, ...inputProps}, fieldState}) => (
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

      <h2 id="recovery" className={styles.pageTitle}>
        Сброс пароля
      </h2>
      <InfoBlock
        text={
          profile.isEmailConfirmed ? (
            <>
              Сброс пароля подходит в ситуации, когда вы вошли через социальную сеть и хотите
              установить собственный пароль.
            </>
          ) : (
            <>
              Функция будет доступна после подтверждения почты на странице&nbsp;
              <Link href="/profile">профиля</Link>
            </>
          )
        }
      />
      <form className={styles.deleteForm} onSubmit={handleRecovery}>
        <Input
          aliasText="Электронная почта"
          type="email"
          blocked={!profile.isEmailConfirmed}
          value={recoveryInput}
          onChange={(event) => setRecoveryInput(event.target.value)}
        />
        <div className={styles.actions}>
          <Button
            theme="default"
            type="submit"
            className={styles.button}
            disabled={!recoveryInput.length || !profile.isEmailConfirmed}
          >
            Сбросить пароль
          </Button>
        </div>
      </form>

      <h2 className={styles.pageTitle}>Удаление аккаунта</h2>
      <InfoBlock text="После удаления аккаунта все ваши данные будут безвозмездно утеряны и не подлежат восстановлению." />
      <form className={styles.deleteForm} onSubmit={handleDelete}>
        <Input
          aliasText="Текущий пароль"
          type="password"
          value={deleteInput}
          onChange={(event) => setDeleteInput(event.target.value)}
        />
        <div className={styles.actions}>
          <Button
            theme="default"
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
