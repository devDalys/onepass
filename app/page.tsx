import styles from './page.module.scss';
import Link from 'next/link';
import {MainPageSlider} from '@/components/MainPageSlider/MainPageSlider';
import * as Slides from '@/components/MainPageSlider/Slides';
import {Button} from '@/ui-kit';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <MainPageSlider>
          {Object.values(Slides).map((Slide) => (
            <Slide key={Slide.toString()} />
          ))}
        </MainPageSlider>
        <nav className={styles.navigation}>
          <Link href={'/register'}>
            <Button theme="outline">Register</Button>
          </Link>
          <Link href={'/login'}>
            <Button theme="default">Login</Button>
          </Link>
        </nav>
      </main>
    </>
  );
}
