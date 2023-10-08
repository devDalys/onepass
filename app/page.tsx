import styles from './page.module.scss';
import Link from 'next/link';
import {MainPageSlider} from "@/components/MainPageSlider/MainPageSlider";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
		<MainPageSlider />
      </main>
    </>
  );
}
