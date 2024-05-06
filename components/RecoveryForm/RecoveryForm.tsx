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
import {useLayoutEffect, useState} from 'react';
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
  const [timer, setTimer] = useState(0);
  const [cookieTime, setCookieTime] = useState(recovery?.staleTime);
  const [isPageRendered, setPageRendered] = useState(false);
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
  useLayoutEffect(() => {
    setPageRendered(true);
    if (cookieTime && !timer) {
      const dateToCode = new Date(cookieTime.setMinutes(cookieTime.getMinutes() - 8));
      const currDate = new Date();
      const currentDiff = Math.round((dateToCode.getTime() - currDate.getTime()) / 1000);
      if (currentDiff > 0) {
        setTimer(currentDiff);

        const interval = setInterval(() => {
          let currNumber;
          setTimer((timer) => {
            currNumber = --timer;
            if (currNumber <= 0) {
              clearInterval(interval);
              return 0;
            }
            return currNumber;
          });
        }, 1000);
      }
    }
  }, [cookieTime, timer]);

  const onPostEmail = (form: FirstStepForm) => {
    _api
      .post('/auth/recovery', form)
      .then(() => {
        const currDate = new Date();
        setCookieTime(new Date(currDate.setMinutes(currDate.getMinutes() + 10)));
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
                placeholder="вашапочта@mail.ru"
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
          <div className={styles.actionBlock}>
            {!!timer && (
              <span className={styles.repeatText}>
                Повторная отправка кода будет доступна через {timer}
              </span>
            )}
            {!timer && (
              <button
                className={styles.repeatButton}
                disabled={!!timer || !isPageRendered}
                onClick={(event) => {
                  event.preventDefault();
                  onPostEmail({email: codeSentEmail});
                }}
              >
                Отправить код ещё раз
              </button>
            )}
            <button
              className={styles.changeEmail}
              disabled={!isPageRendered}
              onClick={(event) => {
                event.preventDefault();
                setCodeSentEmail('');
                setTimer(0);
                setCookieTime(undefined);
              }}
            >
              Ввести другой адрес
            </button>
            <Button theme="default">Сменить пароль</Button>
          </div>
        </form>
      )}
    </div>
  );
}
