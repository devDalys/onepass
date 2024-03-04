'use client';
import {useId} from 'react';
import styles from './Textarea.module.scss';
import classNames from 'classnames';
interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  aliasText: string;
  errorText?: string;
  className?: string;
}

export const Textarea = ({errorText, aliasText, className, ...props}: Props) => {
  const id = useId();

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {aliasText}
      </label>
      <textarea id={id} {...props} className={classNames(styles.textarea, className)}></textarea>
      {!!errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  );
};
