'use client';
import Copy from '@/assets/images/Copy.svg';
import styles from './AccountItem.module.scss';
import Link from 'next/link';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import {useModal} from '@/providers/ModalProvider';
import {ModalList} from '@/components/AccountsList/ModalList/ModalList';

interface Props extends AccountsResponse {
  onCopy: (text: string) => void;
}

export default function AccountItem(props: Props) {
  const {createModal} = useModal();

  return (
    <Link href={'/accounts/' + props._id} key={props._id}>
      <div className={styles.item}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>{props.socialName[0]}</span>
        </div>
        <span className={styles.socialName}>{props.socialName}</span>
        <div
          className={styles.copyIcon}
          onClick={(event: React.MouseEvent) => {
            event.preventDefault();
            if (props.accountEntries.length !== 1) {
              return createModal({
                children: () => (
                  <ModalList socialName={props.socialName} accountEntries={props.accountEntries} />
                ),
                title: 'Выберите аккаунт для копирования',
              });
            }
            props.onCopy(props.accountEntries[0].password);
          }}
        >
          <Copy />
        </div>
      </div>
    </Link>
  );
}
