'use client';
import {useState} from 'react';
import styles from './Accordion.module.scss';
import classNames from 'classnames';
import ChevronUp from '@/assets/images/ChevronUp.svg';
import ChevronDown from '@/assets/images/ChevronDown.svg';

interface AccordionProps {
  renderProps: () => React.ReactNode;
  title?: string;
  additionalInfo?: string;
  isDefaultOpened?: boolean;
}

export const Accordion = ({
  renderProps,
  title,
  additionalInfo,
  isDefaultOpened = false,
}: AccordionProps) => {
  const [isOpened, setOpened] = useState(isDefaultOpened);

  return (
    <div className={styles.wrapper}>
      <div onClick={() => setOpened(!isOpened)} className={styles.titleWrapper}>
        <h3 className={styles.title}>
          {title}
          <span className={styles.additionalInfo}>{additionalInfo}</span>
        </h3>
        <span className={styles.icon}>{isOpened ? <ChevronUp /> : <ChevronDown />}</span>
      </div>
      <div className={classNames(styles.renderContent, {[styles.visible]: isOpened})}>
        {renderProps()}
      </div>
    </div>
  );
};
