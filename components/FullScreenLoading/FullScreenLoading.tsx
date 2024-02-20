import styles from './FullScreenLoading.module.scss';
import {FC} from 'react';
import classNames from 'classnames';

export const FullScreenLoading: FC = () => {
  return (
    <div className={classNames(styles.background)}>
      <h1 className={styles.h1}>
        <div className={styles.logo}>
          <span className={styles.stars}>
            <p className={styles.stars__star}>*</p>
            <p className={styles.stars__star}>*</p>
            <p className={styles.stars__star}>*</p>
          </span>
          <span className={styles.line} />
        </div>
        <div className={styles.text}>
          <span className={styles.text__left}>One</span>
          <span className={styles.text__right}>Password</span>
        </div>
      </h1>
      <h2 className={styles.description}>
        Единственный менеджер паролей, который вам когда-либо понадобится.
      </h2>
    </div>
  );
};
