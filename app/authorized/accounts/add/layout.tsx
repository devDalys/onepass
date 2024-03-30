import {Metadata} from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'OnePassword - Добавить новый аккаунт',
  description: 'Добавить новый аккаунт в OnePassword',
  alternates: {
    canonical: 'https://onepassword.ru/accounts/add',
  },
};

export default function AccountLayout({children}: {children: React.ReactNode}) {
  return children;
}
