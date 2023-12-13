import {Metadata} from 'next';
import {NotFoundPage} from '@/components/NotFoundPage';
import {cookies} from 'next/headers';
import {ContextProvider} from '@/providers/ContextProvider';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'Аккаунты',
};

export default function AccountLayout({children}: {children: React.ReactNode}) {
  const token = cookies().get('token')?.value;

  if (!token?.length) return <NotFoundPage />;

  return (
    <ContextProvider>
      <Header />
      {children}
    </ContextProvider>
  );
}
