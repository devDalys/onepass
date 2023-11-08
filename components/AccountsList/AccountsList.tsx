import styles from '@/app/accounts/styles.module.scss';
import AccountItem, {IAccountItem} from '@/components/AccountsList/AccountItem';

interface Props {
  accounts: IAccountItem[];
}

export default function AccountList({accounts}: Props) {
  return (
    <div className={styles.wrapper}>
      {accounts.map((item) => (
        <AccountItem key={item.socialName} {...item} />
      ))}
    </div>
  );
}
