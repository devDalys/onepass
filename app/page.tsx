import styles from './page.module.scss';
import Link from 'next/link';
import {MainPageSlider} from '@/components/MainPageSlider/MainPageSlider';
import Loading from '@/app/loading';
import * as Slides from '@/components/MainPageSlider/Slides';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <MainPageSlider>
          {Object.values(Slides).map((Slide) => (
            <Slide key={Slide.toString()} />
          ))}
        </MainPageSlider>
      </main>
    </>
  );
}
