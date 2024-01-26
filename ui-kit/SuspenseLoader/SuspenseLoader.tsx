import classNames from 'classnames';
import styles from './SuspenseLoader.module.scss';

interface Props {
  className?: string;
}

export const SuspenseLoader = ({className}: Props) => {
  return <div className={classNames(className, styles.loader)} />;
};
