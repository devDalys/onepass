import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Регистрация',
  description: 'Давайте зарегистрируем аккаунт',
};

export default function RegisterLayout({children}: {children: React.ReactNode}) {
  return children;
}
