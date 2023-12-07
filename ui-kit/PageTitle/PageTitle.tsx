import styles from './PageTitle.module.scss';
import classNames from 'classnames';

interface Props extends React.HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const PageTitle = ({children, className, ...h1props}: Props) => {
  return (
    <h1 {...h1props} className={classNames(styles.h1, className)}>
      {children}
    </h1>
  );
};
