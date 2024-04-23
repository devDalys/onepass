import {NotFoundPage} from '@/components/NotFoundPage';
import HeaderWrapper from '@/components/Header/HeaderWrapper';
import React from 'react';
import {checkAuthCookie} from '@/utils/checkAuthCookie';

export default function AccountLayout({children}: {children: React.ReactNode}) {
  if (checkAuthCookie()) return <NotFoundPage />;

  return (
    <>
      <HeaderWrapper />
      {children}
    </>
  );
}
