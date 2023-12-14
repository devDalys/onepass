'use client';
import React, {useEffect} from 'react';
import styles from './YandexLogin.module.scss';
import Script from 'next/script';
interface YandexLoginProps {}

export default function YandexLogin({}: YandexLoginProps) {
  useEffect(() => {
    window.YaAuthSuggest.init(
      {
        client_id: 'e71127097a24409ea67c8f8f7924c6e6',
        response_type: 'token',
        redirect_uri: 'http://localhost:8000/login',
      },
      'http://localhost:8000/login',
      {
        view: 'button',
        parentId: 'container',
        buttonView: 'main',
        buttonTheme: 'light',
        buttonSize: 'm',
        buttonBorderRadius: 10,
      },
    )
      .then(({handler}) => handler())
      .then((data) => console.log('Message with the token', data))
      .catch((error) => console.log('Error processing', error));
  }, []);

  return <button id="container"></button>;
}
