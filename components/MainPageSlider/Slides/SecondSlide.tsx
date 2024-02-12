import styles from '@/components/MainPageSlider/MainPageSlider.module.scss';

export const SecondElement = () => {
  return (
    <>
      <span className={styles.neutralText}>Все ваши</span>
      <br />
      <span className={styles.primaryText}>
        пароли <span className={styles.neutralText}>будут</span>
      </span>
      <br />
      <span className={styles.neutralText}>здесь.</span>
      <div className={styles.description}>
        Храните и управляйте всеми своими паролями в одном месте. Не запоминайте сотни паролей,
        достаточно помнить один.
      </div>
    </>
  );
};
