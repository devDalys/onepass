import styles from '@/components/MainPageSlider/MainPageSlider.module.scss';

export const FirstElement = () => {
  return (
    <div className={styles.title}>
      <span className={styles.neutralText}>Российский</span>
      <br />
      <span className={styles.primaryText}>Безопасный</span>
      <br />
      <span className={styles.neutralText}>Менеджер паролей.</span>
      <div className={styles.description}>
        OnePassword - Российское безопасное хранилище паролей, который создан и доступен только в
        РФ. Вы можете быть уверены в том, что ваши данные в безопасности.
      </div>
    </div>
  );
};
