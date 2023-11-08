import copy from '@/assets/images/Copy.svg';
import notfound from '@/assets/images/not-found.svg';
import styles from './AccountItem.module.scss';
export interface IAccountItem {
  login: string;
  password: string;
  iconSrc?: string;
  socialName: string;
}

export default function AccountItem(props: IAccountItem) {
  return (
    <div className={styles.item}>
      <div className={styles.iconWrapper}>
        <img src={props.iconSrc ?? notfound.src} className={styles.icon} alt={props.socialName} />
      </div>
      <span className={styles.socialName}>{props.socialName}</span>
      <img src={copy.src} className={styles.copyIcon} />
    </div>
  );
}
