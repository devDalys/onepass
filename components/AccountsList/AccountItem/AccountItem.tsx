'use client';
import Copy from '@/assets/images/Copy.svg';
import styles from './AccountItem.module.scss';
import Link from 'next/link';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';

interface Props extends AccountsResponse {
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
        <div
          className={styles.copyIcon}
          onClick={(event: any) => {
            event.preventDefault();
            props.onCopy(props.accountEntries[0].password);
          }}
        >
          <Copy />
        </div>
      </div>
    </Link>
  );
}
