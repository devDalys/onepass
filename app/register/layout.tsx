import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Let’s get you setup with a new account!',
};

export default function RegisterLayout({children}: {children: React.ReactNode}) {
  return children;
}
