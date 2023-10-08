import styles from '@/components/MainPageSlider/MainPageSlider.module.scss';

export const FirstElement = () => {
  return (
    <>
      <span className={styles.neutralText}>Generate</span>
      <br />
      <span className={styles.primaryText}>Secure</span>
      <br />
      <span className={styles.neutralText}>Passwords.</span>
      <div className={styles.description}>
        Stop using unsecure passwords for your online accounts, level up with OnePass. Get the most
        secure and difficult-to-crack passwords.
      </div>
    </>
  );
};
