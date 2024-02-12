import styles from '@/components/MainPageSlider/MainPageSlider.module.scss';

export const ThirdElement = () => {
  return (
    <>
      <span className={styles.neutralText}>Не включайте</span>
      <br />
      <span className={styles.primaryText}>
        автозаполнение <span className={styles.neutralText}>ваших</span>
      </span>
      <br />
      <span className={styles.neutralText}>данных.</span>
      <div className={styles.description}>
        Don’t compromise your passwords by typing them in public, let OnePass autofill those and
        keep your credentials secure.
      </div>
    </>
  );
};
