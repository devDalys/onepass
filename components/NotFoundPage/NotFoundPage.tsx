'use client';
import styles from './NotFoundPage.module.scss';
import {Button} from '@/ui-kit';
import Link from 'next/link';

export const NotFoundPage = () => {
  return (
    <div className={styles.layout}>
      <span className={styles.span}>404</span>
      <Link href={'/'}>
        <Button theme={'outline'}>Go home</Button>
      </Link>
    </div>
  );
};
