import {Button} from '@/ui-kit';
import Link from 'next/link';
import styles from './WelcomeComponent.module.scss';

export default function WelcomeComponent({name}: {name?: string}) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.h1}>Приветствую тебя, {name}</h1>
      <Link href="/accounts/add">
        <Button theme="outline" className={styles.button}>
          Добавить первый аккаунт
        </Button>
      </Link>
    </div>
  );
}
