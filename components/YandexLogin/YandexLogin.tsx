'use client';
import React, {useEffect} from 'react';

interface YandexLoginProps {
  CLIENT_ID: string;
  isDisabled: boolean;
}

export default function YandexLogin({CLIENT_ID, isDisabled}: YandexLoginProps) {
  useEffect(() => {
    // @ts-ignore
    window.YaAuthSuggest.init(
      {
        client_id: CLIENT_ID,
        response_type: 'token',
        redirect_uri: process.env['PUBLIC_YANDEX_REDIRECT'],
      },
      process.env['PUBLIC_YANDEX_REDIRECT'],
      {
        view: 'button',
        parentId: 'container',
        buttonView: 'main',
        buttonTheme: 'light',
        buttonSize: 'm',
        buttonBorderRadius: 10,
      },
    ).then(({handler}: any) => handler());
  }, []);

  return (
    <button
      disabled={isDisabled}
      onClick={(event) => {
        event.preventDefault();
      }}
      id="container"
    ></button>
  );
}
