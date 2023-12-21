import {Button} from '@/ui-kit';
import Link from 'next/link';
import styles from './WelcomeComponent.module.scss';

export default function WelcomeComponent() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.h1}>Welcome to OnePass</h1>
      <Link href="/accounts/add">
        <Button theme="outline">Add first account</Button>
      </Link>
    </div>
  );
}
