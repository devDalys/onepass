'use client';
import styles from './GlobalError.module.scss';
import {Button} from '@/ui-kit';
import {useRouter} from 'next/navigation';

export const GlobalError = () => {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <span className={styles.span}>
        Что-то пошло не так. Мы получили уведомление о проблеме, и скорее всего скоро её исправим
      </span>
      <Button theme={'outline'} onClick={() => router.refresh()}>
        Обновить
      </Button>
    </div>
  );
};
