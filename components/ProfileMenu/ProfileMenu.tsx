import styles from './ProfileMenu.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
interface Props {
  currentPage: string;
  children: React.ReactNode;
}

const pages = [
  {page: 'profile', url: '/profile', name: 'Профиль'},
  {page: 'security', url: '/profile/security', name: 'Безопасность'},
  {page: 'help', url: '/profile/help', name: 'Поддержка'},
  {page: 'about', url: '/profile/about', name: 'О проекте'},
  {page: '', url: '/logout', name: 'Выйти из аккаунта'},
];

export default function ProfileMenu({currentPage, children}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        {pages.map((item) => (
          <Link
            className={classNames(styles.link, {[styles.active]: item.page === currentPage})}
            href={item.url}
            key={item.page}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className={styles.component}>{children}</div>
    </div>
  );
}