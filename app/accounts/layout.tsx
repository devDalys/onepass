import {Metadata} from 'next';
import {NotFoundPage} from '@/components/NotFoundPage';
import {cookies} from 'next/headers';
import {ContextProvider} from '@/providers/ContextProvider';
import HeaderWrapper from '@/components/Header/HeaderWrapper';
import {AUTH_TOKEN} from '@/utils/consts';

export const metadata: Metadata = {
  title: 'Аккаунты',
};

export default function AccountLayout({children}: {children: React.ReactNode}) {
  const token = cookies().get(AUTH_TOKEN)?.value;

  if (!token?.length) return <NotFoundPage />;

  return (
    <ContextProvider>
      <HeaderWrapper />
      {children}
    </ContextProvider>
  );
}
