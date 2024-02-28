import styles from '@/components/MainPageSlider/MainPageSlider.module.scss';

export const ThirdElement = () => {
  return (
    <div className={styles.title}>
      <span className={styles.neutralText}>Не включайте</span>
      <br />
      <span className={styles.primaryText}>
        автозаполне&shy;ние <span className={styles.neutralText}>ваших</span>
      </span>
      <br />
      <span className={styles.neutralText}>данных.</span>
      <div className={styles.description}>
        Не позволяйте браузерам хранить ваши пароли у себя. Просто зайдите и скопируйте его за пару
        кликов, это безопаснее
      </div>
    </div>
  );
};
