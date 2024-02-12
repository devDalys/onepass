import styles from '@/components/MainPageSlider/MainPageSlider.module.scss';

export const FirstElement = () => {
  return (
    <>
      <span className={styles.neutralText}>Единое</span>
      <br />
      <span className={styles.primaryText}>Безопасное</span>
      <br />
      <span className={styles.neutralText}>Хранилище.</span>
      <div className={styles.description}>
        Перестаньте записывать пароли на бумаге или в заметках. Используйте безопасное хранилище,
        которое сохранит все ваши пароли в безопасности.
      </div>
    </>
  );
};
