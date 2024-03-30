import {Metadata} from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'OnePassword - Профиль',
  description:
    'Личный кабинет OnePassword, в котором вы можете сменить имя и фамилию или электронную почту.',
  alternates: {
    canonical: 'https://onepassword.ru/profile',
  },
};

export default function AccountLayout({children}: {children: React.ReactNode}) {
  return children;
}
