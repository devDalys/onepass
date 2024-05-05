'use client';
import styles from './RecoveryForm.module.scss';
import {Controller, useForm} from 'react-hook-form';
import {Button, Input} from '@/ui-kit';
import * as yup from 'yup';
import {MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, validationMessages} from '@/utils/consts';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {getErrorMsg} from '@/utils/getErrorMsg';
import {_api} from '@/api';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

const scheme = yup.object().shape({
  email: yup.string().required(validationMessages.required()).email(validationMessages.email()),
});
const sentCodeScheme = yup.object().shape({
  code: yup
    .string()
    .required(validationMessages.required())
    .min(6, validationMessages.min(6))
    .max(6, validationMessages.max(6)),
  password: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, validationMessages.min(MIN_PASSWORD_LENGTH))
    .max(MAX_PASSWORD_LENGTH, validationMessages.min(MAX_PASSWORD_LENGTH))
    .required(validationMessages.required()),
  confirmPassword: yup
    .string()
    .test({
      test: (value, context) => context.parent.password === value,
      message: validationMessages.repeatValue('Пароли'),
    })
    .required(validationMessages.required()),
});

export default function RecoveryForm({recovery}: Props) {
  const [codeSentEmail, setCodeSentEmail] = useState(recovery?.email);
  const router = useRouter();
  const {control: firstStepControl, handleSubmit: firstStepSubmit} = useForm<FirstStepForm>({
    defaultValues: {
      email: recovery?.email ?? '',
    },
    resolver: yupResolver(scheme),
  });
  const {control: secondStepControl, handleSubmit: secondStepSubmit} = useForm<SecondStepForm>({
    defaultValues: {
      code: '',
      confirmPassword: '',
      password: '',
    },
    resolver: yupResolver(sentCodeScheme),
  });
  const {showSnackbar} = useSnackbar();
  const onPostEmail = (form: FirstStepForm) => {
    _api
      .post('/auth/recovery', form)
      .then(() => {
        setCodeSentEmail(form.email);
        showSnackbar('Письмо с кодом отправлено на почту');
      })
      .catch((e) => {
        const msg = getErrorMsg(e);
        if (msg) {
          return showSnackbar(msg, false);
        }
        showSnackbar('Что-то пошло не так');
      });
  };
  const onPostCode = ({confirmPassword, ...form}: SecondStepForm) => {
    _api
      .put('/auth/recovery', {...form, email: codeSentEmail})
      .then(async () => {
        showSnackbar('Аккаунт успешно восстановлен');
        router.push('/accounts');
      })
      .catch((e) => {
        const msg = getErrorMsg(e);
        if (msg) {
          return showSnackbar(msg, false);
        }
        showSnackbar('Что-то пошло не так');
      });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Восстановление доступа</h1>
      <h2 className={styles.subtitle}>
        Введите ваш адрес электронной почты, на который зарегистрирован аккаунт
      </h2>
      {!codeSentEmail && (
        <form className={styles.form} onSubmit={firstStepSubmit(onPostEmail)}>
          <Controller
            control={firstStepControl}
            name="email"
            render={({field: {ref, ...field}, fieldState}) => (
              <Input
                {...field}
                aliasText="Адрес электронной почты"
                placeholder="vasiliy@mail.ru"
                errorText={fieldState.error?.message}
              />
            )}
          />
          <Button theme="default">Восстановить доступ</Button>
        </form>
      )}
      {codeSentEmail && (
        <form className={styles.form} onSubmit={secondStepSubmit(onPostCode)}>
          <Input aliasText={'Адрес электронной почты'} value={codeSentEmail} disabled />
          <Controller
            control={secondStepControl}
            name="code"
            render={({field: {ref, ...field}, fieldState}) => (
              <Input
                {...field}
                aliasText="Код отправленный на почту"
                placeholder="123456"
                errorText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={secondStepControl}
            name="password"
            render={({field: {ref, ...field}, fieldState}) => (
              <Input
                {...field}
                aliasText="Пароль"
                placeholder="******"
                errorText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={secondStepControl}
            name="confirmPassword"
            render={({field: {ref, ...field}, fieldState}) => (
              <Input
                {...field}
                aliasText="Пароль повторно"
                placeholder="******"
                errorText={fieldState.error?.message}
              />
            )}
          />
          <Button theme="default">Сменить пароль</Button>
        </form>
      )}
    </div>
  );
}
