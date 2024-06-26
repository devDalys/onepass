import {Metadata} from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'OnePassword - Аккаунты',
  description: 'Список ваших аккаунтов, которые хранятся в OnePassword.',
  alternates: {
    canonical: 'https://onepassword.ru/accounts',
  },
};

export default function AccountLayout({children}: {children: React.ReactNode}) {
  return children;
}
