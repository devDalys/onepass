import {Metadata} from 'next';
import {NotFoundPage} from '@/components/NotFoundPage';
import {cookies} from 'next/headers';
import HeaderWrapper from '@/components/Header/HeaderWrapper';
import {AUTH_TOKEN} from '@/utils/consts';

export const metadata: Metadata = {
  title: 'Профиль',
};

export default function AccountLayout({children}: {children: React.ReactNode}) {
  const token = cookies().get(AUTH_TOKEN)?.value;

  if (!token?.length) return <NotFoundPage />;

  return (
    <>
      <HeaderWrapper onlyNavMenu onlyIsMobile />
      {children}
    </>
  );
}
