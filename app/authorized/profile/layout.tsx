import {Metadata} from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'OnePassword - Профиль',
};

export default function AccountLayout({children}: {children: React.ReactNode}) {
  return children;
}
