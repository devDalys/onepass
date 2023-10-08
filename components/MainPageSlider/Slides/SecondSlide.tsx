import styles from '@/components/MainPageSlider/MainPageSlider.module.scss';

export const SecondElement = () => {
  return (
    <>
      <span className={styles.neutralText}>All your</span>
      <br />
      <span className={styles.primaryText}>
        password <span className={styles.neutralText}>are</span>
      </span>
      <br />
      <span className={styles.neutralText}>here.</span>
      <div className={styles.description}>
        Store and manage all of your passwords from one place. Don’t remember hundreds of passwords,
        just remember one.
      </div>
    </>
  );
};
