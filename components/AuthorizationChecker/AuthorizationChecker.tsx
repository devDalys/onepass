import React, {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {_api} from '@/api';
import {setCookie} from 'cookies-next';
import {ONE_MONTH} from '@/utils/consts';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {FullScreenLoading} from '@/components/FullScreenLoading';

interface AuthorizationCheckerProps {
  onYandexClick: () => void;
}

export default function AuthorizationChecker({onYandexClick}: AuthorizationCheckerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {showSnackbar} = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const isTokenExist = window.location.hash.startsWith('#access_token=');
      if (isTokenExist) {
        setIsLoading(true);
        const token = window.location.hash.split('&')[0].replace('#access_token=', '');
        _api
          .post('/auth/login/social', {
            silence_token: token,
            social: 'Yandex',
          })
          .then((data) => {
            setCookie('token', data.data.token, {maxAge: ONE_MONTH});
            onYandexClick();
            window.close();
          })
          .catch(() => {
            showSnackbar('Что-то пошло не так, попробуйте ещё раз или вернитесь позже.');
            setIsLoading(false);
          });
      }
    }
    if (searchParams.size) {
      const payload = searchParams.get('payload');
      if (payload?.length) {
        setIsLoading(true);
        const decodePayload = JSON.parse(payload);
        _api
          .post('/auth/login/social', {
            silence_token: decodePayload.token,
            uuid: decodePayload.uuid,
            social: 'VK',
          })
          .then((data) => {
            showSnackbar('Вы успешно вошли !');
            setCookie('token', data.data.token, {maxAge: ONE_MONTH});
            router.push('/accounts');
          })
          .catch(() => {
            showSnackbar('Что-то пошло не так, попробуйте ещё раз или вернитесь позже.');
            setIsLoading(false);
          });
      }
    }
  }, []);

  if (isLoading) return <FullScreenLoading />;

  return null;
}
