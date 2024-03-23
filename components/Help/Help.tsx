'use client';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import styles from './Help.module.scss';
import {Button, InfoBlock, Input, Textarea} from '@/ui-kit';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {validationMessages} from '@/utils/consts';
import {yupResolver} from '@hookform/resolvers/yup';
import {_apiFetch} from '@/api/fetchClient';
import {useSnackbar} from '@/providers/SnackbarProvider';
import Link from 'next/link';

interface HelpForm {
  reason: string;
  email: string;
  description: string;
}

const scheme = yup.object().shape({
  description: yup
    .string()
    .required(validationMessages.required())
    .min(20, validationMessages.min(20))
    .max(200, validationMessages.max(200)),
  email: yup.string().required(validationMessages.required()).email(validationMessages.email()),
  reason: yup
    .string()
    .required(validationMessages.required())
    .min(5, validationMessages.min(5))
    .max(20, validationMessages.max(20)),
});

export default function Help({profile}: {profile: Profile}) {
  const {control, formState, handleSubmit, reset} = useForm<HelpForm>({
    defaultValues: {
      description: '',
      reason: '',
      email: profile.email,
    },
    resolver: yupResolver(scheme),
    mode: 'onChange',
  });
  const {showSnackbar} = useSnackbar();

  const onSubmit = (form: HelpForm) => {
    _apiFetch('/help/send', {
      method: 'POST',
      body: JSON.stringify(form),
    })
      .then(() => {
        reset();
        showSnackbar('Письмо отправлено, ожидайте ответа');
      })
      .catch(() => {
        reset();
        showSnackbar('Не удалось отправить письмо');
      });
  };

  return (
    <div>
      <h2 className={styles.pageTitle}>Запрос в поддержку</h2>
      <InfoBlock
        text={
          <>
            Запросы обрататываются в ручном режиме. Пожалуйста, не отправляйте никаких своих личных
            данных в целях безопасности. При желании вы так же можете написать напрямую на почту{' '}
            <Link href="mailto:help@onepassword.ru">help@onepassword.ru</Link>
          </>
        }
      />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="reason"
          control={control}
          render={({field: {ref, ...inputProps}, fieldState}) => (
            <Input
              placeholder="Проблема с аккаунтом"
              aliasText="Причина обращения"
              errorText={fieldState.error?.message}
              {...inputProps}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({field: {ref, ...inputProps}, fieldState}) => (
            <Input
              placeholder="vasyapupkin@mail.ru"
              aliasText="Почта для ответа"
              errorText={fieldState.error?.message}
              {...inputProps}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({field: {ref, ...inputProps}, fieldState}) => (
            <Textarea
              placeholder="У меня что-то сломалось, когда я нажал на ..."
              aliasText="Описание проблемы"
              errorText={fieldState.error?.message}
              {...inputProps}
            />
          )}
        />
        <div className={styles.actions}>
          <Button
            theme="default"
            type="submit"
            disabled={!formState.isValid}
            className={styles.button}
          >
            Отправить
          </Button>
        </div>
      </form>
    </div>
  );
}
