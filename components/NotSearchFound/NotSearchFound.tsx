import React from 'react';
import styles from './NotSearchFound.module.scss';
import NotFound from '@/assets/images/not-search.svg';

interface NotSearchFoundProps {}

export default function NotSearchFound({}: NotSearchFoundProps) {
  return (
    <article className={styles.wrapper}>
      <img src={NotFound.src} alt="Nothing found" />

      <h2>NO Results</h2>
      <p>We couldn’t find anything. Try searching for something else.</p>
    </article>
  );
}
