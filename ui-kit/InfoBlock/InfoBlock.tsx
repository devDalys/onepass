import styles from './InfoBlock.module.scss';
import Info from '@/assets/images/Info.svg';

interface Props {
  text: React.ReactNode;
  icon?: React.ReactNode;
}

export const InfoBlock = ({text, icon}: Props) => {
  return (
    <div className={styles.infoBlock}>
      <div className={styles.infoIcon}>{<Info /> ?? icon}</div>
      <span className={styles.text}>{text}</span>
    </div>
  );
};
