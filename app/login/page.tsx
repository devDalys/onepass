import {AuthPage} from '@/components/AuthPage';
import {LoginForm} from '@/components/LoginForm';

const APP_ID = process.env['VK_APP_ID'] as string;
const REDIRECT_URL = process.env['REDIRECT_URL'] as string;
const CLIENT_ID = process.env['CLIENT_ID'] as string;

export default function page() {
  return (
    <AuthPage text="Вход">
      <LoginForm APP_ID={+APP_ID} CLIENT_ID={CLIENT_ID} redirectUrl={REDIRECT_URL} />
    </AuthPage>
  );
}
