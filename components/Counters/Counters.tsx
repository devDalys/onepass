import {IAccountItem} from '@/components/AccountsList/AccountItem';
import styles from './Counters.module.scss';

interface Props {
  accounts: IAccountItem[];
}

interface CounterProps {
  length: number;
  text: string;
}

const Counter = ({text, length}: CounterProps) => {
  return (
    <div className={styles.counter}>
      <span className={styles.length}>{length}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default function Counters({accounts}: Props) {
  return (
    <div className={styles.wrapper}>
      <Counter length={accounts.length} text={'Passwords Stored'} />
      <Counter length={0} text={'Passwords Compromised'} />
    </div>
  );
}
