import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Логин',
  description: 'Вход в аккаунт',
};

export default function RegisterLayout({children}: {children: React.ReactNode}) {
  return children;
}
