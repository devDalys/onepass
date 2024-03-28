import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Вход в OnePassword',
  description: 'Вход в аккаунт OnePassword',
  alternates: {
    canonical: 'https://onepassword.ru/login',
  },
};

export default function RegisterLayout({children}: {children: React.ReactNode}) {
  return children;
}
