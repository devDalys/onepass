import styles from './page.module.scss';
import Link from 'next/link';
import {MainPageSlider} from '@/components/MainPageSlider/MainPageSlider';
import {Button} from '@/ui-kit';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <MainPageSlider />
        <nav className={styles.navigation}>
          <Link href={'/register'}>
            <Button theme="outline" className={styles.button}>
              Регистрация
            </Button>
          </Link>
          <Link href={'/login'}>
            <Button theme="default" className={styles.button}>
              Вход
            </Button>
          </Link>
        </nav>
      </main>
    </>
  );
}
