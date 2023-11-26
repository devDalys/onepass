'use client';
import {v4} from 'uuid';
import styles from './Input.module.scss';
import {useEffect, useState} from 'react';
import classNames from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  aliasText: string;
  errorText?: string;
  className?: string;
}

export const Input: React.FC<Props> = ({aliasText, className, errorText, ...inputProps}) => {
  const [id, setId] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setId(v4());
    }
  }, []);

  return (
    <div className={classNames(styles.inputWrapper, className)}>
      <label htmlFor={id} className={styles.label}>
        {aliasText}
      </label>
      <input {...inputProps} id={id} className={styles.input} />
      {!!errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  );
};
