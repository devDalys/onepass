'use client';
import React, {useEffect} from 'react';
interface YandexLoginProps {}

export default function YandexLogin({}: YandexLoginProps) {
  useEffect(() => {
    window.YaAuthSuggest.init(
      {
        client_id: process.env['CLIENT_ID'],
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