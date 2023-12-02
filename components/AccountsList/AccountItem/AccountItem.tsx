'use client';
import copy from '@/assets/images/Copy.svg';
import notfound from '@/assets/images/not-found.svg';
import styles from './AccountItem.module.scss';
import Link from 'next/link';
export interface IAccountItem {
  login: string;
  password: string;
  iconSrc?: string;
  socialName: string;
  _id?: string;
}

interface Props extends IAccountItem {
  onCopy: (text: string) => void;
}

export default function AccountItem(props: Props) {
  return (
    <Link href={'/accounts/' + props._id} key={props._id}>
      <div className={styles.item}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>{props.socialName[0]}</span>
        </div>
        <span className={styles.socialName}>{props.socialName}</span>
        <img
          src={copy.src}
          className={styles.copyIcon}
          onClick={(event) => {
            event.preventDefault();
            props.onCopy(props.password);
          }}
        />
      </div>
    </Link>
  );
}
