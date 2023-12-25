import {useState} from 'react';
import styles from './Accordion.module.scss';
import classNames from 'classnames';
interface AccordionProps {
  renderProps: () => React.ReactNode;
  title?: string;
  additionalInfo?: string;
}

export const Accordion = ({renderProps, title, additionalInfo}: AccordionProps) => {
  const [isOpened, setOpened] = useState(false);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title} onClick={() => setOpened(!isOpened)}>
        {title}
        <span className={styles.additionalInfo}>{additionalInfo}</span>
        <span className={styles.icon}>{isOpened ? '-' : '+'}</span>
      </h3>
      <div className={classNames(styles.renderContent, {[styles.visible]: isOpened})}>
        {renderProps()}
      </div>
    </div>
  );
};
