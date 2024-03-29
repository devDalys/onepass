import {AuthPage} from '@/components/AuthPage';
import {RegisterForm} from '@/components/RegisterForm';

export default function page() {
  const APP_ID = process.env['VK_APP_ID'] as string;
  const REDIRECT_URL = process.env['REDIRECT_URL'] as string;
  const CLIENT_ID = process.env['CLIENT_ID'] as string;

  return (
    <AuthPage text="Регистрация">
      <RegisterForm APP_ID={+APP_ID} redirectUrl={REDIRECT_URL} CLIENT_ID={CLIENT_ID} />
    </AuthPage>
  );
}
