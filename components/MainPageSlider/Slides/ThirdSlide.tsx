import styles from '@/components/MainPageSlider/MainPageSlider.module.scss';

export const ThirdElement = () => {
  return (
    <>
      <span className={styles.neutralText}>Don&apos;t type</span>
      <br />
      <span className={styles.primaryText}>
        autofill <span className={styles.neutralText}>your</span>
      </span>
      <br />
      <span className={styles.neutralText}>credentials.</span>
      <div className={styles.description}>
        Don’t compromise your passwords by typing them in public, let OnePass autofill those and
        keep your credentials secure.
      </div>
    </>
  );
};
