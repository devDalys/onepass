import styles from './AuthPage.module.scss';

interface Props {
  text: 'Login' | 'Register';
  children: React.ReactNode;
}

export const AuthPage = ({children, text}: Props) => {
  return (
    <section>
      <h1 className={styles.title}>{text}</h1>
      <h2 className={styles.subtitle}>Let’s get you setup with a new account!</h2>
      {children}
    </section>
  );
};
