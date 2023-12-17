import React, {useEffect} from 'react';
import styles from './AuthorizationChecker.module.scss';
import {useRouter, useSearchParams} from 'next/navigation';
import {_api} from '@/api';
import {setCookie} from 'cookies-next';
import {ONE_MONTH} from '@/utils/consts';
import {useSnackbar} from '@/providers/SnackbarProvider';

interface AuthorizationCheckerProps {}

export default function AuthorizationChecker({}: AuthorizationCheckerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {showSnackbar} = useSnackbar();

  useEffect(() => {
    if (window.location.hash) {
      // console.log('Авторизация через Яндекс');
      // console.log(window.location.hash);
    }
    if (searchParams.size) {
      const payload = searchParams.get('payload');
      if (payload?.length) {
        const decodePayload = JSON.parse(payload);
        _api
          .post('/auth/login/vk', {
            silence_token: decodePayload.token,
            uuid: decodePayload.uuid,
            social: 'VK',
          })
          .then((data) => {
            showSnackbar('Вы успешно вошли !');
            setCookie('token', data.data.token, {maxAge: ONE_MONTH});
            router.push('/accounts');
          });
      }
    }
  }, []);
  return <div></div>;
}
