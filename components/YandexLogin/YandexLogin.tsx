'use client';
import React, {useEffect} from 'react';

interface YandexLoginProps {
  CLIENT_ID: string;
  callback: () => void;
  isDisabled: boolean;
}

export default function YandexLogin({CLIENT_ID, callback, isDisabled}: YandexLoginProps) {
  useEffect(() => {
    // @ts-ignore
    window.YaAuthSuggest.init(
      {
        client_id: CLIENT_ID,
        response_type: 'token',
        redirect_uri: 'http://localhost:8000/login?',
      },
      'http://localhost:8000/login?',
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
        callback?.();
      }}
      id="container"
    ></button>
  );
}
