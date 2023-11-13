import copy from '@/assets/images/Copy.svg';
import notfound from '@/assets/images/not-found.svg';
import styles from './AccountItem.module.scss';
import Link from 'next/link';
export interface IAccountItem {
  login: string;
  password: string;
  iconSrc?: string;
  socialName: string;
  _id: string;
}

export default function AccountItem(props: IAccountItem) {
  return (
    <Link href={'/accounts/' + props._id} key={props._id}>
      <div className={styles.item}>
        <div className={styles.iconWrapper}>
          <img
            src={
              `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${props.socialName}.com&size=64` ??
              notfound.src
            }
            className={styles.icon}
            alt={props.socialName}
          />
        </div>
        <span className={styles.socialName}>{props.socialName}</span>
        <img src={copy.src} className={styles.copyIcon} />
      </div>
    </Link>
  );
}
