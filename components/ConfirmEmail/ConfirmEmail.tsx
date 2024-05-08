'use client';
import styles from './ConfirmEmail.module.scss';
import {useRouter, useSearchParams} from 'next/navigation';
import {Button} from '@/ui-kit';
import {useEffect, useState} from 'react';
import {revalidateQuery} from '@/api/revalidatePath';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {_api} from '@/api';
import {getErrorMsg} from '@/utils/getErrorMsg';

interface Props {
  isEmailConfirmed: boolean;
  email: string;
}

const CONFIRM_EMAIL_PARAM = 'confirmToken';

export default function ConfirmEmail({isEmailConfirmed, email}: Props) {
  const searchParams = useSearchParams();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const {showSnackbar} = useSnackbar();

  const confirmToken = searchParams.get(CONFIRM_EMAIL_PARAM);
  const isStartConfirm = !isEmailConfirmed && confirmToken;

  const onConfirmClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setDisabled(true);
    _api
      .post('/auth/confirm')
      .then(() => {
        showSnackbar('Письмо для подтверждения отправлено на почту');
      })
      .catch((e) => {
        const msg = getErrorMsg(e);
        if (msg) {
          return showSnackbar(msg, true);
        }
        showSnackbar('Что-то пошло не так, попробуйте позже');
      });
  };

  useEffect(() => {
    if (isStartConfirm) {
      _api
        .put('/auth/confirm/' + confirmToken)
        .then(() => {
          revalidateQuery();
          showSnackbar('Почта подтверждена');
        })
        .catch((e) => {
          const msg = getErrorMsg(e);
          if (msg) {
            return showSnackbar(msg, true);
          }
          showSnackbar('Не удалось подтвердить email, попробуйте позже');
        })
        .finally(() => {
          router.push('/profile');
        });
    }
  }, [isStartConfirm]);

  if (isEmailConfirmed) return null;

  return (
    <div className={styles.wrapper}>
      Ваша электронная почта {email} не подтверждена, поэтому смена данных и некоторые другие
      функции для Вас недоступны. Нажмите кнопку ниже, чтобы отправить письмо с подтверждением на
      почту.
      {isStartConfirm ? (
        <div className={styles.startConfirm}>Процесс проверки запущен</div>
      ) : (
        <Button
          disabled={disabled}
          theme="default"
          className={styles.button}
          onClick={onConfirmClick}
        >
          Подтвердить Email
        </Button>
      )}
    </div>
  );
}
