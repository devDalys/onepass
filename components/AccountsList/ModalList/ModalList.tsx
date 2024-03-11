'use client';
import {AccountsResponse} from '@/components/AccountsList/AccountsList.types';
import styles from './ModalList.module.scss';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {useModal} from '@/providers/ModalProvider';

interface Props extends Pick<AccountsResponse, 'accountEntries'> {
  socialName: string;
}

export const ModalList = ({accountEntries, socialName}: Props) => {
  const {showSnackbar} = useSnackbar();
  const {hideModal} = useModal();

  const handleClick = async (text: string) => {
    await navigator.clipboard.writeText(text);
    showSnackbar('Пароль скопирован');
    hideModal();
  };

  return (
    <div className={styles.wrapper}>
      {accountEntries.map((item) => (
        <div
          key={item._id}
          className={styles.chip}
          onClick={() => {
            handleClick(item.password);
          }}
        >
          <span className={styles.title}>
            <span className={styles.name}>
              {socialName}&nbsp;{new Date(item.createdAt).toLocaleDateString()}
            </span>
            <br />
            Логин: {item.login}
          </span>
        </div>
      ))}
    </div>
  );
};
