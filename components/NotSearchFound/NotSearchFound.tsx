import React from 'react';
import styles from './NotSearchFound.module.scss';
import NotFound from '@/assets/images/not-search.svg';

interface NotSearchFoundProps {}

export default function NotSearchFound({}: NotSearchFoundProps) {
  return (
    <article className={styles.wrapper}>
      <NotFound alt="Nothing found" />

      <h2>Ничего не найдено</h2>
      <p>Мы не смогли найти среди ваших аккаунтов то что вы запросили</p>
    </article>
  );
}
