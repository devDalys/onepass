import {AuthPage} from '@/components/AuthPage';
import {LoginForm} from '@/components/LoginForm';

export default function page() {
  return (
    <AuthPage text="Login">
      <LoginForm />
    </AuthPage>
  );
}
