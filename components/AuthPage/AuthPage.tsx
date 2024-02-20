import styles from './AuthPage.module.scss';

interface Props {
  text: 'Вход' | 'Регистрация';
  children: React.ReactNode;
}

export const AuthPage = ({children, text}: Props) => {
  const subText =
    text === 'Вход' ? 'Войдите в свой аккаунт' : 'Давайте создадим вам новую учетную запись!';

  return (
    <section className={styles.section}>
      <div className={styles.form}>
        <h1 className={styles.title}>{text}</h1>
        <h2 className={styles.subtitle}>{subText}</h2>
        {children}
      </div>
    </section>
  );
};
