import {AuthPage} from '@/components/AuthPage';
import {RegisterForm} from '@/components/RegisterForm';

export default function page() {
  return (
    <AuthPage text="Регистрация">
      <RegisterForm />
    </AuthPage>
  );
}
