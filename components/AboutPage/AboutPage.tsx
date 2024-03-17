import styles from './AboutPage.module.scss';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      <h2 className={styles.pageTitle}>Контакты</h2>
      <div className={styles.contactsWrapper}>
        <span className={styles.contacts}>
          Почта для связи&nbsp;-&nbsp;
          <Link className={styles.contactsLink} href="mailto:help@onepassword.ru" target={'_blank'}>
            help@onepassword.ru
          </Link>
        </span>
        <span className={styles.contacts}>
          По техническим вопросам&nbsp;-&nbsp;
          <Link className={styles.contactsLink} href="/profile/help">
            поддержка
          </Link>
        </span>
      </div>
      <h2 className={styles.pageTitle}>О проекте OnePassword</h2>
      <span className={styles.description}>
        Проект не коммерческий и является собственностью автора.
      </span>

      <h2 className={styles.pageTitle}>Безопасно ли хранить пароли?</h2>
      <span className={styles.description}>
        Пароли от самого OnePassword хранятся в захэшированном виде и абсолютно безопасны. Доступ к
        аккаунту возможен только в случае утери данных пользователем, но получить доступ к хранимым
        аккаунтам без мастер-пароля не выйдет, поэтому он должен быть надежным.
      </span>
      <div className={styles.copyright}>© 2024, www.onepassword.ru</div>
      <div className={styles.additionalCopy}>
        Проект является интеллектуальной собственностью автора.
      </div>
    </div>
  );
}
