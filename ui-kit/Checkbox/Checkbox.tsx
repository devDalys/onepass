import styles from './Checkbox.module.scss';

interface Props {
  value: boolean;
  setValue: () => void;
}

export const Checkbox = ({setValue, value}: Props) => {
  return (
    <label className={styles.label}>
      <input type="checkbox" checked={value} onChange={setValue} className={styles.checkbox} />
      <span className={styles.slider} />
    </label>
  );
};
