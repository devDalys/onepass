import styles from '@/components/MainPageSlider/MainPageSlider.module.scss';

export const Slides = [
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
  </>,
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
  </>,
  <>
    <span className={styles.neutralText}>Don&apos;t type</span>
    <br />
    <span className={styles.primaryText}>
      autofill <span className={styles.neutralText}>your</span>
    </span>
    <br />
    <span className={styles.neutralText}>credentials.</span>
    <div className={styles.description}>
      Don’t compromise your passwords by typing them in public, let OnePass autofill those and keep
      your credentials secure.
    </div>
  </>,
];
