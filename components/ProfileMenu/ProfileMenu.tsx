import styles from './ProfileMenu.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
interface Props {
  currentPage: string;
}

const pages = [
  {page: 'profile', url: '/profile', name: 'Профиль'},
  {page: 'security', url: '/profile/security', name: 'Безопасность'},
  {page: 'help', url: '/profile/help', name: 'Поддержка'},
  {page: 'about', url: '/profile/about', name: 'О проекте'},
  {page: '', url: '/logout', name: 'Выйти из аккаунта'},
];

export default function ProfileMenu({currentPage}: Props) {
  return (
    <div className={styles.wrapper}>
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
  );
}
