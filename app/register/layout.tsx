import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Регистрация в OnePassword',
  description: 'Регистрация аккаунта в OnePassword',
  alternates: {
    canonical: 'https://onepassword.ru/register',
  },
};

export default function RegisterLayout({children}: {children: React.ReactNode}) {
  return children;
}
